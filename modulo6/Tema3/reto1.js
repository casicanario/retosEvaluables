const DatabaseConnection = require('./database');

class Reto1Service {
    constructor() {
        this.dbConnection = new DatabaseConnection();
        this.marksCollection = null;
    }

    async init() {
        await this.dbConnection.connect();
        this.marksCollection = this.dbConnection.getCollection('marks');
    }

    async close() {
        await this.dbConnection.disconnect();
    }

    /**
     * 1. Calcular la nota media de los alumnos de una asignatura concreta
     */
    async calcularNotaMediaAsignatura(asignatura) {
        try {
            console.log(`\n1. Calculando nota media de la asignatura: ${asignatura}`);
            
            const pipeline = [
                {
                    $match: { subject: asignatura }
                },
                {
                    $group: {
                        _id: null,
                        notaMedia: { $avg: "$mark" }
                    }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            if (resultado.length > 0) {
                const notaMedia = resultado[0].notaMedia.toFixed(2);
                console.log(`Nota media en ${asignatura}: ${notaMedia}`);
                return { asignatura, notaMedia: parseFloat(notaMedia) };
            } else {
                console.log(`No se encontraron datos para la asignatura: ${asignatura}`);
                return { asignatura, notaMedia: 0 };
            }
        } catch (error) {
            console.error('Error calculando nota media:', error);
            throw error;
        }
    }

    /**
     * 2. Calcular el nombre total de alumnos que hay en cada asignatura incluyendo repetidos
     */
    async calcularTotalAlumnosPorAsignatura() {
        try {
            console.log('\n2. Calculando total de alumnos por asignatura (incluyendo repetidos)');
            
            const pipeline = [
                {
                    $group: {
                        _id: "$subject",
                        totalAlumnos: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            console.log('Total de alumnos por asignatura:');
            resultado.forEach(item => {
                console.log(`${item._id}: ${item.totalAlumnos} alumnos`);
            });
            
            return resultado;
        } catch (error) {
            console.error('Error calculando total de alumnos:', error);
            throw error;
        }
    }

    /**
     * 3. Listar el nombre y los apellidos de todos los alumnos incluyendo repetidos
     */
    async listarTodosLosAlumnos() {
        try {
            console.log('\n3. Listando nombres y apellidos de todos los alumnos (incluyendo repetidos)');
            
            const pipeline = [
                {
                    $project: {
                        _id: 0,
                        nombreCompleto: {
                            $concat: ["$student_first_name", " ", "$student_last_name"]
                        },
                        nombre: "$student_first_name",
                        apellido: "$student_last_name"
                    }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            console.log('Lista de alumnos:');
            resultado.forEach((alumno, index) => {
                console.log(`${index + 1}. ${alumno.nombreCompleto}`);
            });
            
            return resultado;
        } catch (error) {
            console.error('Error listando alumnos:', error);
            throw error;
        }
    }

    /**
     * 4. Mostrar el número total de alumnos por grupo ordenados por grupo en orden inverso al alfabeto
     */
    async mostrarAlumnosPorGrupoOrdenInverso() {
        try {
            console.log('\n4. Mostrando número total de alumnos por grupo (orden inverso alfabético)');
            
            const pipeline = [
                {
                    $group: {
                        _id: "$group_name",
                        totalAlumnos: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: -1 }  // Orden inverso alfabético
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            console.log('Alumnos por grupo (orden inverso):');
            resultado.forEach(grupo => {
                console.log(`Grupo ${grupo._id}: ${grupo.totalAlumnos} alumnos`);
            });
            
            return resultado;
        } catch (error) {
            console.error('Error mostrando alumnos por grupo:', error);
            throw error;
        }
    }

    /**
     * 5. Obtener el top 5 de los nombres de las asignaturas cuya nota media sea mayor que 5
     */
    async obtenerTop5AsignaturasPorNotaMedia() {
        try {
            console.log('\n5. Obteniendo top 5 asignaturas con nota media mayor que 5');
            
            const pipeline = [
                {
                    $group: {
                        _id: "$subject",
                        notaMedia: { $avg: "$mark" }
                    }
                },
                {
                    $match: { notaMedia: { $gt: 5 } }
                },
                {
                    $sort: { notaMedia: -1 }
                },
                {
                    $limit: 5
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            console.log('Top 5 asignaturas con nota media mayor que 5:');
            resultado.forEach((asignatura, index) => {
                console.log(`${index + 1}. ${asignatura._id}: ${asignatura.notaMedia.toFixed(2)}`);
            });
            
            return resultado;
        } catch (error) {
            console.error('Error obteniendo top 5 asignaturas:', error);
            throw error;
        }
    }

    /**
     * 6. Calcular el número de profesores que hay por cada asignatura incluyendo repetidos
     */
    async calcularProfesoresPorAsignatura() {
        try {
            console.log('\n6. Calculando número de profesores por asignatura (incluyendo repetidos)');
            
            const pipeline = [
                {
                    $unwind: "$teachers"
                },
                {
                    $group: {
                        _id: "$subject",
                        totalProfesores: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            console.log('Profesores por asignatura:');
            resultado.forEach(asignatura => {
                console.log(`${asignatura._id}: ${asignatura.totalProfesores} profesores`);
            });
            
            return resultado;
        } catch (error) {
            console.error('Error calculando profesores por asignatura:', error);
            throw error;
        }
    }
}

async function ejecutarReto1() {
    const reto1 = new Reto1Service();
    
    try {
        await reto1.init();
        
        console.log('='.repeat(60));
        console.log('RETO 1: AGREGACIONES MONGODB');
        console.log('='.repeat(60));

        // 1. Calcular nota media de una asignatura concreta
        await reto1.calcularNotaMediaAsignatura('Matemáticas');
        
        // 2. Total de alumnos por asignatura
        await reto1.calcularTotalAlumnosPorAsignatura();
        
        // 3. Listar todos los alumnos
        await reto1.listarTodosLosAlumnos();
        
        // 4. Alumnos por grupo en orden inverso
        await reto1.mostrarAlumnosPorGrupoOrdenInverso();
        
        // 5. Top 5 asignaturas por nota media
        await reto1.obtenerTop5AsignaturasPorNotaMedia();
        
        // 6. Profesores por asignatura
        await reto1.calcularProfesoresPorAsignatura();
        
        console.log('\n' + '='.repeat(60));
        console.log('RETO 1 COMPLETADO');
        console.log('='.repeat(60));
        
    } catch (error) {
        console.error('Error ejecutando Reto 1:', error);
    } finally {
        await reto1.close();
    }
}

// Ejecutar si este archivo se ejecuta directamente
if (require.main === module) {
    ejecutarReto1();
}

module.exports = { Reto1Service, ejecutarReto1 };