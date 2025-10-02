/**
 * 🏗️ CONFIGURACIÓN DE BASE DE DATOS MYSQL
 * Módulo 5 - Tema 1: Conexión y configuración MySQL
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import colors from 'colors';

// Cargar variables de entorno
dotenv.config();

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'escuela_db',
    port: parseInt(process.env.DB_PORT) || 3306,
    // Configuraciones adicionales para optimización
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    charset: 'utf8mb4'
};

// Pool de conexiones para mejor rendimiento
let pool;

/**
 * 🔌 Crear pool de conexiones MySQL
 */
export const createPool = () => {
    try {
        pool = mysql.createPool(dbConfig);
        console.log('✅ Pool de conexiones MySQL creado exitosamente'.green);
        return pool;
    } catch (error) {
        console.error('❌ Error al crear pool de conexiones:'.red, error.message);
        throw error;
    }
};

/**
 * 🧪 Probar conexión a la base de datos
 */
export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        
        // Ejecutar una consulta simple para probar la conexión
        const [rows] = await connection.execute('SELECT 1 as test, NOW() as current_time');
        
        console.log('🔗 Conexión a MySQL exitosa:'.green);
        console.log(`   📍 Host: ${dbConfig.host}:${dbConfig.port}`);
        console.log(`   🏷️  Base de datos: ${dbConfig.database}`);
        console.log(`   👤 Usuario: ${dbConfig.user}`);
        console.log(`   ⏰ Fecha/Hora: ${rows[0].current_time}`);
        
        // Liberar la conexión
        connection.release();
        
        return true;
    } catch (error) {
        console.error('❌ Error al conectar con MySQL:'.red);
        console.error(`   🚫 Mensaje: ${error.message}`);
        console.error(`   📍 Host: ${dbConfig.host}:${dbConfig.port}`);
        console.error(`   🏷️  Base de datos: ${dbConfig.database}`);
        return false;
    }
};

/**
 * 📊 Obtener información del esquema de la base de datos
 */
export const getDatabaseInfo = async () => {
    try {
        const connection = await pool.getConnection();
        
        // Obtener lista de tablas
        const [tables] = await connection.execute(`
            SELECT TABLE_NAME as table_name, 
                   TABLE_ROWS as row_count,
                   DATA_LENGTH as data_length,
                   CREATE_TIME as created_at
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = ?
            ORDER BY TABLE_NAME
        `, [dbConfig.database]);
        
        // Obtener información general de la base de datos
        const [dbInfo] = await connection.execute(`
            SELECT SCHEMA_NAME as database_name,
                   DEFAULT_CHARACTER_SET_NAME as charset,
                   DEFAULT_COLLATION_NAME as collation
            FROM information_schema.SCHEMATA 
            WHERE SCHEMA_NAME = ?
        `, [dbConfig.database]);
        
        connection.release();
        
        return {
            database: dbInfo[0],
            tables: tables,
            totalTables: tables.length
        };
        
    } catch (error) {
        console.error('❌ Error al obtener información de la base de datos:'.red, error.message);
        throw error;
    }
};

/**
 * 🔍 Ejecutar consulta personalizada
 */
export const executeQuery = async (query, params = []) => {
    let connection;
    try {
        connection = await pool.getConnection();
        
        console.log('🔍 Ejecutando consulta:'.cyan);
        console.log(`   📝 SQL: ${query.substring(0, 100)}${query.length > 100 ? '...' : ''}`);
        console.log(`   📋 Parámetros: ${params.length > 0 ? JSON.stringify(params) : 'Ninguno'}`);
        
        const startTime = Date.now();
        const [results] = await connection.execute(query, params);
        const executionTime = Date.now() - startTime;
        
        console.log(`✅ Consulta ejecutada exitosamente en ${executionTime}ms`.green);
        
        return {
            results,
            executionTime,
            affectedRows: results.affectedRows || 0,
            rowCount: Array.isArray(results) ? results.length : 0
        };
        
    } catch (error) {
        console.error('❌ Error al ejecutar consulta:'.red, error.message);
        throw error;
        
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

/**
 * 📊 Ejecutar múltiples consultas en transacción
 */
export const executeTransaction = async (queries) => {
    let connection;
    try {
        connection = await pool.getConnection();
        
        // Iniciar transacción
        await connection.beginTransaction();
        console.log('🔄 Iniciando transacción...'.yellow);
        
        const results = [];
        
        for (let i = 0; i < queries.length; i++) {
            const { query, params = [] } = queries[i];
            
            console.log(`📝 Ejecutando consulta ${i + 1}/${queries.length}...`);
            const startTime = Date.now();
            const [result] = await connection.execute(query, params);
            const executionTime = Date.now() - startTime;
            
            results.push({
                queryIndex: i,
                result,
                executionTime,
                affectedRows: result.affectedRows || 0
            });
        }
        
        // Confirmar transacción
        await connection.commit();
        console.log('✅ Transacción completada exitosamente'.green);
        
        return results;
        
    } catch (error) {
        // Rollback en caso de error
        if (connection) {
            await connection.rollback();
            console.log('🔄 Rollback realizado por error'.yellow);
        }
        
        console.error('❌ Error en transacción:'.red, error.message);
        throw error;
        
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

/**
 * 🔒 Cerrar pool de conexiones
 */
export const closePool = async () => {
    try {
        if (pool) {
            await pool.end();
            console.log('🔒 Pool de conexiones cerrado correctamente'.yellow);
        }
    } catch (error) {
        console.error('❌ Error al cerrar pool de conexiones:'.red, error.message);
    }
};

// Manejar cierre elegante de la aplicación
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando aplicación...'.yellow);
    await closePool();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Cerrando aplicación...'.yellow);
    await closePool();
    process.exit(0);
});

export default {
    createPool,
    testConnection,
    getDatabaseInfo,
    executeQuery,
    executeTransaction,
    closePool
};