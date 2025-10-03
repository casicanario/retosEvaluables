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
    console.log(`📄 Response:`, JSON.stringify(response.data, null, 2));
    console.log('─'.repeat(50));
}

async function runTests() {
    console.log('🚀 Iniciando pruebas de la API...\n');
    
    try {
        // Test 1: Verificar que el servidor esté funcionando
        console.log('🔍 Verificando conexión al servidor...');
        const healthCheck = await makeRequest('GET', '/');
        showResult('Health Check', healthCheck);

        // Test 2: Obtener todos los alumnos
        const allStudents = await makeRequest('GET', '/alumnos');
        showResult('GET /alumnos - Todos los alumnos', allStudents);

        // Test 3: Obtener alumno por ID
        const studentById = await makeRequest('GET', '/alumnos/1');
        showResult('GET /alumnos/1 - Alumno por ID', studentById);

        // Test 4: Obtener alumno por nombre
        const studentByName = await makeRequest('GET', '/alumnos/Juan Pérez');
        showResult('GET /alumnos/Juan Pérez - Alumno por nombre', studentByName);

        // Test 5: Crear nuevo alumno
        const newStudent = {
            nombre: 'Test Usuario',
            email: 'test@example.com',
            edad: 25
        };
        const createStudent = await makeRequest('POST', '/alumnos', newStudent);
        showResult('POST /alumnos - Crear alumno', createStudent);

        // Obtener el ID del nuevo alumno para pruebas posteriores
        const newStudentId = createStudent.data?.id;

        // Test 6: Actualizar alumno
        if (newStudentId) {
            const updateData = {
                nombre: 'Test Usuario Actualizado',
                email: 'test.updated@example.com',
                edad: 26
            };
            const updateStudent = await makeRequest('PUT', `/alumnos/${newStudentId}`, updateData);
            showResult('PUT /alumnos/:id - Actualizar alumno', updateStudent);
        }

        // Test 7: Obtener media de notas por ID
        const mediaById = await makeRequest('GET', '/media?id=1');
        showResult('GET /media?id=1 - Media por ID', mediaById);

        // Test 8: Obtener media de notas por nombre
        const mediaByName = await makeRequest('GET', '/media?nombre=María García');
        showResult('GET /media?nombre=María García - Media por nombre', mediaByName);

        // Test 9: Obtener asignaturas apuntadas por ID
        const subjectsById = await makeRequest('GET', '/apuntadas?id=2');
        showResult('GET /apuntadas?id=2 - Asignaturas por ID', subjectsById);

        // Test 10: Obtener asignaturas apuntadas por nombre
        const subjectsByName = await makeRequest('GET', '/apuntadas?nombre=Ana Martínez');
        showResult('GET /apuntadas?nombre=Ana Martínez - Asignaturas por nombre', subjectsByName);

        // Test 11: Eliminar alumno de prueba
        if (newStudentId) {
            const deleteStudent = await makeRequest('DELETE', `/alumnos/${newStudentId}`);
            showResult('DELETE /alumnos/:id - Eliminar alumno', deleteStudent);
        }

        // Tests de error
        console.log('\n🚨 Probando casos de error...\n');

        // Test 12: Alumno no encontrado
        const notFound = await makeRequest('GET', '/alumnos/999');
        showResult('GET /alumnos/999 - Alumno no encontrado', notFound);

        // Test 13: Email duplicado
        const duplicateEmail = {
            nombre: 'Usuario Duplicado',
            email: 'juan.perez@email.com', // Email que ya existe
            edad: 30
        };
        const duplicateTest = await makeRequest('POST', '/alumnos', duplicateEmail);
        showResult('POST /alumnos - Email duplicado', duplicateTest);

        // Test 14: Datos incompletos
        const incompleteData = {
            nombre: 'Solo Nombre'
            // Falta email
        };
        const incompleteTest = await makeRequest('POST', '/alumnos', incompleteData);
        showResult('POST /alumnos - Datos incompletos', incompleteTest);

        console.log('\n✅ Todas las pruebas completadas');

    } catch (error) {
        console.error('❌ Error durante las pruebas:', error);
    }
}

// Verificar que el servidor esté corriendo antes de ejecutar las pruebas
async function checkServer() {
    try {
        await makeRequest('GET', '/');
        console.log('✅ Servidor detectado, iniciando pruebas...');
        await runTests();
    } catch (error) {
        console.log('❌ No se puede conectar al servidor.');
        console.log('🔧 Asegúrate de que el servidor esté corriendo con: npm start');
        console.log('📍 El servidor debe estar en http://localhost:3000');
    }
}

// Ejecutar las pruebas
if (require.main === module) {
    checkServer();
}

module.exports = { makeRequest, runTests };