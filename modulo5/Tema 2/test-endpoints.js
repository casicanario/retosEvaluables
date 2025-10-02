/**
 * 🧪 PRUEBAS DE ENDPOINTS
 * Módulo 5 - Tema 2: Test de todas las consultas
 */

import colors from 'colors';

const BASE_URL = 'http://localhost:3000';

/**
 * 🔍 Realizar petición HTTP
 */
async function makeRequest(endpoint, description) {
    try {
        console.log(`\n🔍 Probando: ${description}`.cyan);
        console.log(`📡 Endpoint: ${endpoint}`.gray);
        
        const startTime = Date.now();
        const response = await fetch(`${BASE_URL}${endpoint}`);
        const endTime = Date.now();
        
        const data = await response.json();
        
        if (response.ok) {
            console.log(`✅ ${response.status} - ${description}`.green);
            console.log(`⏱️  Tiempo: ${endTime - startTime}ms`.gray);
            
            if (data.data && Array.isArray(data.data)) {
                console.log(`📊 Registros: ${data.data.length}`.blue);
            } else if (data.totalRegistros) {
                console.log(`📊 Registros: ${data.totalRegistros}`.blue);
            }
            
            // Mostrar algunos datos de ejemplo
            if (data.data) {
                if (Array.isArray(data.data) && data.data.length > 0) {
                    console.log(`📋 Ejemplo:`.yellow, JSON.stringify(data.data[0], null, 2).substring(0, 200) + '...');
                } else if (typeof data.data === 'object') {
                    console.log(`📋 Datos:`.yellow, JSON.stringify(data.data, null, 2).substring(0, 200) + '...');
                }
            }
        } else {
            console.log(`❌ ${response.status} - Error en ${description}`.red);
            console.log(`💬 Mensaje: ${data.message || 'Error desconocido'}`.red);
        }
        
        return { success: response.ok, data, status: response.status };
        
    } catch (error) {
        console.log(`💥 Error de conexión: ${error.message}`.red);
        return { success: false, error: error.message };
    }
}

/**
 * 🧪 Ejecutar todas las pruebas
 */
async function runAllTests() {
    console.log('🧪 INICIANDO PRUEBAS DE ENDPOINTS'.cyan);
    console.log('═'.repeat(60));
    
    const tests = [
        // Endpoints básicos
        {
            endpoint: '/',
            description: 'Información principal del API'
        },
        {
            endpoint: '/status',
            description: 'Estado del servidor'
        },
        {
            endpoint: '/db-info',
            description: 'Información de la base de datos'
        },
        
        // Endpoints de utilidades
        {
            endpoint: '/asignaturas',
            description: 'Lista de asignaturas'
        },
        {
            endpoint: '/estudiantes',
            description: 'Lista de estudiantes'
        },
        {
            endpoint: '/profesores',
            description: 'Lista de profesores'
        },
        
        // Consultas principales (usando IDs de ejemplo)
        {
            endpoint: '/consultas/nota-media-asignatura/1',
            description: 'Nota media de asignatura ID=1'
        },
        {
            endpoint: '/consultas/nota-media-asignatura/2',
            description: 'Nota media de asignatura ID=2'
        },
        {
            endpoint: '/consultas/alumnos-rango-notas/5/8',
            description: 'Alumnos con notas entre 5 y 8'
        },
        {
            endpoint: '/consultas/alumnos-rango-notas/0/10',
            description: 'Alumnos con notas entre 0 y 10'
        },
        {
            endpoint: '/consultas/media-ultimo-ano/1',
            description: 'Media último año asignatura ID=1'
        },
        {
            endpoint: '/consultas/media-ultimo-ano/3',
            description: 'Media último año asignatura ID=3'
        },
        {
            endpoint: '/consultas/media-alumno-ultimo-ano/1',
            description: 'Media último año estudiante ID=1'
        },
        {
            endpoint: '/consultas/media-alumno-ultimo-ano/5',
            description: 'Media último año estudiante ID=5'
        },
        {
            endpoint: '/consultas/total-alumnos-asignatura',
            description: 'Total alumnos por asignatura con profesor'
        },
        
        // Test de error 404
        {
            endpoint: '/ruta-inexistente',
            description: 'Test de error 404'
        }
    ];
    
    let successful = 0;
    let failed = 0;
    const results = [];
    
    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        const result = await makeRequest(test.endpoint, test.description);
        
        results.push({
            ...test,
            ...result
        });
        
        if (result.success) {
            successful++;
        } else {
            failed++;
        }
        
        // Pequeña pausa entre requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Resumen final
    console.log('\n📊 RESUMEN DE PRUEBAS'.green);
    console.log('═'.repeat(60));
    console.log(`📝 Total de pruebas: ${tests.length}`);
    console.log(`✅ Exitosas: ${successful}`.green);
    console.log(`❌ Fallidas: ${failed}`.red);
    console.log(`📈 Tasa de éxito: ${((successful / tests.length) * 100).toFixed(2)}%`);
    
    // Mostrar fallos si los hay
    if (failed > 0) {
        console.log('\n❌ PRUEBAS FALLIDAS:'.red);
        results.filter(r => !r.success).forEach(result => {
            console.log(`  - ${result.description}: ${result.error || result.data?.message || 'Error desconocido'}`);
        });
    }
    
    console.log('\n🎉 Pruebas completadas'.cyan);
}

