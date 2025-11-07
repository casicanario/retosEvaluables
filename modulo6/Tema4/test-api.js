const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

class APITester {
    constructor() {
        this.testResults = [];
    }

    async testEndpoint(method, url, data = null, description) {
        try {
            console.log(`\nPrueba: ${description}`);
            console.log(`${method.toUpperCase()} ${url}`);
            
            let response;
            const config = {
                method: method.toLowerCase(),
                url: `${BASE_URL}${url}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            if (data) {
                config.data = data;
                console.log('Datos enviados:', JSON.stringify(data, null, 2));
            }
            
            response = await axios(config);
            
            console.log(`Status: ${response.status}`);
            console.log('Respuesta:', JSON.stringify(response.data, null, 2));
            
            this.testResults.push({
                description,
                method: method.toUpperCase(),
                url,
                status: response.status,
                success: true,
                data: response.data
            });
            
            return response.data;
            
        } catch (error) {
            console.log(`Error: ${error.response?.status || 'Network Error'}`);
            console.log('Mensaje:', error.response?.data?.error || error.message);
            
            this.testResults.push({
                description,
                method: method.toUpperCase(),
                url,
                status: error.response?.status || 0,
                success: false,
                error: error.response?.data?.error || error.message
            });
            
            return null;
        }
    }

    async runAllTests() {
        console.log('='.repeat(60));
        console.log('INICIANDO PRUEBAS DE LA API REST - FOTOS');
        console.log('='.repeat(60));

        // Datos de prueba
        const testUser = {
            name: 'Juan',
            lastname: 'Pérez',
            email: 'juan.perez@email.com',
            age: 25
        };

        const testPhoto1 = {
            usuario: 'Juan Pérez',
            url: 'https://ejemplo.com/foto1.jpg',
            titulo: 'Atardecer en la playa',
            descripcion: 'Una hermosa puesta de sol en la costa'
        };

        const testPhoto2 = {
            usuario: 'Juan Pérez',
            url: 'https://ejemplo.com/foto2.jpg',
            titulo: 'Montañas nevadas',
            descripcion: 'Vista panorámica de los Alpes'
        };

        const testPhoto3 = {
            usuario: 'María González',
            url: 'https://ejemplo.com/foto3.jpg',
            titulo: 'Ciudad nocturna',
            descripcion: 'Luces de la ciudad por la noche'
        };

        // 1. Crear usuario
        await this.testEndpoint('POST', '/users', testUser, 'Crear usuario de prueba');

        // 2. Obtener todos los usuarios
        await this.testEndpoint('GET', '/users', null, 'Obtener todos los usuarios');

        // 3. Crear fotos
        await this.testEndpoint('POST', '/photos', testPhoto1, 'Crear foto 1 - Atardecer');
        await this.testEndpoint('POST', '/photos', testPhoto2, 'Crear foto 2 - Montañas');
        await this.testEndpoint('POST', '/photos', testPhoto3, 'Crear foto 3 - Ciudad');

        // 4. Obtener todas las fotos
        await this.testEndpoint('GET', '/photos', null, 'Obtener todas las fotos');

        // 5. Obtener fotos de un usuario específico
        await this.testEndpoint('GET', '/photos?usuario=Juan Pérez', null, 'Obtener fotos de Juan Pérez');

        // 6. Modificar descripción de una foto
        const updateData = {
            titulo: 'Atardecer en la playa',
            nuevaDescripcion: 'Una espectacular puesta de sol en la costa mediterránea con colores vibrantes'
        };
        await this.testEndpoint('PUT', '/photos', updateData, 'Modificar descripción de foto');

        // 7. Obtener fotos después de la modificación
        await this.testEndpoint('GET', '/photos?usuario=Juan Pérez', null, 'Verificar modificación - Fotos de Juan Pérez');

        // 8. Eliminar una foto específica
        const deleteData = {
            usuario: 'Juan Pérez',
            titulo: 'Montañas nevadas'
        };
        await this.testEndpoint('DELETE', '/photos', deleteData, 'Eliminar foto específica - Montañas');

        // 9. Verificar eliminación
        await this.testEndpoint('GET', '/photos?usuario=Juan Pérez', null, 'Verificar eliminación - Fotos restantes de Juan');

        // 10. Eliminar todas las fotos de un usuario
        const deleteAllData = {
            usuario: 'Juan Pérez'
        };
        await this.testEndpoint('DELETE', '/photos/all', deleteAllData, 'Eliminar todas las fotos de Juan Pérez');

        // 11. Verificar eliminación completa
        await this.testEndpoint('GET', '/photos?usuario=Juan Pérez', null, 'Verificar eliminación completa - Juan Pérez');

        // 12. Verificar que quedan fotos de otros usuarios
        await this.testEndpoint('GET', '/photos', null, 'Verificar fotos restantes en el sistema');

        // Mostrar resumen
        this.showSummary();
    }

    showSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('RESUMEN DE PRUEBAS');
        console.log('='.repeat(60));

        const successful = this.testResults.filter(test => test.success).length;
        const failed = this.testResults.filter(test => !test.success).length;

        console.log(`Total de pruebas: ${this.testResults.length}`);
        console.log(`Exitosas: ${successful}`);
        console.log(`Fallidas: ${failed}`);

        if (failed > 0) {
            console.log('\nPruebas fallidas:');
            this.testResults
                .filter(test => !test.success)
                .forEach(test => {
                    console.log(`- ${test.description}: ${test.error}`);
                });
        }

        console.log('\nTodas las funcionalidades CRUD han sido probadas:');
        console.log('✓ CREATE: Crear fotos (POST /photos)');
        console.log('✓ READ: Obtener fotos (GET /photos)');
        console.log('✓ UPDATE: Modificar fotos (PUT /photos)');
        console.log('✓ DELETE: Eliminar fotos (DELETE /photos)');
        console.log('✓ DELETE ALL: Eliminar todas las fotos de un usuario (DELETE /photos/all)');
    }
}

async function main() {
    const tester = new APITester();
    
    console.log('Esperando a que el servidor esté listo...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
        await tester.runAllTests();
    } catch (error) {
        console.error('Error durante las pruebas:', error.message);
        console.log('Asegúrate de que el servidor esté ejecutándose en http://localhost:3000');
    }
}

if (require.main === module) {
    main();
}

module.exports = { APITester };