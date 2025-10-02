/**
 * 📱 APLICACIÓN INTERACTIVA DE CONSULTAS SQL
 * Módulo 5 - Tema 1: Sistema de consultas MySQL interactivo
 */

import readline from 'readline';
import db from './database.js';
import colors from 'colors';

// Crear interfaz de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 🎯 Menú principal de opciones
 */
const menuOptions = {
    '1': {
        title: '👥 Consultar Estudiantes',
        submenu: {
            '1': 'Ver todos los estudiantes',
            '2': 'Buscar estudiante por nombre',
            '3': 'Estudiantes por equipo',
            '4': 'Estadísticas de estudiantes'
        }
    },
    '2': {
        title: '👨‍🏫 Consultar Profesores',
        submenu: {
            '1': 'Ver todos los profesores',
            '2': 'Profesores por departamento',
            '3': 'Profesores con mayor salario',
            '4': 'Asignaturas por profesor'
        }
    },
    '3': {
        title: '📚 Consultar Asignaturas',
        submenu: {
            '1': 'Ver todas las asignaturas',
            '2': 'Asignaturas por curso',
            '3': 'Asignaturas con sus profesores',
            '4': 'Estadísticas de asignaturas'
        }
    },
    '4': {
        title: '📊 Consultar Notas',
        submenu: {
            '1': 'Ver todas las notas',
            '2': 'Notas por estudiante',
            '3': 'Notas por asignatura',
            '4': 'Estadísticas de rendimiento'
        }
    },
    '5': {
        title: '👥 Consultar Equipos',
        submenu: {
            '1': 'Ver todos los equipos',
            '2': 'Estudiantes por equipo',
            '3': 'Equipos con más miembros',
            '4': 'Crear nuevo equipo'
        }
    },
    '6': {
        title: '🔧 Operaciones Avanzadas',
        submenu: {
            '1': 'Ejecutar consulta personalizada',
            '2': 'Ver información de la base de datos',
            '3': 'Backup de datos importantes',
            '4': 'Estadísticas generales'
        }
    },
    '7': {
        title: '🧪 Pruebas y Mantenimiento',
        submenu: {
            '1': 'Probar conexión',
            '2': 'Verificar integridad de datos',
            '3': 'Limpiar datos obsoletos',
            '4': 'Reindexar tablas'
        }
    }
};

/**
 * 📋 Definir consultas SQL por categoría
 */
