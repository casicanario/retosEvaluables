/**
 * 🏗️ INSTALADOR Y VERIFICADOR DE LA BASE DE DATOS
 * Módulo 5 - Tema 1: Instalación automática del esquema
 */

import fs from 'fs/promises';
import db from './database.js';
import colors from 'colors';

/**
 * 📄 Leer y ejecutar archivo SQL línea por línea
 */
async function executeSQLFile(filePath) {
    try {
        console.log(`📄 Leyendo archivo: ${filePath}`.blue);
        
        const sqlContent = await fs.readFile(filePath, 'utf8');
        
        // Dividir el contenido en sentencias SQL
        const statements = sqlContent
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => 
                stmt.length > 0 && 
                !stmt.startsWith('--') && 
                !stmt.match(/^\s*\/\*/) &&
                !stmt.match(/^\s*\*/) &&
                stmt !== 'USE escuela_db'
            );
        
        console.log(`📝 Se encontraron ${statements.length} sentencias SQL`.cyan);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            
            if (statement.trim().length === 0) continue;
            
            try {
                await db.executeQuery(statement);
                successCount++;
                
                // Mostrar progreso cada 10 sentencias
                if ((i + 1) % 10 === 0) {
                    console.log(`✅ Progreso: ${i + 1}/${statements.length} sentencias ejecutadas`.green);
                }
                
            } catch (error) {
                errorCount++;
                console.error(`❌ Error en sentencia ${i + 1}:`.red, error.message);
                
                // Mostrar la sentencia que falló (primeros 100 caracteres)
                console.error(`📝 Sentencia: ${statement.substring(0, 100)}${statement.length > 100 ? '...' : ''}`);
                
                // Continuar con la siguiente sentencia
                continue;
            }
        }
        
        console.log(`\n📊 Resumen de ejecución del archivo ${filePath}:`);
        console.log(`   ✅ Exitosas: ${successCount}`);
        console.log(`   ❌ Errores: ${errorCount}`);
        console.log(`   📈 Tasa de éxito: ${((successCount / (successCount + errorCount)) * 100).toFixed(2)}%`);
        
        return { successCount, errorCount };
        
    } catch (error) {
        console.error('❌ Error al leer archivo SQL:'.red, error.message);
        throw error;
    }
}

/**
 * 🔍 Verificar instalación de la base de datos
 */
async function verifyInstallation() {
    try {
        console.log('\n🔍 VERIFICANDO INSTALACIÓN DE LA BASE DE DATOS'.cyan);
        console.log('═'.repeat(60));
        
        // Verificar que la base de datos existe
        const dbCheckQuery = `
            SELECT SCHEMA_NAME 
            FROM INFORMATION_SCHEMA.SCHEMATA 
            WHERE SCHEMA_NAME = 'escuela_db'
        `;
        
        const dbResult = await db.executeQuery(dbCheckQuery);
        
        if (dbResult.results.length === 0) {
            throw new Error('La base de datos "escuela_db" no existe');
        }
        
        console.log('✅ Base de datos "escuela_db" existe'.green);
        
        // Verificar tablas esperadas
        const expectedTables = ['students', 'teachers', 'subjects', 'teams', 'subject_teacher', 'marks'];
        
        const tablesQuery = `
            SELECT TABLE_NAME as table_name, TABLE_ROWS as row_count
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'escuela_db'
            ORDER BY TABLE_NAME
        `;
        
        const tablesResult = await db.executeQuery(tablesQuery);
        const existingTables = tablesResult.results.map(t => t.table_name);
        
        console.log('\n📊 ESTADO DE LAS TABLAS:'.blue);
        expectedTables.forEach(tableName => {
            if (existingTables.includes(tableName)) {
                const tableInfo = tablesResult.results.find(t => t.table_name === tableName);
                console.log(`   ✅ ${tableName} (${tableInfo.row_count || 0} registros)`);
            } else {
                console.log(`   ❌ ${tableName} - NO EXISTE`);
            }
        });
        
        // Tabla direccion debería estar eliminada después de las consultas
        if (existingTables.includes('direccion')) {
            console.log('   ⚠️  direccion - EXISTE (será eliminada por las consultas)'.yellow);
        } else {
            console.log('   🗑️  direccion - ELIMINADA (correcto)'.gray);
        }
        
        // Estadísticas generales
        console.log('\n📈 ESTADÍSTICAS GENERALES:'.blue);
        for (const tableName of expectedTables) {
            if (existingTables.includes(tableName)) {
                try {
                    const countResult = await db.executeQuery(`SELECT COUNT(*) as total FROM ${tableName}`);
                    console.log(`   📋 ${tableName}: ${countResult.results[0].total} registros`);
                } catch (error) {
                    console.log(`   ❌ ${tableName}: Error al contar registros`);
                }
            }
        }
        
        console.log('\n✅ VERIFICACIÓN COMPLETADA'.green);
        return true;
        
    } catch (error) {
        console.error('\n❌ ERROR EN VERIFICACIÓN:'.red, error.message);
        return false;
    }
}

