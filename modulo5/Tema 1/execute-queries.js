/**
 * 🚀 EJECUTOR DE CONSULTAS SQL
 * Módulo 5 - Tema 1: Ejecutar todas las consultas SQL requeridas
 */

import fs from 'fs/promises';
import path from 'path';
import db from './database.js';
import colors from 'colors';

/**
 * 📄 Leer archivo SQL y dividir consultas
 */
async function readSQLFile(filePath) {
    try {
        const sqlContent = await fs.readFile(filePath, 'utf8');
        
        // Dividir el contenido en consultas individuales
        // Filtrar comentarios y líneas vacías
        const queries = sqlContent
            .split(';')
            .map(query => query.trim())
            .filter(query => 
                query.length > 0 && 
                !query.startsWith('--') && 
                !query.startsWith('/*') &&
                !query.match(/^\s*\/\*/)
            )
            .map(query => query + ';');
        
        return queries;
        
    } catch (error) {
        console.error('❌ Error al leer archivo SQL:'.red, error.message);
        throw error;
    }
}

/**
 * 🔍 Ejecutar consultas específicas por categoría
 */
const queryCategories = {
    
    // 🔧 Modificaciones de tabla direccion
    tableModifications: [
        {
            name: "Añadir columna teléfono",
            query: `ALTER TABLE direccion ADD COLUMN telefono VARCHAR(15) COMMENT 'Teléfono de contacto de la dirección';`
        },
        {
            name: "Añadir columna temporal",
            query: `ALTER TABLE direccion ADD COLUMN columna_temporal VARCHAR(50) COMMENT 'Columna temporal que será eliminada';`
        },
        {
            name: "Eliminar columna temporal",
            query: `ALTER TABLE direccion DROP COLUMN columna_temporal;`
        },
        {
            name: "Describir tabla direccion",
            query: `DESCRIBE direccion;`
        }
    ],
    
    // 🗑️ Eliminación de tabla direccion
    tableDeletion: [
        {
            name: "Actualizar referencias en students",
            query: `UPDATE students SET direccion_id = NULL WHERE direccion_id IS NOT NULL;`
        },
        {
            name: "Actualizar referencias en teachers",
            query: `UPDATE teachers SET direccion_id = NULL WHERE direccion_id IS NOT NULL;`
        },
        {
            name: "Eliminar FK de students",
            query: `ALTER TABLE students DROP FOREIGN KEY students_ibfk_2;`
        },
        {
            name: "Eliminar FK de teachers",
            query: `ALTER TABLE teachers DROP FOREIGN KEY teachers_ibfk_1;`
        },
        {
            name: "Eliminar columna direccion_id de students",
            query: `ALTER TABLE students DROP COLUMN direccion_id;`
        },
        {
            name: "Eliminar columna direccion_id de teachers",
            query: `ALTER TABLE teachers DROP COLUMN direccion_id;`
        },
        {
            name: "Eliminar tabla direccion",
            query: `DROP TABLE direccion;`
        }
    ],
    
    // 🔄 Actualización de notas
    marksUpdate: [
        {
            name: "Setear todas las notas a 0",
            query: `UPDATE marks SET mark = 0.0, comments = CONCAT('Nota modificada a 0 - ', IFNULL(comments, 'Sin comentarios previos')), updated_at = CURRENT_TIMESTAMP;`
        },
        {
            name: "Verificar notas seteadas a 0",
            query: `SELECT COUNT(*) as total_notas_modificadas, MIN(mark) as nota_minima, MAX(mark) as nota_maxima FROM marks;`
        }
    ],
    
    // 👥 Consultas de estudiantes
    studentQueries: [
        {
            name: "Obtener nombre y primer apellido de estudiantes",
            query: `SELECT student_id, first_name as nombre, SUBSTRING_INDEX(last_name, ' ', 1) as primer_apellido, email, enrollment_date as fecha_matricula FROM students ORDER BY first_name, primer_apellido;`
        }
    ],
    
    // 👨‍🏫 Consultas de profesores
    teacherQueries: [
        {
            name: "Obtener todos los datos de profesores",
            query: `SELECT teacher_id, first_name as nombre, last_name as apellidos, email, phone as telefono, hire_date as fecha_contratacion, department as departamento, salary as salario, active as activo, created_at as fecha_creacion, updated_at as ultima_actualizacion FROM teachers ORDER BY department, last_name, first_name;`
        }
    ],
    
    // 🗑️ Eliminación de notas antiguas
    oldMarksCleanup: [
        {
            name: "Consultar notas antiguas (más de 10 años)",
            query: `SELECT COUNT(*) as notas_antiguas, MIN(exam_date) as fecha_mas_antigua, MAX(exam_date) as fecha_mas_reciente_antigua FROM marks WHERE exam_date < DATE_SUB(CURDATE(), INTERVAL 10 YEAR);`
        },
        {
            name: "Eliminar notas antiguas",
            query: `DELETE FROM marks WHERE exam_date < DATE_SUB(CURDATE(), INTERVAL 10 YEAR);`
        }
    ],
    
    // 🔄 Actualización condicional de notas
    conditionalUpdate: [
        {
            name: "Consultar notas menores a 5",
            query: `SELECT COUNT(*) as notas_menores_a_5, COUNT(DISTINCT student_id) as estudiantes_afectados, AVG(mark) as promedio_notas_bajas FROM marks WHERE mark < 5.0;`
        },
        {
            name: "Actualizar notas menores a 5",
            query: `UPDATE marks SET mark = 5.0, comments = CASE WHEN comments IS NULL OR comments = '' THEN 'Nota ajustada a 5.0 por criterio pedagógico' ELSE CONCAT(comments, ' | Nota ajustada a 5.0 por criterio pedagógico') END, updated_at = CURRENT_TIMESTAMP WHERE mark < 5.0;`
        },
        {
            name: "Verificar actualización",
            query: `SELECT COUNT(*) as total_notas, COUNT(CASE WHEN mark < 5.0 THEN 1 END) as notas_menores_a_5, COUNT(CASE WHEN mark = 5.0 THEN 1 END) as notas_igual_a_5, COUNT(CASE WHEN mark > 5.0 THEN 1 END) as notas_mayores_a_5, MIN(mark) as nota_minima, MAX(mark) as nota_maxima, AVG(mark) as promedio_general FROM marks;`
        }
    ],
    
    // 📊 Verificaciones finales
    finalVerifications: [
        {
            name: "Resumen de registros por tabla",
            query: `SELECT 'students' as tabla, COUNT(*) as registros FROM students UNION ALL SELECT 'teachers' as tabla, COUNT(*) as registros FROM teachers UNION ALL SELECT 'subjects' as tabla, COUNT(*) as registros FROM subjects UNION ALL SELECT 'teams' as tabla, COUNT(*) as registros FROM teams UNION ALL SELECT 'subject_teacher' as tabla, COUNT(*) as registros FROM subject_teacher UNION ALL SELECT 'marks' as tabla, COUNT(*) as registros FROM marks;`
        },
        {
            name: "Estadísticas finales de notas",
            query: `SELECT 'Estadísticas de Notas' as titulo, COUNT(*) as total_notas, MIN(mark) as nota_minima, MAX(mark) as nota_maxima, AVG(mark) as promedio, COUNT(CASE WHEN mark >= 5.0 THEN 1 END) as aprobados, COUNT(CASE WHEN mark < 5.0 THEN 1 END) as suspensos, ROUND((COUNT(CASE WHEN mark >= 5.0 THEN 1 END) * 100.0 / COUNT(*)), 2) as porcentaje_aprobados FROM marks;`
        }
    ]
};