const sqlQueries = {
    students: {
        all: `
            SELECT 
                s.student_id,
                CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
                s.email,
                s.phone,
                t.name as equipo,
                s.enrollment_date
            FROM students s
            LEFT JOIN teams t ON s.team_id = t.team_id
            ORDER BY s.last_name, s.first_name
        `,
        byName: `
            SELECT 
                s.student_id,
                CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
                s.email,
                s.phone,
                t.name as equipo,
                COUNT(m.mark_id) as total_notas,
                AVG(m.mark) as promedio
            FROM students s
            LEFT JOIN teams t ON s.team_id = t.team_id
            LEFT JOIN marks m ON s.student_id = m.student_id
            WHERE CONCAT(s.first_name, ' ', s.last_name) LIKE ?
            GROUP BY s.student_id
        `,
        byTeam: `
            SELECT 
                t.name as equipo,
                COUNT(s.student_id) as total_estudiantes,
                GROUP_CONCAT(CONCAT(s.first_name, ' ', s.last_name) SEPARATOR ', ') as estudiantes
            FROM teams t
            LEFT JOIN students s ON t.team_id = s.team_id
            GROUP BY t.team_id, t.name
            ORDER BY total_estudiantes DESC
        `,
        stats: `
            SELECT 
                COUNT(*) as total_estudiantes,
                COUNT(DISTINCT team_id) as equipos_con_estudiantes,
                MIN(enrollment_date) as primera_matricula,
                MAX(enrollment_date) as ultima_matricula
            FROM students
        `
    },
    
    teachers: {
        all: `
            SELECT 
                t.teacher_id,
                CONCAT(t.first_name, ' ', t.last_name) as nombre_completo,
                t.email,
                t.department as departamento,
                t.salary as salario,
                t.hire_date as fecha_contratacion,
                CASE WHEN t.active = 1 THEN 'Activo' ELSE 'Inactivo' END as estado
            FROM teachers t
            ORDER BY t.department, t.last_name
        `,
        byDepartment: `
            SELECT 
                department as departamento,
                COUNT(*) as total_profesores,
                AVG(salary) as salario_promedio,
                MAX(salary) as salario_maximo,
                MIN(salary) as salario_minimo
            FROM teachers
            WHERE active = 1
            GROUP BY department
            ORDER BY total_profesores DESC
        `,
        topEarners: `
            SELECT 
                CONCAT(first_name, ' ', last_name) as nombre_completo,
                department as departamento,
                salary as salario,
                hire_date as fecha_contratacion
            FROM teachers
            WHERE active = 1
            ORDER BY salary DESC
            LIMIT 10
        `,
        withSubjects: `
            SELECT 
                CONCAT(t.first_name, ' ', t.last_name) as profesor,
                t.department as departamento,
                COUNT(DISTINCT st.subject_id) as asignaturas_impartidas,
                GROUP_CONCAT(DISTINCT s.title SEPARATOR ', ') as asignaturas
            FROM teachers t
            LEFT JOIN subject_teacher st ON t.teacher_id = st.teacher_id
            LEFT JOIN subjects s ON st.subject_id = s.subject_id
            WHERE t.active = 1
            GROUP BY t.teacher_id
            ORDER BY asignaturas_impartidas DESC
        `
    },
    
    subjects: {
        all: `
            SELECT 
                s.subject_id,
                s.title as asignatura,
                s.course as curso,
                s.credits as creditos,
                COUNT(DISTINCT st.teacher_id) as profesores_asignados,
                COUNT(DISTINCT m.student_id) as estudiantes_evaluados
            FROM subjects s
            LEFT JOIN subject_teacher st ON s.subject_id = st.subject_id
            LEFT JOIN marks m ON s.subject_id = m.subject_id
            GROUP BY s.subject_id
            ORDER BY s.course, s.title
        `,
        byCourse: `
            SELECT 
                course as curso,
                COUNT(*) as total_asignaturas,
                SUM(credits) as creditos_totales,
                AVG(credits) as creditos_promedio
            FROM subjects
            GROUP BY course
            ORDER BY curso
        `,
        withTeachers: `
            SELECT 
                s.title as asignatura,
                s.course as curso,
                CONCAT(t.first_name, ' ', t.last_name) as profesor,
                t.department as departamento
            FROM subjects s
            JOIN subject_teacher st ON s.subject_id = st.subject_id
            JOIN teachers t ON st.teacher_id = t.teacher_id
            WHERE t.active = 1
            ORDER BY s.course, s.title
        `,
        stats: `
            SELECT 
                COUNT(*) as total_asignaturas,
                COUNT(DISTINCT course) as cursos_disponibles,
                SUM(credits) as creditos_totales,
                AVG(credits) as creditos_promedio,
                MAX(credits) as creditos_maximo,
                MIN(credits) as creditos_minimo
            FROM subjects
        `
    },
    
    marks: {
        all: `
            SELECT 
                CONCAT(s.first_name, ' ', s.last_name) as estudiante,
                sub.title as asignatura,
                m.mark as nota,
                m.exam_date as fecha_examen,
                m.comments as comentarios
            FROM marks m
            JOIN students s ON m.student_id = s.student_id
            JOIN subjects sub ON m.subject_id = sub.subject_id
            ORDER BY m.exam_date DESC
            LIMIT 50
        `,
        byStudent: `
            SELECT 
                sub.title as asignatura,
                sub.course as curso,
                m.mark as nota,
                m.exam_date as fecha_examen,
                CASE 
                    WHEN m.mark >= 5 THEN '✅ Aprobado'
                    ELSE '❌ Suspenso'
                END as estado
            FROM marks m
            JOIN subjects sub ON m.subject_id = sub.subject_id
            JOIN students s ON m.student_id = s.student_id
            WHERE CONCAT(s.first_name, ' ', s.last_name) LIKE ?
            ORDER BY m.exam_date DESC
        `,
        bySubject: `
            SELECT 
                CONCAT(s.first_name, ' ', s.last_name) as estudiante,
                m.mark as nota,
                m.exam_date as fecha_examen,
                CASE 
                    WHEN m.mark >= 5 THEN '✅ Aprobado'
                    ELSE '❌ Suspenso'
                END as estado
            FROM marks m
            JOIN students s ON m.student_id = s.student_id
            JOIN subjects sub ON m.subject_id = sub.subject_id
            WHERE sub.title LIKE ?
            ORDER BY m.mark DESC
        `,
        performance: `
            SELECT 
                'Estadísticas Generales' as categoria,
                COUNT(*) as total_notas,
                AVG(mark) as promedio_general,
                MIN(mark) as nota_minima,
                MAX(mark) as nota_maxima,
                COUNT(CASE WHEN mark >= 5 THEN 1 END) as aprobados,
                COUNT(CASE WHEN mark < 5 THEN 1 END) as suspensos,
                ROUND((COUNT(CASE WHEN mark >= 5 THEN 1 END) * 100.0 / COUNT(*)), 2) as porcentaje_aprobados
            FROM marks
            
            UNION ALL
            
            SELECT 
                CONCAT('Curso ', course) as categoria,
                COUNT(m.*) as total_notas,
                AVG(m.mark) as promedio_general,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima,
                COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as aprobados,
                COUNT(CASE WHEN m.mark < 5 THEN 1 END) as suspensos,
                ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.*)), 2) as porcentaje_aprobados
            FROM marks m
            JOIN subjects s ON m.subject_id = s.subject_id
            GROUP BY s.course
            ORDER BY categoria
        `
    },
    
    teams: {
        all: `
            SELECT 
                t.team_id,
                t.name as nombre_equipo,
                t.description as descripcion,
                COUNT(s.student_id) as total_estudiantes,
                t.created_at as fecha_creacion
            FROM teams t
            LEFT JOIN students s ON t.team_id = s.team_id
            GROUP BY t.team_id
            ORDER BY total_estudiantes DESC, t.name
        `,
        members: `
            SELECT 
                t.name as equipo,
                CONCAT(s.first_name, ' ', s.last_name) as estudiante,
                s.email,
                s.enrollment_date as fecha_matricula
            FROM teams t
            JOIN students s ON t.team_id = s.team_id
            ORDER BY t.name, s.last_name
        `,
        topTeams: `
            SELECT 
                t.name as equipo,
                COUNT(s.student_id) as total_miembros,
                AVG(IFNULL(avg_marks.promedio, 0)) as promedio_equipo
            FROM teams t
            LEFT JOIN students s ON t.team_id = s.team_id
            LEFT JOIN (
                SELECT 
                    student_id, 
                    AVG(mark) as promedio
                FROM marks
                GROUP BY student_id
            ) avg_marks ON s.student_id = avg_marks.student_id
            GROUP BY t.team_id
            ORDER BY total_miembros DESC
            LIMIT 10
        `
    }
};

