const DatabaseConnection = require('./database');

class Reto2Service {
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
     * 1. Obtén la nota media de los alumnos que tengan una nota mayor de 8 o la nota tenga fecha de año pasado o anterior
     */
    async obtenerNotaMediaCondiciones() {
        try {
            console.log('\n1. Nota media de alumnos con nota > 8 O fecha de año pasado o anterior');
            
            const añoActual = new Date().getFullYear();
            const inicioAñoActual = new Date(añoActual, 0, 1);
            
            const pipeline = [
                {
                    $match: {
                        $or: [
                            { mark: { $gt: 8 } },
                            { date: { $lt: inicioAñoActual } }
                        ]
                    }
                },
                {
                    $group: {
                        _id: null,
                        notaMedia: { $avg: "$mark" },
                        totalRegistros: { $sum: 1 }
                    }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            if (resultado.length > 0) {
                const notaMedia = resultado[0].notaMedia.toFixed(2);
                const total = resultado[0].totalRegistros;
                console.log(`Nota media: ${notaMedia} (${total} registros que cumplen la condición)`);
                return { notaMedia: parseFloat(notaMedia), totalRegistros: total };
            } else {
                console.log('No se encontraron registros que cumplan las condiciones');
                return { notaMedia: 0, totalRegistros: 0 };
            }
        } catch (error) {
            console.error('Error obteniendo nota media con condiciones:', error);
            throw error;
        }
    }

    /**
     * 2. Obtén la media de las notas que se han dado en el último año por nombre de alumno
     */
    async obtenerMediaNotasUltimoAñoPorAlumno() {
        try {
            console.log('\n2. Media de notas del último año por nombre de alumno');
            
            // Usar 2024 como "último año" ya que nuestros datos están en 2024
            const añoUltimo = 2024;
            const inicioAñoUltimo = new Date(añoUltimo, 0, 1);
            const finAñoUltimo = new Date(añoUltimo, 11, 31, 23, 59, 59);
            
            const pipeline = [
                {
                    $match: {
                        date: { 
                            $gte: inicioAñoUltimo,
                            $lte: finAñoUltimo
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            nombre: "$student_first_name",
                            apellido: "$student_last_name"
                        },
                        notaMedia: { $avg: "$mark" },
                        totalNotas: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        nombreCompleto: {
                            $concat: ["$_id.nombre", " ", "$_id.apellido"]
                        },
                        notaMedia: { $round: ["$notaMedia", 2] },
                        totalNotas: 1
                    }
                },
                {
                    $sort: { nombreCompleto: 1 }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            console.log('Media de notas del último año por alumno:');
            resultado.forEach(alumno => {
                console.log(`${alumno.nombreCompleto}: ${alumno.notaMedia} (${alumno.totalNotas} notas)`);
            });
            
            return resultado;
        } catch (error) {
            console.error('Error obteniendo media del último año:', error);
            throw error;
        }
    }

    /**
     * 3. Obtén la media aritmética de las notas que se han dado en el último año por nombre de alumno
     */
    async obtenerMediaAritmeticaUltimoAñoPorAlumno() {
        try {
            console.log('\n3. Media aritmética de notas del último año por nombre de alumno');
            
            const añoActual = new Date().getFullYear();
            const inicioAñoActual = new Date(añoActual, 0, 1);
            
            const pipeline = [
                {
                    $match: {
                        date: { $gte: inicioAñoActual }
                    }
                },
                {
                    $group: {
                        _id: {
                            nombre: "$student_first_name",
                            apellido: "$student_last_name"
                        },
                        notas: { $push: "$mark" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        nombreCompleto: {
                            $concat: ["$_id.nombre", " ", "$_id.apellido"]
                        },
                        notas: 1,
                        mediaAritmetica: { $avg: "$notas" },
                        totalNotas: { $size: "$notas" }
                    }
                },
                {
                    $project: {
                        nombreCompleto: 1,
                        mediaAritmetica: { $round: ["$mediaAritmetica", 2] },
                        totalNotas: 1,
                        notas: 1
                    }
                },
                {
                    $sort: { nombreCompleto: 1 }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            console.log('Media aritmética del último año por alumno:');
            resultado.forEach(alumno => {
                console.log(`${alumno.nombreCompleto}: ${alumno.mediaAritmetica} (Notas: [${alumno.notas.join(', ')}])`);
            });
            
            return resultado;
        } catch (error) {
            console.error('Error obteniendo media aritmética:', error);
            throw error;
        }
    }

    /**
     * 4. Obtén los nombres de los alumnos y la cantidad total de asignaturas por alumno cuyo profesor sea uno que elijas
     */
    async obtenerAlumnosYAsignaturasProfesorEspecifico(nombreProfesor, apellidoProfesor) {
        try {
            console.log(`\n4. Alumnos y total de asignaturas del profesor: ${nombreProfesor} ${apellidoProfesor}`);
            
            const pipeline = [
                {
                    $match: {
                        "teachers.teacher_first_name": nombreProfesor,
                        "teachers.teacher_last_name": apellidoProfesor
                    }
                },
                {
                    $group: {
                        _id: {
                            nombre: "$student_first_name",
                            apellido: "$student_last_name"
                        },
                        asignaturas: { $addToSet: "$subject" },
                        totalAsignaturas: { $addToSet: "$subject" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        nombreCompleto: {
                            $concat: ["$_id.nombre", " ", "$_id.apellido"]
                        },
                        asignaturas: 1,
                        cantidadAsignaturas: { $size: "$totalAsignaturas" }
                    }
                },
                {
                    $sort: { nombreCompleto: 1 }
                }
            ];

            const resultado = await this.marksCollection.aggregate(pipeline).toArray();
            
            if (resultado.length > 0) {
                console.log(`Alumnos del profesor ${nombreProfesor} ${apellidoProfesor}:`);
                resultado.forEach(alumno => {
                    console.log(`${alumno.nombreCompleto}: ${alumno.cantidadAsignaturas} asignaturas [${alumno.asignaturas.join(', ')}]`);
                });
            } else {
                console.log(`No se encontraron alumnos para el profesor ${nombreProfesor} ${apellidoProfesor}`);
            }
            
            return resultado;
        } catch (error) {
            console.error('Error obteniendo alumnos por profesor:', error);
            throw error;
        }
    }
}

async function ejecutarReto2() {
    const reto2 = new Reto2Service();
    
    try {
        await reto2.init();
        
        console.log('='.repeat(60));
        console.log('RETO 2: AGREGACIONES MONGODB AVANZADAS');
        console.log('='.repeat(60));

        // 1. Nota media con condiciones específicas
        await reto2.obtenerNotaMediaCondiciones();
        
        // 2. Media de notas del último año por alumno
        await reto2.obtenerMediaNotasUltimoAñoPorAlumno();
        
        // 3. Media aritmética del último año por alumno
        await reto2.obtenerMediaAritmeticaUltimoAñoPorAlumno();
        
        // 4. Alumnos y asignaturas de un profesor específico
        await reto2.obtenerAlumnosYAsignaturasProfesorEspecifico('Juan', 'García');
        await reto2.obtenerAlumnosYAsignaturasProfesorEspecifico('María', 'López');
        
        console.log('\n' + '='.repeat(60));
        console.log('RETO 2 COMPLETADO');
        console.log('='.repeat(60));
        
    } catch (error) {
        console.error('Error ejecutando Reto 2:', error);
    } finally {
        await reto2.close();
    }
}

// Ejecutar si este archivo se ejecuta directamente
if (require.main === module) {
    ejecutarReto2();
}

module.exports = { Reto2Service, ejecutarReto2 };