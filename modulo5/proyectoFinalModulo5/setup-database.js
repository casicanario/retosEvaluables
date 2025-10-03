const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
};

async function setupDatabase() {
    let connection;

    try {
        console.log('🏛️ Configurando base de datos del museo...');
        
        // Conectar sin especificar base de datos
        connection = await mysql.createConnection(dbConfig);
        
        // Leer y ejecutar el script SQL
        const sqlPath = path.join(__dirname, '01_crear_base_datos.sql');
        const sqlScript = await fs.readFile(sqlPath, 'utf8');
        
        console.log('📄 Ejecutando script de creación de base de datos...');
        await connection.query(sqlScript);
        
        console.log('✅ Base de datos del museo configurada exitosamente');
        console.log('📊 Tablas creadas:');
        console.log('   - autores (información de artistas)');
        console.log('   - colecciones (colecciones del museo)');
        console.log('   - expositores_vitrinas (ubicaciones de exposición)');
        console.log('   - piezas (catálogo principal)');
        console.log('   - prestamos (gestión de préstamos)');
        console.log('   - historial_ubicaciones (trazabilidad)');
        console.log('🎨 Datos de ejemplo insertados correctamente');
        
    } catch (error) {
        console.error('❌ Error configurando la base de datos:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Ejecutar setup si el archivo se ejecuta directamente
if (require.main === module) {
    setupDatabase()
        .then(() => {
            console.log('✨ Setup del museo completado exitosamente');
            console.log('🚀 Ahora puedes iniciar la API con: npm start');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Error en el setup:', error);
            process.exit(1);
        });
}

module.exports = { setupDatabase };