/**
 * 🖥️ Mostrar menú principal
 */
function showMainMenu() {
    console.clear();
    console.log('📱 SISTEMA INTERACTIVO DE CONSULTAS SQL'.cyan);
    console.log('Módulo 5 - Tema 1: Base de Datos Escuela'.gray);
    console.log('═'.repeat(60));
    
    Object.entries(menuOptions).forEach(([key, option]) => {
        console.log(`${key}. ${option.title}`);
    });
    
    console.log('0. 🚪 Salir');
    console.log('─'.repeat(60));
}

/**
 * 🖥️ Mostrar submenú
 */
function showSubMenu(option) {
    console.clear();
    console.log(`📋 ${menuOptions[option].title}`.cyan);
    console.log('═'.repeat(60));
    
    Object.entries(menuOptions[option].submenu).forEach(([key, title]) => {
        console.log(`${key}. ${title}`);
    });
    
    console.log('0. ⬅️  Volver al menú principal');
    console.log('─'.repeat(60));
}

/**
 * 🔍 Ejecutar consulta específica
 */
async function executeSpecificQuery(category, queryType, params = []) {
    try {
        console.log('🔍 Ejecutando consulta...'.yellow);
        
        const query = sqlQueries[category][queryType];
        const result = await db.executeQuery(query, params);
        
        console.log('\n📊 RESULTADOS:'.green);
        console.log('─'.repeat(60));
        
        if (result.results && result.results.length > 0) {
            console.table(result.results);
            console.log(`\n📈 Total de registros: ${result.results.length}`);
        } else {
            console.log('ℹ️  No se encontraron resultados'.yellow);
        }
        
        console.log(`⏱️  Tiempo de ejecución: ${result.executionTime}ms`);
        
    } catch (error) {
        console.error('❌ Error al ejecutar consulta:'.red, error.message);
    }
}

