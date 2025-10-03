const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

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
    database: process.env.DB_NAME || 'museo_db',
    charset: 'utf8mb4'
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

// ===============================================
// ENDPOINTS PARA PIEZAS
// ===============================================

// GET /piezas -> Listar todas las piezas del museo
app.get('/piezas', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const query = `
            SELECT 
                p.id,
                p.codigo_pieza,
                p.nombre,
                p.descripcion,
                CONCAT(a.nombre, ' ', a.apellidos) as autor,
                p.año_creacion,
                p.epoca,
                p.material,
                p.tecnica,
                p.dimensiones,
                p.estado_conservacion,
                p.ubicacion_actual,
                c.nombre as coleccion,
                p.valor_estimado,
                p.fecha_adquisicion
            FROM piezas p
            LEFT JOIN autores a ON p.autor_id = a.id
            LEFT JOIN colecciones c ON p.coleccion_id = c.id
            ORDER BY p.nombre
        `;
        
        const [rows] = await connection.execute(query);
        res.json({
            success: true,
            total: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /piezas/:id -> Obtener detalles de una pieza específica
app.get('/piezas/:id', async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
        connection = await getConnection();
        const query = `
            SELECT 
                p.*,
                CONCAT(a.nombre, ' ', a.apellidos) as autor_completo,
                a.nacionalidad,
                a.fecha_nacimiento,
                a.fecha_muerte,
                c.nombre as coleccion_nombre,
                c.tipo_coleccion,
                ev.codigo as expositor_codigo,
                ev.ubicacion as expositor_ubicacion,
                ev.sala
            FROM piezas p
            LEFT JOIN autores a ON p.autor_id = a.id
            LEFT JOIN colecciones c ON p.coleccion_id = c.id
            LEFT JOIN expositores_vitrinas ev ON p.expositor_vitrina_id = ev.id
            WHERE p.id = ?
        `;
        
        const [rows] = await connection.execute(query, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Pieza no encontrada' });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// POST /piezas -> Crear una nueva pieza en la colección
app.post('/piezas', async (req, res) => {
    const {
        codigo_pieza,
        nombre,
        descripcion,
        autor_id,
        año_creacion,
        epoca,
        material,
        tecnica,
        dimensiones,
        peso,
        estado_conservacion,
        valor_estimado,
        fecha_adquisicion,
        procedencia,
        coleccion_id,
        numero_inventario,
        observaciones
    } = req.body;
    
    let connection;

    try {
        if (!codigo_pieza || !nombre) {
            return res.status(400).json({ 
                success: false, 
                error: 'Código de pieza y nombre son requeridos' 
            });
        }

        connection = await getConnection();
        
        const query = `
            INSERT INTO piezas (
                codigo_pieza, nombre, descripcion, autor_id, año_creacion, epoca,
                material, tecnica, dimensiones, peso, estado_conservacion,
                valor_estimado, fecha_adquisicion, procedencia, coleccion_id,
                numero_inventario, observaciones
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await connection.execute(query, [
            codigo_pieza, nombre, descripcion, autor_id, año_creacion, epoca,
            material, tecnica, dimensiones, peso, estado_conservacion || 'bueno',
            valor_estimado, fecha_adquisicion, procedencia, coleccion_id,
            numero_inventario, observaciones
        ]);
        
        res.status(201).json({
            success: true,
            message: 'Pieza creada exitosamente',
            data: {
                id: result.insertId,
                codigo_pieza,
                nombre
            }
        });
    } catch (error) {
        console.error('Error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ 
                success: false, 
                error: 'El código de pieza o número de inventario ya existe' 
            });
        } else {
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    } finally {
        if (connection) await connection.end();
    }
});

// PUT /piezas -> Actualizar los detalles de una pieza
app.put('/piezas/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    let connection;

    try {
        connection = await getConnection();
        
        // Verificar que la pieza existe
        const [existing] = await connection.execute('SELECT id FROM piezas WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, error: 'Pieza no encontrada' });
        }

        // Construir query dinámico
        const fields = Object.keys(updateData).filter(key => updateData[key] !== undefined);
        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const values = fields.map(field => updateData[field]);
        
        if (fields.length === 0) {
            return res.status(400).json({ success: false, error: 'No hay datos para actualizar' });
        }

        const query = `UPDATE piezas SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        values.push(id);
        
        await connection.execute(query, values);
        
        res.json({
            success: true,
            message: 'Pieza actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// DELETE /piezas -> Eliminar una pieza del sistema
app.delete('/piezas/:id', async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
        connection = await getConnection();
        
        // Verificar que la pieza existe
        const [existing] = await connection.execute('SELECT codigo_pieza, nombre FROM piezas WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, error: 'Pieza no encontrada' });
        }

        // Eliminar la pieza (el historial se mantendrá por CASCADE)
        await connection.execute('DELETE FROM piezas WHERE id = ?', [id]);
        
        res.json({
            success: true,
            message: 'Pieza eliminada exitosamente',
            pieza: existing[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /prestamos -> Obtener el listado de todas las piezas en préstamo, incluyendo detalles del dueño y fechas
app.get('/prestamos', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const query = `
            SELECT 
                pr.id,
                p.codigo_pieza,
                p.nombre as pieza_nombre,
                CONCAT(a.nombre, ' ', a.apellidos) as autor,
                pr.institucion_prestamo,
                pr.responsable_nombre,
                pr.responsable_email,
                pr.responsable_telefono,
                pr.fecha_prestamo,
                pr.fecha_devolucion_prevista,
                pr.fecha_devolucion_real,
                pr.estado,
                DATEDIFF(pr.fecha_devolucion_prevista, CURDATE()) as dias_restantes,
                pr.seguro_valor,
                pr.condiciones_prestamo,
                pr.notas
            FROM prestamos pr
            JOIN piezas p ON pr.pieza_id = p.id
            LEFT JOIN autores a ON p.autor_id = a.id
            ORDER BY pr.fecha_prestamo DESC
        `;
        
        const [rows] = await connection.execute(query);
        res.json({
            success: true,
            total: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /colecciones -> Listar todas las colecciones y sus piezas, filtrado por tipo de colección
app.get('/colecciones', async (req, res) => {
    const { tipo } = req.query;
    let connection;

    try {
        connection = await getConnection();
        
        let query = `
            SELECT 
                c.id,
                c.nombre,
                c.descripcion,
                c.tipo_coleccion,
                c.fecha_inicio,
                c.fecha_fin,
                c.ubicacion,
                c.activa,
                COUNT(p.id) as total_piezas,
                SUM(CASE WHEN p.ubicacion_actual = 'expuesta' THEN 1 ELSE 0 END) as piezas_expuestas,
                SUM(CASE WHEN p.ubicacion_actual = 'almacenada' THEN 1 ELSE 0 END) as piezas_almacenadas,
                SUM(CASE WHEN p.ubicacion_actual = 'prestamo' THEN 1 ELSE 0 END) as piezas_prestamo,
                AVG(p.valor_estimado) as valor_promedio
            FROM colecciones c
            LEFT JOIN piezas p ON c.id = p.coleccion_id
        `;
        
        const params = [];
        if (tipo) {
            query += ' WHERE c.tipo_coleccion = ?';
            params.push(tipo);
        }
        
        query += ' GROUP BY c.id ORDER BY c.nombre';
        
        const [rows] = await connection.execute(query, params);
        res.json({
            success: true,
            total: rows.length,
            filtro: tipo || 'todos',
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// ===============================================
// ENDPOINTS ADICIONALES DE CONSULTA
// ===============================================

// GET /autores -> Listar todos los autores
app.get('/autores', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const query = `
            SELECT 
                a.*,
                COUNT(p.id) as total_piezas
            FROM autores a
            LEFT JOIN piezas p ON a.id = p.autor_id
            GROUP BY a.id
            ORDER BY a.apellidos, a.nombre
        `;
        
        const [rows] = await connection.execute(query);
        res.json({
            success: true,
            total: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// GET /estadisticas -> Estadísticas generales del museo
app.get('/estadisticas', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        
        const queries = {
            totalPiezas: 'SELECT COUNT(*) as total FROM piezas',
            piezasExpuestas: 'SELECT COUNT(*) as total FROM piezas WHERE ubicacion_actual = "expuesta"',
            piezasAlmacenadas: 'SELECT COUNT(*) as total FROM piezas WHERE ubicacion_actual = "almacenada"',
            piezasPrestamo: 'SELECT COUNT(*) as total FROM piezas WHERE ubicacion_actual = "prestamo"',
            totalAutores: 'SELECT COUNT(*) as total FROM autores',
            totalColecciones: 'SELECT COUNT(*) as total FROM colecciones',
            prestamosActivos: 'SELECT COUNT(*) as total FROM prestamos WHERE estado = "activo"',
            valorTotal: 'SELECT SUM(valor_estimado) as total FROM piezas WHERE valor_estimado IS NOT NULL'
        };
        
        const estadisticas = {};
        
        for (const [key, query] of Object.entries(queries)) {
            const [result] = await connection.execute(query);
            estadisticas[key] = result[0].total;
        }
        
        res.json({
            success: true,
            data: estadisticas
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    } finally {
        if (connection) await connection.end();
    }
});

// ===============================================
// ENDPOINT PRINCIPAL Y DOCUMENTACIÓN
// ===============================================

app.get('/', (req, res) => {
    res.json({
        message: '🏛️ API REST - Sistema de Gestión de Museo',
        version: '1.0.0',
        proyecto: 'Proyecto Final Módulo 5',
        endpoints: {
            piezas: {
                'GET /piezas': 'Listar todas las piezas del museo',
                'GET /piezas/:id': 'Obtener detalles de una pieza específica',
                'POST /piezas': 'Crear una nueva pieza en la colección',
                'PUT /piezas/:id': 'Actualizar los detalles de una pieza',
                'DELETE /piezas/:id': 'Eliminar una pieza del sistema'
            },
            prestamos: {
                'GET /prestamos': 'Obtener listado de piezas en préstamo con detalles'
            },
            colecciones: {
                'GET /colecciones': 'Listar colecciones y sus piezas',
                'GET /colecciones?tipo=permanente': 'Filtrar por tipo de colección'
            },
            adicionales: {
                'GET /autores': 'Listar todos los autores',
                'GET /estadisticas': 'Estadísticas generales del museo'
            }
        },
        database: 'museo_db',
        status: 'Funcionando correctamente ✅'
    });
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
    console.error('Error no manejado:', error);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🏛️ Servidor del Museo corriendo en http://localhost:${PORT}`);
    console.log('📚 API REST lista para gestionar las piezas del museo');
    console.log('🔗 Visita http://localhost:3000 para ver la documentación');
});

module.exports = app;