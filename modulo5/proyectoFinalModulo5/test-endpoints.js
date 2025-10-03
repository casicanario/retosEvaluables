const http = require('http');

// Configuración
const BASE_URL = 'http://localhost:3000';

// Función auxiliar para hacer peticiones HTTP
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const jsonBody = body ? JSON.parse(body) : {};
                    resolve({
                        status: res.statusCode,
                        data: jsonBody
                    });
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Función para mostrar resultados
function showResult(testName, response) {
    console.log(`\n🧪 ${testName}`);
    console.log(`📊 Status: ${response.status}`);
    if (response.data && typeof response.data === 'object') {
        if (response.data.data && Array.isArray(response.data.data)) {
            console.log(`📄 Registros: ${response.data.data.length}`);
            if (response.data.data.length > 0) {
                console.log(`📄 Primer registro:`, JSON.stringify(response.data.data[0], null, 2));
            }
        } else {
            console.log(`📄 Response:`, JSON.stringify(response.data, null, 2));
        }
    } else {
        console.log(`📄 Response:`, response.data);
    }
    console.log('─'.repeat(70));
}

async function runTests() {
    console.log('🏛️ Iniciando pruebas de la API del Museo...\n');
    
    try {
        // Test 1: Verificar que el servidor esté funcionando
        console.log('🔍 Verificando conexión al servidor...');
        const healthCheck = await makeRequest('GET', '/');
        showResult('Health Check - Documentación API', healthCheck);

        // Test 2: Obtener todas las piezas
        const allPieces = await makeRequest('GET', '/piezas');
        showResult('GET /piezas - Todas las piezas del museo', allPieces);

        // Test 3: Obtener pieza específica por ID
        const pieceById = await makeRequest('GET', '/piezas/1');
        showResult('GET /piezas/1 - Pieza específica', pieceById);

        // Test 4: Crear nueva pieza
        const newPiece = {
            codigo_pieza: 'TEST-001',
            nombre: 'Pieza de Prueba',
            descripcion: 'Obra creada para pruebas del sistema',
            autor_id: 1,
            año_creacion: 2024,
            epoca: 'Contemporáneo',
            material: 'Óleo sobre lienzo',
            tecnica: 'Pintura digital',
            dimensiones: '50 × 70 cm',
            estado_conservacion: 'excelente',
            valor_estimado: 5000.00,
            fecha_adquisicion: '2024-10-03',
            procedencia: 'Creación para pruebas',
            coleccion_id: 1,
            numero_inventario: 'INV-TEST-001',
            observaciones: 'Pieza creada automáticamente para pruebas'
        };
        const createPiece = await makeRequest('POST', '/piezas', newPiece);
        showResult('POST /piezas - Crear nueva pieza', createPiece);

        // Obtener el ID de la nueva pieza para pruebas posteriores
        const newPieceId = createPiece.data?.data?.id;

        // Test 5: Actualizar pieza
        if (newPieceId) {
            const updateData = {
                descripcion: 'Obra creada para pruebas del sistema - ACTUALIZADA',
                valor_estimado: 7500.00
            };
            const updatePiece = await makeRequest('PUT', `/piezas/${newPieceId}`, updateData);
            showResult('PUT /piezas/:id - Actualizar pieza', updatePiece);
        }

        // Test 6: Obtener todos los préstamos
        const allLoans = await makeRequest('GET', '/prestamos');
        showResult('GET /prestamos - Todas las piezas en préstamo', allLoans);

        // Test 7: Obtener todas las colecciones
        const allCollections = await makeRequest('GET', '/colecciones');
        showResult('GET /colecciones - Todas las colecciones', allCollections);

        // Test 8: Filtrar colecciones por tipo
        const permanentCollections = await makeRequest('GET', '/colecciones?tipo=permanente');
        showResult('GET /colecciones?tipo=permanente - Colecciones permanentes', permanentCollections);

        // Test 9: Obtener todos los autores
        const allAuthors = await makeRequest('GET', '/autores');
        showResult('GET /autores - Todos los autores', allAuthors);

        // Test 10: Obtener estadísticas del museo
        const stats = await makeRequest('GET', '/estadisticas');
        showResult('GET /estadisticas - Estadísticas generales', stats);

        // Test 11: Eliminar pieza de prueba
        if (newPieceId) {
            const deletePiece = await makeRequest('DELETE', `/piezas/${newPieceId}`);
            showResult('DELETE /piezas/:id - Eliminar pieza', deletePiece);
        }

        // Tests de casos de error
        console.log('\n🚨 Probando casos de error...\n');

        // Test 12: Pieza no encontrada
        const notFound = await makeRequest('GET', '/piezas/9999');
        showResult('GET /piezas/9999 - Pieza no encontrada', notFound);

        // Test 13: Crear pieza con datos incompletos
        const incompleteData = {
            nombre: 'Pieza Sin Código'
            // Falta codigo_pieza que es requerido
        };
        const incompleteTest = await makeRequest('POST', '/piezas', incompleteData);
        showResult('POST /piezas - Datos incompletos', incompleteTest);

        // Test 14: Código duplicado
        const duplicateCode = {
            codigo_pieza: 'PIC-001', // Código que ya existe
            nombre: 'Pieza Duplicada'
        };
        const duplicateTest = await makeRequest('POST', '/piezas', duplicateCode);
        showResult('POST /piezas - Código duplicado', duplicateTest);

        console.log('\n✅ Todas las pruebas de la API del Museo completadas');
        console.log('🏛️ Sistema listo para gestionar las piezas del museo');

    } catch (error) {
        console.error('❌ Error durante las pruebas:', error);
    }
}

// Verificar que el servidor esté corriendo antes de ejecutar las pruebas
async function checkServer() {
    try {
        await makeRequest('GET', '/');
        console.log('✅ Servidor del museo detectado, iniciando pruebas...');
        await runTests();
    } catch (error) {
        console.log('❌ No se puede conectar al servidor del museo.');
        console.log('🔧 Pasos para solucionar:');
        console.log('   1. Asegúrate de que MySQL esté corriendo');
        console.log('   2. Ejecuta: npm run setup (para configurar la base de datos)');
        console.log('   3. Ejecuta: npm start (para iniciar el servidor)');
        console.log('📍 El servidor debe estar en http://localhost:3000');
    }
}

// Ejecutar las pruebas
if (require.main === module) {
    checkServer();
}

module.exports = { makeRequest, runTests };