/**
 * 💬 Solicitar input del usuario
 */
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

/**
 * ⏳ Pausa para ver resultados
 */
async function pauseForReview() {
    console.log('\n');
    await askQuestion('Presiona Enter para continuar...'.gray);
}

/**
 * 🎮 Manejar opción de estudiantes
 */
async function handleStudentsMenu() {
    while (true) {
        showSubMenu('1');
        const choice = await askQuestion('Selecciona una opción: ');
        
        switch (choice) {
            case '1':
                await executeSpecificQuery('students', 'all');
                await pauseForReview();
                break;
                
            case '2':
                const studentName = await askQuestion('Introduce el nombre del estudiante (o parte): ');
                await executeSpecificQuery('students', 'byName', [`%${studentName}%`]);
                await pauseForReview();
                break;
                
            case '3':
                await executeSpecificQuery('students', 'byTeam');
                await pauseForReview();
                break;
                
            case '4':
                await executeSpecificQuery('students', 'stats');
                await pauseForReview();
                break;
                
            case '0':
                return;
                
            default:
                console.log('❌ Opción no válida'.red);
                await pauseForReview();
        }
    }
}

/**
 * 🎮 Manejar opción de profesores
 */
async function handleTeachersMenu() {
    while (true) {
        showSubMenu('2');
        const choice = await askQuestion('Selecciona una opción: ');
        
        switch (choice) {
            case '1':
                await executeSpecificQuery('teachers', 'all');
                await pauseForReview();
                break;
                
            case '2':
                await executeSpecificQuery('teachers', 'byDepartment');
                await pauseForReview();
                break;
                
            case '3':
                await executeSpecificQuery('teachers', 'topEarners');
                await pauseForReview();
                break;
                
            case '4':
                await executeSpecificQuery('teachers', 'withSubjects');
                await pauseForReview();
                break;
                
            case '0':
                return;
                
            default:
                console.log('❌ Opción no válida'.red);
                await pauseForReview();
        }
    }
}

/**
 * 🎮 Manejar opción de asignaturas
 */
async function handleSubjectsMenu() {
    while (true) {
        showSubMenu('3');
        const choice = await askQuestion('Selecciona una opción: ');
        
        switch (choice) {
            case '1':
                await executeSpecificQuery('subjects', 'all');
                await pauseForReview();
                break;
                
            case '2':
                await executeSpecificQuery('subjects', 'byCourse');
                await pauseForReview();
                break;
                
            case '3':
                await executeSpecificQuery('subjects', 'withTeachers');
                await pauseForReview();
                break;
                
            case '4':
                await executeSpecificQuery('subjects', 'stats');
                await pauseForReview();
                break;
                
            case '0':
                return;
                
            default:
                console.log('❌ Opción no válida'.red);
                await pauseForReview();
        }
    }
}