/**
 * 🏃‍♂️ Ejecutar categoría de consultas
 */
async function executeQueryCategory(categoryName, queries) {
    console.log(`\n🔵 EJECUTANDO CATEGORÍA: ${categoryName}`.blue);
    console.log('─'.repeat(60));
    
    const results = [];
    
    for (let i = 0; i < queries.length; i++) {
        const { name, query } = queries[i];
        
        try {
            console.log(`\n📝 ${i + 1}/${queries.length}. ${name}...`);
            
            const result = await db.executeQuery(query);
            
            // Mostrar resultado según el tipo de consulta
            if (result.results && Array.isArray(result.results) && result.results.length > 0) {
                if (result.results.length <= 10) {
                    console.log('📊 Resultados:'.green);
                    console.table(result.results);
                } else {
                    console.log(`📊 Resultados: ${result.results.length} filas encontradas (mostrando primeras 5)`.green);
                    console.table(result.results.slice(0, 5));
                }
            } else if (result.affectedRows > 0) {
                console.log(`✅ Operación completada: ${result.affectedRows} filas afectadas`.green);
            } else {
                console.log('✅ Consulta ejecutada exitosamente'.green);
            }
            
            console.log(`⏱️  Tiempo: ${result.executionTime}ms`);
            
            results.push({
                name,
                success: true,
                result: result,
                executionTime: result.executionTime
            });
            
        } catch (error) {
            console.error(`❌ Error en "${name}":`.red, error.message);
            
            results.push({
                name,
                success: false,
                error: error.message
            });
            
            // Continuar con la siguiente consulta en caso de error
            continue;
        }
    }
    
    return results;
}

