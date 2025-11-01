// Script de prueba para los endpoints del Módulo 5 Tema 3
const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const jsonBody = JSON.parse(body);
                    resolve({ status: res.statusCode, data: jsonBody });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
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

async function testEndpoints() {
    console.log('=== PROBANDO API DE ALUMNOS Y ASIGNATURAS ===\n');
    
    try {
        // Test 1: Endpoint raíz
        console.log('1. Probando endpoint raíz (GET /)');
        const root = await makeRequest('/');
        console.log(`Status: ${root.status}`);
        console.log('Respuesta:', JSON.stringify(root.data, null, 2));
        console.log('\n' + '-'.repeat(50) + '\n');
        
        // Test 2: Obtener todos los alumnos
        console.log('2. Probando obtener todos los alumnos (GET /alumnos)');
        const alumnos = await makeRequest('/alumnos');
        console.log(`Status: ${alumnos.status}`);
        console.log('Respuesta:', JSON.stringify(alumnos.data, null, 2));
        console.log('\n' + '-'.repeat(50) + '\n');
        
        // Test 3: Obtener alumno por ID
        console.log('3. Probando obtener alumno por ID (GET /alumnos/1)');
        const alumno = await makeRequest('/alumnos/1');
        console.log(`Status: ${alumno.status}`);
        console.log('Respuesta:', JSON.stringify(alumno.data, null, 2));
        console.log('\n' + '-'.repeat(50) + '\n');
        
        // Test 4: Media de notas
        console.log('4. Probando media de notas (GET /media/1)');
        const media = await makeRequest('/media/1');
        console.log(`Status: ${media.status}`);
        console.log('Respuesta:', JSON.stringify(media.data, null, 2));
        console.log('\n' + '-'.repeat(50) + '\n');
        
        // Test 5: Asignaturas del alumno
        console.log('5. Probando asignaturas del alumno (GET /asignaturas/1)');
        const asignaturas = await makeRequest('/asignaturas/1');
        console.log(`Status: ${asignaturas.status}`);
        console.log('Respuesta:', JSON.stringify(asignaturas.data, null, 2));
        
    } catch (error) {
        console.error('Error al probar endpoints:', error.message);
        console.log('\n¿Está el servidor corriendo en puerto 3000?');
    }
}

testEndpoints();