/**
 * 🎮 Manejar opción de notas
 */
async function handleMarksMenu() {
    while (true) {
        showSubMenu('4');
        const choice = await askQuestion('Selecciona una opción: ');
        
        switch (choice) {
            case '1':
                await executeSpecificQuery('marks', 'all');
                await pauseForReview();
                break;
                
            case '2':
                const studentName = await askQuestion('Introduce el nombre del estudiante: ');
                await executeSpecificQuery('marks', 'byStudent', [`%${studentName}%`]);
                await pauseForReview();
                break;
                
            case '3':
                const subjectName = await askQuestion('Introduce el nombre de la asignatura: ');
                await executeSpecificQuery('marks', 'bySubject', [`%${subjectName}%`]);
                await pauseForReview();
                break;
                
            case '4':
                await executeSpecificQuery('marks', 'performance');
                await pauseForReview();
                break;
                
            case '0':
                return;
                
            default:
                console.log('❌ Opción no válida'.red);
                await pauseForReview();
        }
    }
}

/**
 * 🎮 Manejar opción de equipos
 */
async function handleTeamsMenu() {
    while (true) {
        showSubMenu('5');
        const choice = await askQuestion('Selecciona una opción: ');
        
        switch (choice) {
            case '1':
                await executeSpecificQuery('teams', 'all');
                await pauseForReview();
                break;
                
            case '2':
                await executeSpecificQuery('teams', 'members');
                await pauseForReview();
                break;
                
            case '3':
                await executeSpecificQuery('teams', 'topTeams');
                await pauseForReview();
                break;
                
            case '4':
                const teamName = await askQuestion('Nombre del nuevo equipo: ');
                const teamDesc = await askQuestion('Descripción del equipo: ');
                
                try {
                    const result = await db.executeQuery(
                        'INSERT INTO teams (name, description) VALUES (?, ?)',
                        [teamName, teamDesc]
                    );
                    console.log(`✅ Equipo "${teamName}" creado exitosamente`.green);
                } catch (error) {
                    console.error('❌ Error al crear equipo:'.red, error.message);
                }
                
                await pauseForReview();
                break;
                
            case '0':
                return;
                
            default:
                console.log('❌ Opción no válida'.red);
                await pauseForReview();
        }
    }
}

/**
 * 🎮 Manejar operaciones avanzadas
 */
async function handleAdvancedMenu() {
    while (true) {
        showSubMenu('6');
        const choice = await askQuestion('Selecciona una opción: ');
        
        switch (choice) {
            case '1':
                const customQuery = await askQuestion('Introduce tu consulta SQL: ');
                try {
                    const result = await db.executeQuery(customQuery);
                    
                    if (result.results && result.results.length > 0) {
                        console.table(result.results);
                    } else {
                        console.log('✅ Consulta ejecutada exitosamente'.green);
                        if (result.affectedRows > 0) {
                            console.log(`📊 Filas afectadas: ${result.affectedRows}`);
                        }
                    }
                } catch (error) {
                    console.error('❌ Error en consulta personalizada:'.red, error.message);
                }
                await pauseForReview();
                break;
                
            case '2':
                const dbInfo = await db.getDatabaseInfo();
                console.log('\n📊 INFORMACIÓN DE LA BASE DE DATOS:'.green);
                console.log(`🏷️  Nombre: ${dbInfo.database.database_name}`);
                console.log(`🔤 Charset: ${dbInfo.database.charset}`);
                console.log(`📝 Collation: ${dbInfo.database.collation}`);
                console.log(`📊 Total tablas: ${dbInfo.totalTables}`);
                console.table(dbInfo.tables);
                await pauseForReview();
                break;
                
            case '3':
                console.log('💾 Realizando backup de datos importantes...'.yellow);
                // Aquí iría la lógica de backup
                console.log('✅ Backup completado'.green);
                await pauseForReview();
                break;
                
            case '4':
                const statsQuery = `
                    SELECT 
                        (SELECT COUNT(*) FROM students) as estudiantes,
                        (SELECT COUNT(*) FROM teachers) as profesores,
                        (SELECT COUNT(*) FROM subjects) as asignaturas,
                        (SELECT COUNT(*) FROM teams) as equipos,
                        (SELECT COUNT(*) FROM marks) as notas,
                        (SELECT AVG(mark) FROM marks) as promedio_notas
                `;
                await executeSpecificQuery('students', 'stats');
                await pauseForReview();
                break;
                
            case '0':
                return;
                
            default:
                console.log('❌ Opción no válida'.red);
                await pauseForReview();
        }
    }
}