/**
 * 🎯 Función principal
 */
async function executeAllQueries() {
    console.log('🚀 INICIANDO EJECUCIÓN DE CONSULTAS SQL'.cyan);
    console.log('═'.repeat(60));
    
    try {
        // Crear pool de conexiones
        db.createPool();
        
        // Probar conexión
        const connectionTest = await db.testConnection();
        if (!connectionTest) {
            throw new Error('No se pudo establecer conexión con la base de datos');
        }
        
        const allResults = {};
        const startTime = Date.now();
        
        // Ejecutar cada categoría de consultas
        for (const [categoryName, queries] of Object.entries(queryCategories)) {
            allResults[categoryName] = await executeQueryCategory(categoryName, queries);
            
            // Pausa breve entre categorías
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const totalTime = Date.now() - startTime;
        
        // 📊 Resumen final
        console.log('\n🎉 RESUMEN FINAL DE EJECUCIÓN'.green);
        console.log('═'.repeat(60));
        
        let totalQueries = 0;
        let totalSuccessful = 0;
        let totalFailed = 0;
        
        for (const [categoryName, results] of Object.entries(allResults)) {
            const successful = results.filter(r => r.success).length;
            const failed = results.filter(r => !r.success).length;
            
            totalQueries += results.length;
            totalSuccessful += successful;
            totalFailed += failed;
            
            console.log(`📋 ${categoryName}:`);
            console.log(`   ✅ Exitosas: ${successful}`);
            console.log(`   ❌ Fallidas: ${failed}`);
            
            // Mostrar errores si los hay
            const failedQueries = results.filter(r => !r.success);
            if (failedQueries.length > 0) {
                console.log('   🔍 Errores:');
                failedQueries.forEach(fail => {
                    console.log(`      - ${fail.name}: ${fail.error}`);
                });
            }
        }
        
        console.log('\n📊 ESTADÍSTICAS GENERALES:');
        console.log(`   📝 Total de consultas: ${totalQueries}`);
        console.log(`   ✅ Exitosas: ${totalSuccessful}`);
        console.log(`   ❌ Fallidas: ${totalFailed}`);
        console.log(`   📈 Tasa de éxito: ${((totalSuccessful / totalQueries) * 100).toFixed(2)}%`);
        console.log(`   ⏱️  Tiempo total: ${totalTime}ms`);
        
        // 💾 Guardar resultado en archivo de log
        const logContent = {
            timestamp: new Date().toISOString(),
            totalQueries,
            totalSuccessful,
            totalFailed,
            successRate: (totalSuccessful / totalQueries) * 100,
            executionTime: totalTime,
            results: allResults
        };
        
        await fs.writeFile(
            './execution-log.json', 
            JSON.stringify(logContent, null, 2)
        );
        
        console.log('\n💾 Log de ejecución guardado en: execution-log.json'.yellow);
        
        if (totalFailed === 0) {
            console.log('\n🎉 ¡TODAS LAS CONSULTAS EJECUTADAS EXITOSAMENTE!'.green);
        } else {
            console.log(`\n⚠️  Se completó con ${totalFailed} errores. Revisa el log para más detalles.`.yellow);
        }
        
    } catch (error) {
        console.error('\n❌ ERROR CRÍTICO:'.red, error.message);
        process.exit(1);
        
    } finally {
        await db.closePool();
        console.log('\n🔒 Conexiones cerradas. Ejecución finalizada.'.yellow);
    }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    executeAllQueries();
}

export default executeAllQueries;