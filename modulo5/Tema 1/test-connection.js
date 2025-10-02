/**
 * 🧪 TEST DE CONEXIÓN A LA BASE DE DATOS
 * Módulo 5 - Tema 1: Verificar conectividad MySQL
 */

import db from './database.js';
import colors from 'colors';

/**
 * 🏃‍♂️ Función principal de pruebas
 */
async function runTests() {
    console.log('🧪 INICIANDO PRUEBAS DE CONEXIÓN MYSQL'.cyan);
    console.log('=' .repeat(50));
    
    try {
        // 1. Crear pool de conexiones
        console.log('\n📊 1. Creando pool de conexiones...'.blue);
        db.createPool();
        
        // 2. Probar conexión básica
        console.log('\n🔌 2. Probando conexión básica...'.blue);
        const connectionResult = await db.testConnection();
        
        if (!connectionResult) {
            throw new Error('No se pudo establecer conexión con la base de datos');
        }
        
        // 3. Obtener información de la base de datos
        console.log('\n📋 3. Obteniendo información de la base de datos...'.blue);
        const dbInfo = await db.getDatabaseInfo();
        
        console.log('\n📊 INFORMACIÓN DE LA BASE DE DATOS:'.green);
        console.log(`   🏷️  Nombre: ${dbInfo.database.database_name}`);
        console.log(`   🔤 Charset: ${dbInfo.database.charset}`);
        console.log(`   📝 Collation: ${dbInfo.database.collation}`);
        console.log(`   📊 Total de tablas: ${dbInfo.totalTables}`);
        
        console.log('\n📋 TABLAS EN LA BASE DE DATOS:'.green);
        dbInfo.tables.forEach((table, index) => {
            console.log(`   ${index + 1}. ${table.table_name} (${table.row_count || 0} filas)`);
        });
        
        // 4. Ejecutar consulta de prueba
        console.log('\n🔍 4. Ejecutando consulta de prueba...'.blue);
        const testQuery = `
            SELECT 
                'Conexión exitosa' as status,
                DATABASE() as current_database,
                USER() as current_user,
                VERSION() as mysql_version,
                NOW() as current_timestamp
        `;
        
        const queryResult = await db.executeQuery(testQuery);
        
        console.log('\n✅ RESULTADO DE LA CONSULTA DE PRUEBA:'.green);
        console.log(queryResult.results[0]);
        console.log(`⏱️  Tiempo de ejecución: ${queryResult.executionTime}ms`);
        
        // 5. Verificar existencia de tablas del proyecto
        console.log('\n🔍 5. Verificando tablas del proyecto...'.blue);
        const tableCheckQuery = `
            SELECT 
                table_name,
                CASE 
                    WHEN table_name IN ('students', 'teachers', 'subjects', 'teams', 'subject_teacher', 'marks') 
                    THEN '✅ Existe'
                    ELSE '❌ No existe'
                END as status
            FROM information_schema.tables 
            WHERE table_schema = DATABASE()
            ORDER BY table_name
        `;
        
        const tableCheckResult = await db.executeQuery(tableCheckQuery);
        
        console.log('\n📊 ESTADO DE LAS TABLAS DEL PROYECTO:'.green);
        tableCheckResult.results.forEach(table => {
            console.log(`   ${table.status} ${table.table_name}`);
        });
        
        // 6. Estadísticas de datos
        console.log('\n📈 6. Obteniendo estadísticas de datos...'.blue);
        const statsQueries = [
            'SELECT COUNT(*) as total FROM students',
            'SELECT COUNT(*) as total FROM teachers', 
            'SELECT COUNT(*) as total FROM subjects',
            'SELECT COUNT(*) as total FROM teams',
            'SELECT COUNT(*) as total FROM subject_teacher',
            'SELECT COUNT(*) as total FROM marks'
        ];
        
        const tableNames = ['students', 'teachers', 'subjects', 'teams', 'subject_teacher', 'marks'];
        
        console.log('\n📊 ESTADÍSTICAS DE REGISTROS:'.green);
        for (let i = 0; i < statsQueries.length; i++) {
            try {
                const result = await db.executeQuery(statsQueries[i]);
                console.log(`   📋 ${tableNames[i]}: ${result.results[0].total} registros`);
            } catch (error) {
                console.log(`   ❌ ${tableNames[i]}: Error al consultar (${error.message})`);
            }
        }
        
        console.log('\n🎉 TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE'.green);
        console.log('=' .repeat(50));
        
    } catch (error) {
        console.log('\n❌ ERROR EN LAS PRUEBAS:'.red);
        console.log(`   🚫 Mensaje: ${error.message}`);
        console.log('   💡 Posibles soluciones:');
        console.log('      1. Verificar que MySQL esté ejecutándose');
        console.log('      2. Comprobar las credenciales en el archivo .env');
        console.log('      3. Asegurar que la base de datos "escuela_db" existe');
        console.log('      4. Verificar los permisos del usuario de MySQL');
        
        process.exit(1);
        
    } finally {
        // Cerrar conexiones
        await db.closePool();
        console.log('\n🔒 Conexiones cerradas. Test finalizado.'.yellow);
    }
}

// Ejecutar las pruebas
runTests();