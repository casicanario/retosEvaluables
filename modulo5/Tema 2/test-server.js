import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3002;

app.use(express.json());

// Configuración simple de BD
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Loktarcamarada_1',
    database: 'escuela_db',
    port: 3306
};

// Endpoint de prueba
app.get('/test', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT COUNT(*) as total FROM subjects');
        await connection.end();
        
        res.json({
            success: true,
            message: 'Conexión exitosa',
            data: rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Consulta 1: Nota media por asignatura
app.get('/consultas/nota-media-asignatura/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        
        const query = `
            SELECT 
                sub.subject_id,
                sub.title as nombre_asignatura,
                sub.semester as semestre,
                sub.credits as creditos,
                ROUND(AVG(m.mark), 2) as nota_media,
                COUNT(m.mark_id) as total_evaluaciones,
                MIN(m.mark) as nota_minima,
                MAX(m.mark) as nota_maxima
            FROM subjects sub
            LEFT JOIN marks m ON sub.subject_id = m.subject_id
            WHERE sub.subject_id = ?
            GROUP BY sub.subject_id, sub.title, sub.semester, sub.credits
        `;
        
        const [rows] = await connection.execute(query, [id]);
        await connection.end();
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Asignatura no encontrada'
            });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de prueba corriendo en puerto ${PORT}`);
});