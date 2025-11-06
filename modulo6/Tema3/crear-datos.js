const DatabaseConnection = require('./database');

async function crearDatosPrueba() {
    const dbConnection = new DatabaseConnection();
    
    try {
        await dbConnection.connect();
        
        const marksCollection = dbConnection.getCollection('marks');
        const teachersCollection = dbConnection.getCollection('teachers');
        
        // Limpiar colecciones existentes
        await marksCollection.deleteMany({});
        await teachersCollection.deleteMany({});
        
        console.log('Creando datos de prueba para agregaciones...');
        
        // Datos de profesores
        const teachers = [
            {
                teacher_first_name: "Juan",
                teacher_last_name: "García"
            },
            {
                teacher_first_name: "María",
                teacher_last_name: "López"
            },
            {
                teacher_first_name: "Carlos",
                teacher_last_name: "Ruiz"
            },
            {
                teacher_first_name: "Ana",
                teacher_last_name: "Martín"
            }
        ];
        
        await teachersCollection.insertMany(teachers);
        
        // Datos de calificaciones (marks)
        const marks = [
            // Asignatura: Matemáticas
            {
                student_first_name: "Pedro",
                student_last_name: "González",
                subject: "Matemáticas",
                mark: 8.5,
                date: new Date('2025-10-15'),
                group_name: "A",
                teachers: [
                    { teacher_first_name: "Juan", teacher_last_name: "García" }
                ]
            },
            {
                student_first_name: "Ana",
                student_last_name: "Fernández",
                subject: "Matemáticas",
                mark: 7.2,
                date: new Date('2025-11-01'),
                group_name: "A",
                teachers: [
                    { teacher_first_name: "Juan", teacher_last_name: "García" }
                ]
            },
            {
                student_first_name: "Luis",
                student_last_name: "Martín",
                subject: "Matemáticas",
                mark: 9.1,
                date: new Date('2025-10-20'),
                group_name: "B",
                teachers: [
                    { teacher_first_name: "Juan", teacher_last_name: "García" }
                ]
            },
            
            // Asignatura: Historia
            {
                student_first_name: "Pedro",
                student_last_name: "González",
                subject: "Historia",
                mark: 6.8,
                date: new Date('2025-09-10'),
                group_name: "A",
                teachers: [
                    { teacher_first_name: "María", teacher_last_name: "López" }
                ]
            },
            {
                student_first_name: "Carmen",
                student_last_name: "Rodríguez",
                subject: "Historia",
                mark: 8.9,
                date: new Date('2025-10-25'),
                group_name: "C",
                teachers: [
                    { teacher_first_name: "María", teacher_last_name: "López" },
                    { teacher_first_name: "Carlos", teacher_last_name: "Ruiz" }
                ]
            },
            {
                student_first_name: "Ana",
                student_last_name: "Fernández",
                subject: "Historia",
                mark: 7.5,
                date: new Date('2025-11-02'),
                group_name: "A",
                teachers: [
                    { teacher_first_name: "María", teacher_last_name: "López" }
                ]
            },
            
            // Asignatura: Física
            {
                student_first_name: "Luis",
                student_last_name: "Martín",
                subject: "Física",
                mark: 8.7,
                date: new Date('2025-10-30'),
                group_name: "B",
                teachers: [
                    { teacher_first_name: "Carlos", teacher_last_name: "Ruiz" }
                ]
            },
            {
                student_first_name: "Carmen",
                student_last_name: "Rodríguez",
                subject: "Física",
                mark: 9.3,
                date: new Date('2025-11-05'),
                group_name: "C",
                teachers: [
                    { teacher_first_name: "Carlos", teacher_last_name: "Ruiz" }
                ]
            },
            {
                student_first_name: "Pedro",
                student_last_name: "González",
                subject: "Física",
                mark: 5.4,
                date: new Date('2024-12-15'),
                group_name: "A",
                teachers: [
                    { teacher_first_name: "Carlos", teacher_last_name: "Ruiz" }
                ]
            },
            
            // Asignatura: Química
            {
                student_first_name: "Ana",
                student_last_name: "Fernández",
                subject: "Química",
                mark: 9.2,
                date: new Date('2025-10-18'),
                group_name: "A",
                teachers: [
                    { teacher_first_name: "Ana", teacher_last_name: "Martín" }
                ]
            },
            {
                student_first_name: "Luis",
                student_last_name: "Martín",
                subject: "Química",
                mark: 7.8,
                date: new Date('2025-10-22'),
                group_name: "B",
                teachers: [
                    { teacher_first_name: "Ana", teacher_last_name: "Martín" }
                ]
            },
            {
                student_first_name: "Carmen",
                student_last_name: "Rodríguez",
                subject: "Química",
                mark: 8.1,
                date: new Date('2025-11-01'),
                group_name: "C",
                teachers: [
                    { teacher_first_name: "Ana", teacher_last_name: "Martín" }
                ]
            },
            
            // Más registros para completar datos
            {
                student_first_name: "David",
                student_last_name: "Jiménez",
                subject: "Matemáticas",
                mark: 6.3,
                date: new Date('2025-10-28'),
                group_name: "C",
                teachers: [
                    { teacher_first_name: "Juan", teacher_last_name: "García" }
                ]
            },
            {
                student_first_name: "Elena",
                student_last_name: "Torres",
                subject: "Historia",
                mark: 4.2,
                date: new Date('2024-11-15'),
                group_name: "B",
                teachers: [
                    { teacher_first_name: "María", teacher_last_name: "López" }
                ]
            }
        ];
        
        await marksCollection.insertMany(marks);
        
        console.log('Datos de prueba creados exitosamente');
        console.log(`- ${teachers.length} profesores insertados`);
        console.log(`- ${marks.length} calificaciones insertadas`);
        
        // Mostrar estadísticas
        const totalMarks = await marksCollection.countDocuments();
        const totalTeachers = await teachersCollection.countDocuments();
        const subjects = await marksCollection.distinct('subject');
        const groups = await marksCollection.distinct('group_name');
        
        console.log('\nEstadísticas:');
        console.log(`Total calificaciones: ${totalMarks}`);
        console.log(`Total profesores: ${totalTeachers}`);
        console.log(`Asignaturas: ${subjects.join(', ')}`);
        console.log(`Grupos: ${groups.join(', ')}`);
        
    } catch (error) {
        console.error('Error creando datos de prueba:', error);
    } finally {
        await dbConnection.disconnect();
    }
}

// Ejecutar si este archivo se ejecuta directamente
if (require.main === module) {
    crearDatosPrueba();
}

module.exports = { crearDatosPrueba };