/**
 * 🔍 MÓDULO 5 - TEMA 2: CONSULTAS AVANZADAS
 * Consultas con Node.js, Express y MySQL
 * Parte 1: Consultas solicitadas
 */

import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'escuela_db',
    port: parseInt(process.env.DB_PORT) || 3306,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    charset: 'utf8mb4'
};

// Pool de conexiones
let pool;

/**
 * 🔌 Crear pool de conexiones
 */
function createPool() {
    try {
        pool = mysql.createPool(dbConfig);
        console.log('✅ Pool de conexiones MySQL creado exitosamente'.green);
        return pool;
    } catch (error) {
        console.error('❌ Error al crear pool de conexiones:'.red, error.message);
        throw error;
    }
}

/**
 * 🔍 Ejecutar consulta con manejo de errores
 */
async function executeQuery(query, params = []) {
    let connection;
    try {
        connection = await pool.getConnection();
        
        console.log('🔍 Ejecutando consulta:'.cyan);
        console.log(`   📝 SQL: ${query.substring(0, 100)}${query.length > 100 ? '...' : ''}`);
        
        const startTime = Date.now();
        const [results] = await connection.execute(query, params);
        const executionTime = Date.now() - startTime;
        
        console.log(`✅ Consulta ejecutada exitosamente en ${executionTime}ms`.green);
        
        return {
            success: true,
            data: results,
            executionTime,
            rowCount: Array.isArray(results) ? results.length : 0
        };
        
    } catch (error) {
        console.error('❌ Error al ejecutar consulta:'.red, error.message);
        return {
            success: false,
            error: error.message,
            data: null
        };
        
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// ===============================================
// 📊 RUTAS PARA LAS CONSULTAS REQUERIDAS
// ===============================================

/**
 * 🏠 Ruta principal con información del API
 */
app.get('/', (req, res) => {
    res.json({
        message: '🎓 API de Consultas Escolares - Módulo 5 Tema 2',
        version: '1.0.0',
        endpoints: {
            consultas: {
                '1. Nota media por asignatura': 'GET /consultas/nota-media-asignatura/:asignaturaId',
                '2. Alumnos con nota entre 1-20 y año pasado': 'GET /consultas/alumnos-rango-notas/:min/:max',
                '3. Media de notas último año por asignatura': 'GET /consultas/media-ultimo-ano/:asignaturaId',
                '4. Media aritmética notas último año por alumno': 'GET /consultas/media-alumno-ultimo-ano/:estudianteId',
                '5. Total alumnos por asignatura con profesor': 'GET /consultas/total-alumnos-asignatura'
            },
            utilidades: {
                'Estado del servidor': 'GET /status',
                'Información de la BD': 'GET /db-info',
                'Listar asignaturas': 'GET /asignaturas',
                'Listar estudiantes': 'GET /estudiantes',
                'Listar profesores': 'GET /profesores'
            }
        }
    });
});

/**
 * 🔍 1. CALCULAR NOTA MEDIA DE LOS ALUMNOS DE LA ASIGNATURA i
 */
app.get('/consultas/nota-media-asignatura/:asignaturaId', async (req, res) => {
    try {
        const { asignaturaId } = req.params;
        
        const query = `
            SELECT 
                s.subject_id,
                s.title as asignatura,
                s.course as curso,
                COUNT(m.mark_id) as total_notas,
                ROUND(AVG(m.mark), 2) as nota_media,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima,
                COUNT(DISTINCT m.student_id) as estudiantes_evaluados
            FROM subjects s
            LEFT JOIN marks m ON s.subject_id = m.subject_id
            WHERE s.subject_id = ?
            GROUP BY s.subject_id, s.title, s.course
        `;
        
        const result = await executeQuery(query, [asignaturaId]);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al ejecutar la consulta',
                error: result.error
            });
        }
        
        if (result.data.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la asignatura con ID ${asignaturaId}`
            });
        }
        
        res.json({
            success: true,
            message: `Nota media de la asignatura ${result.data[0].asignatura}`,
            data: result.data[0],
            executionTime: result.executionTime
        });
        
    } catch (error) {
        console.error('❌ Error en nota-media-asignatura:'.red, error.message);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * 🔍 2. OBTENER ID Y NOTA DE ALUMNOS CON NOTA ENTRE min Y max Y FECHA DEL AÑO PASADO
 */
app.get('/consultas/alumnos-rango-notas/:min/:max', async (req, res) => {
    try {
        const { min, max } = req.params;
        
        // Validar parámetros
        if (isNaN(min) || isNaN(max) || min < 0 || max > 10 || min > max) {
            return res.status(400).json({
                success: false,
                message: 'Los parámetros min y max deben ser números entre 0-10 y min <= max'
            });
        }
        
        const query = `
            SELECT 
                s.student_id,
                CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
                s.email,
                m.mark as nota,
                m.exam_date as fecha_examen,
                sub.title as asignatura,
                sub.course as curso,
                YEAR(m.exam_date) as año_examen
            FROM students s
            JOIN marks m ON s.student_id = m.student_id
            JOIN subjects sub ON m.subject_id = sub.subject_id
            WHERE m.mark BETWEEN ? AND ?
              AND YEAR(m.exam_date) = YEAR(CURDATE()) - 1
            ORDER BY m.mark DESC, s.last_name, s.first_name
        `;
        
        const result = await executeQuery(query, [parseFloat(min), parseFloat(max)]);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al ejecutar la consulta',
                error: result.error
            });
        }
        
        res.json({
            success: true,
            message: `Alumnos con notas entre ${min} y ${max} del año pasado`,
            data: result.data,
            totalRegistros: result.rowCount,
            filtros: {
                notaMinima: parseFloat(min),
                notaMaxima: parseFloat(max),
                año: new Date().getFullYear() - 1
            },
            executionTime: result.executionTime
        });
        
    } catch (error) {
        console.error('❌ Error en alumnos-rango-notas:'.red, error.message);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * 🔍 3. OBTENER MEDIA DE LAS NOTAS QUE SE HAN DADO EN EL ÚLTIMO AÑO POR ASIGNATURA
 */
app.get('/consultas/media-ultimo-ano/:asignaturaId', async (req, res) => {
    try {
        const { asignaturaId } = req.params;
        
        const query = `
            SELECT 
                s.subject_id,
                s.title as asignatura,
                s.course as curso,
                s.credits as creditos,
                COUNT(m.mark_id) as total_notas_ultimo_ano,
                ROUND(AVG(m.mark), 2) as media_ultimo_ano,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima,
                COUNT(DISTINCT m.student_id) as estudiantes_evaluados,
                MIN(m.exam_date) as primera_fecha,
                MAX(m.exam_date) as ultima_fecha,
                COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as aprobados,
                COUNT(CASE WHEN m.mark < 5 THEN 1 END) as suspensos,
                ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.mark_id)), 2) as porcentaje_aprobados
            FROM subjects s
            LEFT JOIN marks m ON s.subject_id = m.subject_id 
                AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
            WHERE s.subject_id = ?
            GROUP BY s.subject_id, s.title, s.course, s.credits
        `;
        
        const result = await executeQuery(query, [asignaturaId]);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al ejecutar la consulta',
                error: result.error
            });
        }
        
        if (result.data.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la asignatura con ID ${asignaturaId}`
            });
        }
        
        res.json({
            success: true,
            message: `Media de notas del último año para ${result.data[0].asignatura}`,
            data: result.data[0],
            periodo: {
                desde: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                hasta: new Date().toISOString().split('T')[0]
            },
            executionTime: result.executionTime
        });
        
    } catch (error) {
        console.error('❌ Error en media-ultimo-ano:'.red, error.message);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * 🔍 4. OBTENER MEDIA ARITMÉTICA DE LAS NOTAS QUE SE HAN DADO EN EL ÚLTIMO AÑO POR ALUMNO
 */
app.get('/consultas/media-alumno-ultimo-ano/:estudianteId', async (req, res) => {
    try {
        const { estudianteId } = req.params;
        
        const query = `
            SELECT 
                s.student_id,
                CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
                s.email,
                s.phone,
                t.name as equipo,
                COUNT(m.mark_id) as total_notas_ultimo_ano,
                ROUND(AVG(m.mark), 2) as media_aritmetica,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima,
                COUNT(DISTINCT m.subject_id) as asignaturas_cursadas,
                MIN(m.exam_date) as primera_evaluacion,
                MAX(m.exam_date) as ultima_evaluacion,
                COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as examenes_aprobados,
                COUNT(CASE WHEN m.mark < 5 THEN 1 END) as examenes_suspensos,
                ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.mark_id)), 2) as porcentaje_aprobados
            FROM students s
            LEFT JOIN teams t ON s.team_id = t.team_id
            LEFT JOIN marks m ON s.student_id = m.student_id 
                AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
            WHERE s.student_id = ?
            GROUP BY s.student_id, s.first_name, s.last_name, s.email, s.phone, t.name
        `;
        
        const result = await executeQuery(query, [estudianteId]);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al ejecutar la consulta',
                error: result.error
            });
        }
        
        if (result.data.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el estudiante con ID ${estudianteId}`
            });
        }
        
        // Obtener detalle de asignaturas del estudiante
        const detalleQuery = `
            SELECT 
                sub.title as asignatura,
                sub.course as curso,
                COUNT(m.mark_id) as evaluaciones,
                ROUND(AVG(m.mark), 2) as media_asignatura,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima
            FROM marks m
            JOIN subjects sub ON m.subject_id = sub.subject_id
            WHERE m.student_id = ?
              AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
            GROUP BY sub.subject_id, sub.title, sub.course
            ORDER BY media_asignatura DESC
        `;
        
        const detalleResult = await executeQuery(detalleQuery, [estudianteId]);
        
        res.json({
            success: true,
            message: `Media aritmética del último año para ${result.data[0].nombre_completo}`,
            data: {
                estudiante: result.data[0],
                detallePorAsignatura: detalleResult.success ? detalleResult.data : []
            },
            periodo: {
                desde: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                hasta: new Date().toISOString().split('T')[0]
            },
            executionTime: result.executionTime
        });
        
    } catch (error) {
        console.error('❌ Error en media-alumno-ultimo-ano:'.red, error.message);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * 🔍 5. OBTENER NÚMERO TOTAL DE ALUMNOS POR ASIGNATURA, NOMBRE DE ASIGNATURA Y NOMBRE Y APELLIDOS DEL PROFESOR QUE LA IMPARTE
 */
app.get('/consultas/total-alumnos-asignatura', async (req, res) => {
    try {
        const query = `
            SELECT 
                sub.subject_id,
                sub.title as nombre_asignatura,
                sub.course as curso,
                sub.credits as creditos,
                CONCAT(t.first_name, ' ', t.last_name) as profesor_nombre_apellidos,
                t.department as departamento_profesor,
                t.email as email_profesor,
                COUNT(DISTINCT m.student_id) as total_alumnos,
                COUNT(m.mark_id) as total_evaluaciones,
                ROUND(AVG(m.mark), 2) as nota_media_asignatura,
                MIN(m.exam_date) as primera_evaluacion,
                MAX(m.exam_date) as ultima_evaluacion
            FROM subjects sub
            JOIN subject_teacher st ON sub.subject_id = st.subject_id
            JOIN teachers t ON st.teacher_id = t.teacher_id
            LEFT JOIN marks m ON sub.subject_id = m.subject_id
            WHERE t.active = TRUE
            GROUP BY sub.subject_id, sub.title, sub.course, sub.credits, 
                     t.teacher_id, t.first_name, t.last_name, t.department, t.email
            ORDER BY total_alumnos DESC, sub.course, sub.title
        `;
        
        const result = await executeQuery(query);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al ejecutar la consulta',
                error: result.error
            });
        }
        
        // Calcular estadísticas generales
        const totalAsignaturas = result.data.length;
        const totalAlumnosUnicos = [...new Set(result.data.flatMap(row => row.total_alumnos))].length;
        const mediaAlumnosPorAsignatura = result.data.reduce((sum, row) => sum + row.total_alumnos, 0) / totalAsignaturas;
        
        res.json({
            success: true,
            message: 'Total de alumnos por asignatura con información del profesor',
            data: result.data,
            estadisticas: {
                totalAsignaturas,
                mediaAlumnosPorAsignatura: Math.round(mediaAlumnosPorAsignatura * 100) / 100,
                asignaturaConMasAlumnos: result.data[0] || null,
                asignaturaConMenosAlumnos: result.data[result.data.length - 1] || null
            },
            totalRegistros: result.rowCount,
            executionTime: result.executionTime
        });
        
    } catch (error) {
        console.error('❌ Error en total-alumnos-asignatura:'.red, error.message);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

// ===============================================
// 🛠️ RUTAS DE UTILIDADES
// ===============================================

/**
 * 📊 Estado del servidor
 */
app.get('/status', async (req, res) => {
    try {
        const testQuery = 'SELECT 1 as test, NOW() as timestamp';
        const result = await executeQuery(testQuery);
        
        res.json({
            success: true,
            message: 'Servidor funcionando correctamente',
            database: result.success ? 'Conectada' : 'Error de conexión',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
});

/**
 * 📋 Información de la base de datos
 */
app.get('/db-info', async (req, res) => {
    try {
        const tablesQuery = `
            SELECT 
                TABLE_NAME as tabla,
                TABLE_ROWS as registros,
                DATA_LENGTH as tamaño_bytes,
                CREATE_TIME as fecha_creacion
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = DATABASE()
            ORDER BY TABLE_NAME
        `;
        
        const result = await executeQuery(tablesQuery);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener información de la BD',
                error: result.error
            });
        }
        
        res.json({
            success: true,
            message: 'Información de la base de datos',
            database: process.env.DB_NAME || 'escuela_db',
            tablas: result.data,
            totalTablas: result.rowCount,
            executionTime: result.executionTime
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * 📚 Listar todas las asignaturas
 */
app.get('/asignaturas', async (req, res) => {
    try {
        const query = `
            SELECT 
                subject_id,
                title as nombre,
                course as curso,
                credits as creditos
            FROM subjects
            ORDER BY course, title
        `;
        
        const result = await executeQuery(query);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener asignaturas',
                error: result.error
            });
        }
        
        res.json({
            success: true,
            message: 'Lista de asignaturas disponibles',
            data: result.data,
            total: result.rowCount,
            executionTime: result.executionTime
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * 👥 Listar todos los estudiantes
 */
app.get('/estudiantes', async (req, res) => {
    try {
        const query = `
            SELECT 
                student_id,
                CONCAT(first_name, ' ', last_name) as nombre_completo,
                email,
                enrollment_date as fecha_matricula
            FROM students
            ORDER BY last_name, first_name
        `;
        
        const result = await executeQuery(query);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener estudiantes',
                error: result.error
            });
        }
        
        res.json({
            success: true,
            message: 'Lista de estudiantes disponibles',
            data: result.data,
            total: result.rowCount,
            executionTime: result.executionTime
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * 👨‍🏫 Listar todos los profesores
 */
app.get('/profesores', async (req, res) => {
    try {
        const query = `
            SELECT 
                teacher_id,
                CONCAT(first_name, ' ', last_name) as nombre_completo,
                email,
                department as departamento
            FROM teachers
            WHERE active = TRUE
            ORDER BY department, last_name, first_name
        `;
        
        const result = await executeQuery(query);
        
        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener profesores',
                error: result.error
            });
        }
        
        res.json({
            success: true,
            message: 'Lista de profesores disponibles',
            data: result.data,
            total: result.rowCount,
            executionTime: result.executionTime
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

// ===============================================
// 🚦 MANEJO DE ERRORES Y MIDDLEWARE
// ===============================================

/**
 * 404 - Ruta no encontrada
 */
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        availableEndpoints: [
            'GET /',
            'GET /status',
            'GET /db-info',
            'GET /asignaturas',
            'GET /estudiantes', 
            'GET /profesores',
            'GET /consultas/nota-media-asignatura/:id',
            'GET /consultas/alumnos-rango-notas/:min/:max',
            'GET /consultas/media-ultimo-ano/:id',
            'GET /consultas/media-alumno-ultimo-ano/:id',
            'GET /consultas/total-alumnos-asignatura'
        ]
    });
});

/**
 * Manejo global de errores
 */
app.use((error, req, res, next) => {
    console.error('💥 Error global:'.red, error);
    
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
});

// ===============================================
// 🚀 INICIALIZACIÓN DEL SERVIDOR
// ===============================================

/**
 * 🎬 Iniciar servidor
 */
async function startServer() {
    try {
        // Crear pool de conexiones
        createPool();
        
        // Probar conexión a la base de datos
        const testQuery = 'SELECT 1 as test, DATABASE() as db, NOW() as timestamp';
        const testResult = await executeQuery(testQuery);
        
        if (!testResult.success) {
            throw new Error(`Error de conexión a la base de datos: ${testResult.error}`);
        }
        
        console.log('✅ Conexión a la base de datos verificada'.green);
        console.log(`📍 Base de datos: ${testResult.data[0].db}`.cyan);
        
        // Iniciar servidor Express
        app.listen(PORT, () => {
            console.log('\n🚀 SERVIDOR INICIADO EXITOSAMENTE'.green);
            console.log('═'.repeat(50));
            console.log(`📡 Puerto: ${PORT}`.cyan);
            console.log(`🌐 URL: http://localhost:${PORT}`.cyan);
            console.log(`📊 Base de datos: ${process.env.DB_NAME || 'escuela_db'}`.cyan);
            console.log(`⏰ Fecha: ${new Date().toLocaleString()}`.gray);
            console.log('\n📋 ENDPOINTS DISPONIBLES:'.blue);
            console.log('   GET  /                                     - Información del API');
            console.log('   GET  /status                               - Estado del servidor');
            console.log('   GET  /db-info                              - Info de la BD');
            console.log('   GET  /asignaturas                          - Lista de asignaturas');
            console.log('   GET  /estudiantes                          - Lista de estudiantes');
            console.log('   GET  /profesores                           - Lista de profesores');
            console.log('\n🔍 CONSULTAS PRINCIPALES:'.yellow);
            console.log('   GET  /consultas/nota-media-asignatura/:id          - Nota media por asignatura');
            console.log('   GET  /consultas/alumnos-rango-notas/:min/:max      - Alumnos por rango de notas');
            console.log('   GET  /consultas/media-ultimo-ano/:id               - Media último año por asignatura');
            console.log('   GET  /consultas/media-alumno-ultimo-ano/:id        - Media último año por alumno');
            console.log('   GET  /consultas/total-alumnos-asignatura           - Total alumnos por asignatura');
            console.log('\n═'.repeat(50));
        });
        
    } catch (error) {
        console.error('💥 ERROR CRÍTICO AL INICIAR SERVIDOR:'.red);
        console.error(`   🚫 ${error.message}`.red);
        console.error('\n💡 POSIBLES SOLUCIONES:'.yellow);
        console.error('   1. Verificar que MySQL esté ejecutándose');
        console.error('   2. Comprobar credenciales en el archivo .env');
        console.error('   3. Verificar que la base de datos existe');
        console.error('   4. Comprobar que el puerto esté disponible');
        
        process.exit(1);
    }
}

// Manejo elegante de cierre
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...'.yellow);
    
    if (pool) {
        await pool.end();
        console.log('🔒 Pool de conexiones cerrado'.gray);
    }
    
    console.log('👋 Servidor cerrado correctamente'.green);
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Cerrando servidor...'.yellow);
    
    if (pool) {
        await pool.end();
        console.log('🔒 Pool de conexiones cerrado'.gray);
    }
    
    console.log('👋 Servidor cerrado correctamente'.green);
    process.exit(0);
});

// Iniciar el servidor
startServer();

export default app;