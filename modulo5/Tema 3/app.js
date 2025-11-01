const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'escuela_db'
};

async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        throw error;
    }
}

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API REST de Alumnos y Asignaturas - Modulo 5 Tema 3',
        version: '1.0.0',
        endpoints: {
            alumnos: {
                'GET /alumnos': 'Lista todos los alumnos',
                'GET /alumnos/:id': 'Obtiene un alumno por ID',
                'POST /alumnos': 'Crea un nuevo alumno',
                'PUT /alumnos/:id': 'Actualiza un alumno',
                'DELETE /alumnos/:id': 'Elimina un alumno'
            },
            notas: {
                'GET /media/:id': 'Obtiene la media de notas de un alumno',
                'GET /asignaturas/:id': 'Lista asignaturas de un alumno'
            }
        }
    });
});

// GET /alumnos - Obtiene todos los alumnos
app.get('/alumnos', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(
            'SELECT student_id, first_name, last_name, email, phone, enrollment_date FROM students'
        );
        
        res.json({
            success: true,
            data: rows,
            total: rows.length
        });
    } catch (error) {
        console.error('Error obteniendo alumnos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la lista de alumnos',
            error: error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /alumnos/:id - Obtiene un alumno por ID
app.get('/alumnos/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un número válido'
            });
        }

        connection = await getConnection();
        const [rows] = await connection.execute(
            'SELECT student_id, first_name, last_name, email, phone, enrollment_date FROM students WHERE student_id = ?',
            [id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Alumno no encontrado'
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error obteniendo alumno:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el alumno',
            error: error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

// POST /alumnos - Añade un nuevo alumno
app.post('/alumnos', async (req, res) => {
    let connection;
    try {
        const { first_name, last_name, email, phone } = req.body;
        
        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Los campos first_name, last_name y email son obligatorios'
            });
        }

        connection = await getConnection();
        const [result] = await connection.execute(
            'INSERT INTO students (first_name, last_name, email, phone, enrollment_date) VALUES (?, ?, ?, ?, NOW())',
            [first_name, last_name, email, phone || null]
        );
        
        res.status(201).json({
            success: true,
            message: 'Alumno creado exitosamente',
            data: {
                student_id: result.insertId,
                first_name,
                last_name,
                email,
                phone
            }
        });
    } catch (error) {
        console.error('Error creando alumno:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el alumno',
            error: error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

// PUT /alumnos/:id - Modifica un alumno existente
app.put('/alumnos/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone } = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un número válido'
            });
        }

        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Los campos first_name, last_name y email son obligatorios'
            });
        }

        connection = await getConnection();
        const [result] = await connection.execute(
            'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE student_id = ?',
            [first_name, last_name, email, phone || null, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Alumno no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Alumno actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error actualizando alumno:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el alumno',
            error: error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

// DELETE /alumnos/:id - Elimina un alumno
app.delete('/alumnos/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un número válido'
            });
        }

        connection = await getConnection();
        const [result] = await connection.execute(
            'DELETE FROM students WHERE student_id = ?',
            [id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Alumno no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Alumno eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error eliminando alumno:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el alumno',
            error: error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /media/:id - Obtiene la nota media del alumno por ID
app.get('/media/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un número válido'
            });
        }

        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT 
                s.student_id,
                CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
                COUNT(m.mark_id) as total_evaluaciones,
                ROUND(AVG(m.mark), 2) as nota_media,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima
            FROM students s
            LEFT JOIN marks m ON s.student_id = m.student_id
            WHERE s.student_id = ?
            GROUP BY s.student_id, s.first_name, s.last_name
        `, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Alumno no encontrado'
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error obteniendo media de notas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la media de notas',
            error: error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /asignaturas/:id - Obtiene las asignaturas del alumno por ID
app.get('/asignaturas/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un número válido'
            });
        }

        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT DISTINCT
                sub.subject_id,
                sub.title as nombre_asignatura,
                sub.semester as semestre,
                sub.credits as creditos,
                COUNT(m.mark_id) as evaluaciones_realizadas,
                ROUND(AVG(m.mark), 2) as nota_media_asignatura
            FROM subjects sub
            INNER JOIN marks m ON sub.subject_id = m.subject_id
            WHERE m.student_id = ?
            GROUP BY sub.subject_id, sub.title, sub.semester, sub.credits
            ORDER BY sub.title
        `, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron asignaturas para este alumno'
            });
        }

        res.json({
            success: true,
            data: rows,
            total: rows.length
        });
    } catch (error) {
        console.error('Error obteniendo asignaturas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las asignaturas',
            error: error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('API de Alumnos y Asignaturas lista para usar');
});

module.exports = app;