/**
 * 🎯 Función principal de instalación
 */
async function installDatabase() {
    console.log('🏗️  INSTALADOR DE BASE DE DATOS - MÓDULO 5 TEMA 1'.cyan);
    console.log('═'.repeat(60));
    
    try {
        // Crear pool de conexiones
        db.createPool();
        
        // Probar conexión inicial
        console.log('🔌 Probando conexión a MySQL...'.yellow);
        const connectionTest = await db.testConnection();
        
        if (!connectionTest) {
            throw new Error('No se pudo establecer conexión con MySQL');
        }
        
        // Verificar si la base de datos ya existe
        console.log('\n🔍 Verificando estado actual...'.blue);
        
        try {
            const dbInfo = await db.getDatabaseInfo();
            console.log(`✅ Base de datos "${dbInfo.database.database_name}" ya existe`.yellow);
            console.log(`📊 Contiene ${dbInfo.totalTables} tablas`);
            
            const response = 'y'; // Automático para la demostración
            
            if (response.toLowerCase() === 'y') {
                console.log('🔄 Continuando con la instalación...'.blue);
            } else {
                console.log('🛑 Instalación cancelada por el usuario'.yellow);
                return;
            }
            
        } catch (error) {
            console.log('ℹ️  La base de datos no existe, se creará durante la instalación'.blue);
        }
        
        // Ejecutar script de creación del esquema
        console.log('\n🏗️  Ejecutando script de creación del esquema...'.blue);
        const schemaResult = await executeSQLFile('./01_crear_esquema.sql');
        
        if (schemaResult.errorCount > 0) {
            console.log(`⚠️  Se creó el esquema con ${schemaResult.errorCount} errores`.yellow);
        } else {
            console.log('✅ Esquema creado exitosamente'.green);
        }
        
        // Verificar la instalación
        const verificationResult = await verifyInstallation();
        
        if (verificationResult) {
            console.log('\n🎉 ¡INSTALACIÓN COMPLETADA EXITOSAMENTE!'.green);
            console.log('═'.repeat(60));
            console.log('📱 Puedes ejecutar la aplicación con: npm start'.cyan);
            console.log('🧪 Puedes probar las consultas con: npm run queries'.cyan);
            console.log('🔍 Puedes probar la conexión con: npm run test'.cyan);
        } else {
            console.log('\n⚠️  Instalación completada con advertencias'.yellow);
            console.log('💡 Revisa los mensajes anteriores para más detalles');
        }
        
    } catch (error) {
        console.error('\n❌ ERROR CRÍTICO EN LA INSTALACIÓN:'.red);
        console.error(`   🚫 Mensaje: ${error.message}`);
        console.error('\n💡 POSIBLES SOLUCIONES:');
        console.error('   1. Verificar que MySQL esté ejecutándose');
        console.error('   2. Comprobar las credenciales en el archivo .env');
        console.error('   3. Asegurar permisos de creación de base de datos');
        console.error('   4. Verificar que el puerto 3306 esté disponible');
        
        process.exit(1);
        
    } finally {
        await db.closePool();
        console.log('\n🔒 Conexiones cerradas. Instalador finalizado.'.yellow);
    }
}

// Ejecutar instalación si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    installDatabase();
}

export default installDatabase;