const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'escuela_db'
};

// Función para obtener conexión a la base de datos
async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        throw error;
    }
}

// ===============================
// ENDPOINTS ALUMNOS
// ===============================

// GET /alumnos/:id o /alumnos/:nombre - Obtiene los datos del alumno
app.get('/alumnos/:identificador', async (req, res) => {
    const { identificador } = req.params;
    let connection;

    try {
        connection = await getConnection();
        
        // Determinar si es ID (número) o nombre
        const isId = !isNaN(identificador);
        const query = isId 
            ? 'SELECT * FROM alumnos WHERE id = ?'
            : 'SELECT * FROM alumnos WHERE nombre = ?';
            
        const [rows] = await connection.execute(query, [identificador]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /alumnos - Obtiene toda la lista de alumnos
app.get('/alumnos', async (req, res) => {
    let connection;

    try {
        connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM alumnos ORDER BY id');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// POST /alumnos - Añade un nuevo alumno
app.post('/alumnos', async (req, res) => {
    const { nombre, email, edad } = req.body;
    let connection;

    try {
        if (!nombre || !email) {
            return res.status(400).json({ error: 'Nombre y email son requeridos' });
        }

        connection = await getConnection();
        const query = 'INSERT INTO alumnos (nombre, email, edad) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [nombre, email, edad || null]);
        
        res.status(201).json({
            message: 'Alumno creado exitosamente',
            id: result.insertId,
            alumno: { id: result.insertId, nombre, email, edad }
        });
    } catch (error) {
        console.error('Error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'El email ya existe' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } finally {
        if (connection) await connection.end();
    }
});

// PUT /alumnos - Modifica los datos de un alumno
app.put('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, edad } = req.body;
    let connection;

    try {
        connection = await getConnection();
        
        // Verificar que el alumno existe
        const [existing] = await connection.execute('SELECT * FROM alumnos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        const query = 'UPDATE alumnos SET nombre = ?, email = ?, edad = ? WHERE id = ?';
        await connection.execute(query, [nombre, email, edad, id]);
        
        res.json({
            message: 'Alumno actualizado exitosamente',
            alumno: { id: parseInt(id), nombre, email, edad }
        });
    } catch (error) {
        console.error('Error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'El email ya existe' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } finally {
        if (connection) await connection.end();
    }
});

// DELETE /alumnos - Elimina un alumno
app.delete('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
        connection = await getConnection();
        
        // Verificar que el alumno existe
        const [existing] = await connection.execute('SELECT * FROM alumnos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        // Eliminar primero las notas del alumno (por clave foránea)
        await connection.execute('DELETE FROM notas WHERE alumno_id = ?', [id]);
        
        // Eliminar el alumno
        await connection.execute('DELETE FROM alumnos WHERE id = ?', [id]);
        
        res.json({ message: 'Alumno eliminado exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// ===============================
// ENDPOINTS ASIGNATURAS Y NOTAS
// ===============================

// GET /media?id=5 o /media?nombre=Juan - Obtiene la nota media del alumno
app.get('/media', async (req, res) => {
    const { id, nombre } = req.query;
    let connection;

    try {
        if (!id && !nombre) {
            return res.status(400).json({ error: 'Se requiere id o nombre del alumno' });
        }

        connection = await getConnection();
        
        let alumnoQuery, alumnoParams;
        if (id) {
            alumnoQuery = 'SELECT id, nombre FROM alumnos WHERE id = ?';
            alumnoParams = [id];
        } else {
            alumnoQuery = 'SELECT id, nombre FROM alumnos WHERE nombre = ?';
            alumnoParams = [nombre];
        }

        const [alumno] = await connection.execute(alumnoQuery, alumnoParams);
        if (alumno.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        const mediaQuery = `
            SELECT AVG(n.nota) as media_notas, COUNT(n.nota) as total_notas
            FROM notas n
            WHERE n.alumno_id = ?
        `;
        
        const [mediaResult] = await connection.execute(mediaQuery, [alumno[0].id]);
        
        res.json({
            alumno: alumno[0].nombre,
            media: mediaResult[0].media_notas ? parseFloat(mediaResult[0].media_notas).toFixed(2) : null,
            total_notas: mediaResult[0].total_notas
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /apuntadas?id=5 o /apuntadas?nombre=Juan - Lista las asignaturas del alumno
app.get('/apuntadas', async (req, res) => {
    const { id, nombre } = req.query;
    let connection;

    try {
        if (!id && !nombre) {
            return res.status(400).json({ error: 'Se requiere id o nombre del alumno' });
        }

        connection = await getConnection();
        
        let query, params;
        if (id) {
            query = `
                SELECT a.nombre as asignatura, n.nota
                FROM alumnos al
                JOIN notas n ON al.id = n.alumno_id
                JOIN asignaturas a ON n.asignatura_id = a.id
                WHERE al.id = ?
                ORDER BY a.nombre
            `;
            params = [id];
        } else {
            query = `
                SELECT a.nombre as asignatura, n.nota
                FROM alumnos al
                JOIN notas n ON al.id = n.alumno_id
                JOIN asignaturas a ON n.asignatura_id = a.id
                WHERE al.nombre = ?
                ORDER BY a.nombre
            `;
            params = [nombre];
        }

        const [rows] = await connection.execute(query, params);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No se encontraron asignaturas para este alumno' });
        }
        
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// Endpoint de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de Alumnos y Asignaturas funcionando correctamente',
        endpoints: {
            alumnos: {
                'GET /alumnos': 'Lista todos los alumnos',
                'GET /alumnos/:id': 'Obtiene un alumno por ID',
                'GET /alumnos/:nombre': 'Obtiene un alumno por nombre',
                'POST /alumnos': 'Crea un nuevo alumno',
                'PUT /alumnos/:id': 'Actualiza un alumno',
                'DELETE /alumnos/:id': 'Elimina un alumno'
            },
            notas: {
                'GET /media?id=X': 'Obtiene la media de notas de un alumno',
                'GET /media?nombre=X': 'Obtiene la media de notas de un alumno',
                'GET /apuntadas?id=X': 'Lista asignaturas de un alumno',
                'GET /apuntadas?nombre=X': 'Lista asignaturas de un alumno'
            }
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log('📚 API de Alumnos y Asignaturas lista para usar');
});

module.exports = app;