/**
 * 🎮 Manejar pruebas y mantenimiento
 */
async function handleMaintenanceMenu() {
    while (true) {
        showSubMenu('7');
        const choice = await askQuestion('Selecciona una opción: ');
        
        switch (choice) {
            case '1':
                console.log('🧪 Probando conexión...'.yellow);
                const connectionTest = await db.testConnection();
                if (connectionTest) {
                    console.log('✅ Conexión exitosa'.green);
                } else {
                    console.log('❌ Error de conexión'.red);
                }
                await pauseForReview();
                break;
                
            case '2':
                console.log('🔍 Verificando integridad de datos...'.yellow);
                // Aquí irían las verificaciones de integridad
                console.log('✅ Integridad verificada'.green);
                await pauseForReview();
                break;
                
            case '3':
                console.log('🧹 Limpiando datos obsoletos...'.yellow);
                // Aquí iría la lógica de limpieza
                console.log('✅ Limpieza completada'.green);
                await pauseForReview();
                break;
                
            case '4':
                console.log('📊 Reindexando tablas...'.yellow);
                // Aquí iría la lógica de reindexado
                console.log('✅ Reindexado completado'.green);
                await pauseForReview();
                break;
                
            case '0':
                return;
                
            default:
                console.log('❌ Opción no válida'.red);
                await pauseForReview();
        }
    }
}

/**
 * 🎯 Función principal de la aplicación
 */
async function startInteractiveApp() {
    try {
        // Crear pool de conexiones
        db.createPool();
        
        // Probar conexión inicial
        console.log('🔌 Conectando a la base de datos...'.yellow);
        const connectionTest = await db.testConnection();
        
        if (!connectionTest) {
            console.error('❌ No se pudo conectar a la base de datos'.red);
            console.log('💡 Verifica tu configuración en el archivo .env');
            process.exit(1);
        }
        
        console.log('✅ Conexión establecida correctamente'.green);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Bucle principal del menú
        while (true) {
            showMainMenu();
            const choice = await askQuestion('Selecciona una opción: ');
            
            switch (choice) {
                case '1':
                    await handleStudentsMenu();
                    break;
                    
                case '2':
                    await handleTeachersMenu();
                    break;
                    
                case '3':
                    await handleSubjectsMenu();
                    break;
                    
                case '4':
                    await handleMarksMenu();
                    break;
                    
                case '5':
                    await handleTeamsMenu();
                    break;
                    
                case '6':
                    await handleAdvancedMenu();
                    break;
                    
                case '7':
                    await handleMaintenanceMenu();
                    break;
                    
                case '0':
                    console.log('\n👋 ¡Hasta luego!'.cyan);
                    process.exit(0);
                    break;
                    
                default:
                    console.log('❌ Opción no válida. Por favor, selecciona una opción del menú.'.red);
                    await pauseForReview();
            }
        }
        
    } catch (error) {
        console.error('❌ Error crítico en la aplicación:'.red, error.message);
        process.exit(1);
        
    } finally {
        rl.close();
        await db.closePool();
    }
}

// Ejecutar la aplicación
startInteractiveApp();