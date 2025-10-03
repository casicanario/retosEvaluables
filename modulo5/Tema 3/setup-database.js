const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
};

const databaseName = process.env.DB_NAME || 'escuela_db';

async function setupDatabase() {
    let connection;

    try {
        console.log('🔧 Configurando base de datos...');
        
        // Conectar sin especificar base de datos
        connection = await mysql.createConnection(dbConfig);
        
        // Crear base de datos si no existe
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
        console.log(`✅ Base de datos '${databaseName}' creada/verificada`);
        
        // Seleccionar la base de datos
        await connection.execute(`USE ${databaseName}`);
        
        // Crear tabla alumnos
        const createAlumnosTable = `
            CREATE TABLE IF NOT EXISTS alumnos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(150) UNIQUE NOT NULL,
                edad INT,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.execute(createAlumnosTable);
        console.log('✅ Tabla alumnos creada/verificada');
        
        // Crear tabla asignaturas
        const createAsignaturasTable = `
            CREATE TABLE IF NOT EXISTS asignaturas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL UNIQUE,
                creditos INT DEFAULT 6,
                descripcion TEXT
            )
        `;
        await connection.execute(createAsignaturasTable);
        console.log('✅ Tabla asignaturas creada/verificada');
        
        // Crear tabla notas (relación muchos a muchos)
        const createNotasTable = `
            CREATE TABLE IF NOT EXISTS notas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                alumno_id INT NOT NULL,
                asignatura_id INT NOT NULL,
                nota DECIMAL(4,2) NOT NULL CHECK (nota >= 0 AND nota <= 10),
                fecha_examen DATE,
                FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE,
                FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id) ON DELETE CASCADE,
                UNIQUE KEY unique_alumno_asignatura (alumno_id, asignatura_id)
            )
        `;
        await connection.execute(createNotasTable);
        console.log('✅ Tabla notas creada/verificada');
        
        // Insertar datos de ejemplo
        await insertSampleData(connection);
        
        console.log('🎉 Base de datos configurada exitosamente');
        
    } catch (error) {
        console.error('❌ Error configurando la base de datos:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function insertSampleData(connection) {
    try {
        // Verificar si ya hay datos
        const [existingAlumnos] = await connection.execute('SELECT COUNT(*) as count FROM alumnos');
        if (existingAlumnos[0].count > 0) {
            console.log('ℹ️  Los datos de ejemplo ya existen, omitiendo inserción');
            return;
        }

        console.log('📝 Insertando datos de ejemplo...');

        // Insertar alumnos de ejemplo
        const alumnos = [
            ['Juan Pérez', 'juan.perez@email.com', 20],
            ['María García', 'maria.garcia@email.com', 19],
            ['Carlos López', 'carlos.lopez@email.com', 21],
            ['Ana Martínez', 'ana.martinez@email.com', 18],
            ['Pedro Sánchez', 'pedro.sanchez@email.com', 22]
        ];

        for (const [nombre, email, edad] of alumnos) {
            await connection.execute(
                'INSERT INTO alumnos (nombre, email, edad) VALUES (?, ?, ?)',
                [nombre, email, edad]
            );
        }

        // Insertar asignaturas de ejemplo
        const asignaturas = [
            ['Matemáticas', 6, 'Matemáticas básicas y avanzadas'],
            ['Física', 6, 'Principios fundamentales de física'],
            ['Química', 4, 'Química general y orgánica'],
            ['Historia', 4, 'Historia universal y contemporánea'],
            ['Literatura', 4, 'Literatura clásica y moderna'],
            ['Inglés', 6, 'Idioma inglés nivel intermedio-avanzado']
        ];

        for (const [nombre, creditos, descripcion] of asignaturas) {
            await connection.execute(
                'INSERT INTO asignaturas (nombre, creditos, descripcion) VALUES (?, ?, ?)',
                [nombre, creditos, descripcion]
            );
        }

        // Insertar notas de ejemplo
        const notas = [
            // Juan Pérez (id: 1)
            [1, 1, 8.5, '2024-01-15'], // Matemáticas
            [1, 2, 7.2, '2024-01-20'], // Física
            [1, 3, 9.0, '2024-01-25'], // Química
            
            // María García (id: 2)
            [2, 1, 9.5, '2024-01-15'], // Matemáticas
            [2, 4, 8.8, '2024-01-18'], // Historia
            [2, 5, 9.2, '2024-01-22'], // Literatura
            
            // Carlos López (id: 3)
            [3, 2, 6.5, '2024-01-20'], // Física
            [3, 3, 7.8, '2024-01-25'], // Química
            [3, 6, 8.0, '2024-01-28'], // Inglés
            
            // Ana Martínez (id: 4)
            [4, 1, 9.8, '2024-01-15'], // Matemáticas
            [4, 4, 8.5, '2024-01-18'], // Historia
            [4, 5, 9.0, '2024-01-22'], // Literatura
            [4, 6, 8.7, '2024-01-28'], // Inglés
            
            // Pedro Sánchez (id: 5)
            [5, 2, 7.5, '2024-01-20'], // Física
            [5, 3, 8.2, '2024-01-25'], // Química
            [5, 6, 7.8, '2024-01-28']  // Inglés
        ];

        for (const [alumno_id, asignatura_id, nota, fecha] of notas) {
            await connection.execute(
                'INSERT INTO notas (alumno_id, asignatura_id, nota, fecha_examen) VALUES (?, ?, ?, ?)',
                [alumno_id, asignatura_id, nota, fecha]
            );
        }

        console.log('✅ Datos de ejemplo insertados correctamente');
        
    } catch (error) {
        console.error('❌ Error insertando datos de ejemplo:', error);
        throw error;
    }
}

// Ejecutar setup si el archivo se ejecuta directamente
if (require.main === module) {
    setupDatabase()
        .then(() => {
            console.log('✨ Setup completado exitosamente');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Error en el setup:', error);
            process.exit(1);
        });
}

module.exports = { setupDatabase };