/**
 * 📝 Generar documentación de endpoints
 */
function generateDocumentation() {
    console.log('\n📚 DOCUMENTACIÓN DE ENDPOINTS'.blue);
    console.log('═'.repeat(60));
    
    const endpoints = [
        {
            method: 'GET',
            path: '/',
            description: 'Información general del API',
            example: 'curl http://localhost:3000/'
        },
        {
            method: 'GET',
            path: '/status',
            description: 'Estado del servidor y conexión BD',
            example: 'curl http://localhost:3000/status'
        },
        {
            method: 'GET',
            path: '/consultas/nota-media-asignatura/:id',
            description: 'Calcular nota media de asignatura',
            example: 'curl http://localhost:3000/consultas/nota-media-asignatura/1'
        },
        {
            method: 'GET',
            path: '/consultas/alumnos-rango-notas/:min/:max',
            description: 'Alumnos con notas en rango (año pasado)',
            example: 'curl http://localhost:3000/consultas/alumnos-rango-notas/5/8'
        },
        {
            method: 'GET',
            path: '/consultas/media-ultimo-ano/:id',
            description: 'Media de notas último año por asignatura',
            example: 'curl http://localhost:3000/consultas/media-ultimo-ano/1'
        },
        {
            method: 'GET',
            path: '/consultas/media-alumno-ultimo-ano/:id',
            description: 'Media aritmética último año por alumno',
            example: 'curl http://localhost:3000/consultas/media-alumno-ultimo-ano/1'
        },
        {
            method: 'GET',
            path: '/consultas/total-alumnos-asignatura',
            description: 'Total alumnos por asignatura con profesor',
            example: 'curl http://localhost:3000/consultas/total-alumnos-asignatura'
        }
    ];
    
    endpoints.forEach(endpoint => {
        console.log(`\n${endpoint.method.padEnd(6)} ${endpoint.path}`.yellow);
        console.log(`       ${endpoint.description}`.gray);
        console.log(`       ${endpoint.example}`.cyan);
    });
    
    console.log('\n💡 Tip: Para ver ejemplos detallados, visita http://localhost:3000/'.yellow);
}

// Verificar si el servidor está ejecutándose
async function checkServer() {
    try {
        const response = await fetch(`${BASE_URL}/status`);
        if (response.ok) {
            console.log('✅ Servidor detectado, iniciando pruebas...'.green);
            return true;
        } else {
            console.log('❌ Servidor responde pero con errores'.red);
            return false;
        }
    } catch (error) {
        console.log('❌ No se puede conectar al servidor'.red);
        console.log('💡 Asegúrate de que el servidor esté ejecutándose con: npm start'.yellow);
        return false;
    }
}

// Función principal
async function main() {
    console.log('🚀 TESTER DE ENDPOINTS - MÓDULO 5 TEMA 2'.cyan);
    console.log(`🌐 Servidor: ${BASE_URL}`.gray);
    console.log('═'.repeat(60));
    
    const serverRunning = await checkServer();
    
    if (serverRunning) {
        await runAllTests();
    }
    
    generateDocumentation();
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export default { makeRequest, runAllTests, generateDocumentation };