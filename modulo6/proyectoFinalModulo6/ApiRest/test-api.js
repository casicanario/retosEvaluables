const axios = require('axios').default;

// URL base de la API
const API_BASE_URL = 'http://localhost:3000';

// Cliente HTTP configurado
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

async function ejecutarPruebas() {
  console.log('=== INICIANDO PRUEBAS DE LA API REST ===\n');
  
  try {
    // Test 1: Verificar que el servidor esté funcionando
    console.log('Test 1: Verificar estado de la API');
    try {
      const healthResponse = await apiClient.get('/health');
      console.log('API funcionando correctamente');
      console.log(`Estado de la base de datos: ${healthResponse.data.database.isConnected ? 'Conectada' : 'Desconectada'}`);
    } catch (error) {
      console.log('API no disponible. Asegúrate de que el servidor esté ejecutándose.');
      console.log('Ejecuta: npm start en la carpeta ApiRest');
      return;
    }

    // Test 2: Obtener todos los profesionales
    console.log('\nTest 2: GET /profesionales - Obtener todos los profesionales');
    try {
      const response = await apiClient.get('/profesionales');
      console.log(`Respuesta exitosa: ${response.data.count} profesionales encontrados`);
      if (response.data.data.length > 0) {
        console.log(`   Ejemplo: ${response.data.data[0].name} - ${response.data.data[0].profession}`);
      }
    } catch (error) {
      console.log(`Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 3: Buscar profesional específico por parámetros de consulta
    console.log('\nTest 3: GET /profesionales?firstName=Chris&lastName=Hemsworth');
    try {
      const response = await apiClient.get('/profesionales?firstName=Chris&lastName=Hemsworth');
      console.log(`Búsqueda por query params exitosa`);
      if (response.data.data.length > 0) {
        console.log(`   Encontrado: ${response.data.data[0].name} - ${response.data.data[0].nationality}`);
      }
    } catch (error) {
      console.log(`Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 4: Buscar profesional por ruta
    console.log('\nTest 4: GET /profesionales/Chris/Hemsworth');
    try {
      const response = await apiClient.get('/profesionales/Chris/Hemsworth');
      console.log(`Búsqueda por ruta exitosa`);
      console.log(`   Encontrado: ${response.data.data.name} - Oscars: ${response.data.data.oscarNumber}`);
    } catch (error) {
      console.log(`Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 5: Crear nuevo profesional
    console.log('\nTest 5: POST /profesionales - Crear nuevo profesional');
    const nuevoProfesional = {
      name: "Test Professional",
      age: 30,
      weight: 70,
      height: 175,
      isRetired: false,
      nationality: "Spanish",
      oscarNumber: 0,
      profession: "Director"
    };

    try {
      const response = await apiClient.post('/profesionales', nuevoProfesional);
      console.log(`Profesional creado: ${response.data.data.name}`);
    } catch (error) {
      console.log(`Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 6: Actualizar profesional
    console.log('\nTest 6: PUT /profesionales - Actualizar profesional');
    const datosActualizacion = {
      name: "Test Professional",
      age: 31,
      oscarNumber: 1
    };

    try {
      const response = await apiClient.put('/profesionales', datosActualizacion);
      console.log(`Profesional actualizado: ${response.data.data.name}`);
      console.log(`   Nueva edad: ${response.data.data.age}, Oscars: ${response.data.data.oscarNumber}`);
    } catch (error) {
      console.log(`Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 7: Intentar crear profesional duplicado
    console.log('\nTest 7: POST /profesionales - Intentar crear profesional duplicado');
    try {
      await apiClient.post('/profesionales', nuevoProfesional);
      console.log('Se permitió crear un duplicado (esto no debería pasar)');
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('Correctamente rechazado profesional duplicado');
      } else {
        console.log(`Error inesperado: ${error.response?.data?.message || error.message}`);
      }
    }

    // Test 8: Buscar profesional que no existe
    console.log('\nTest 8: GET /profesionales/No/Existe');
    try {
      await apiClient.get('/profesionales/No/Existe');
      console.log('Se encontró un profesional que no debería existir');
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('Correctamente retornó 404 para profesional inexistente');
      } else {
        console.log(`Error inesperado: ${error.response?.data?.message || error.message}`);
      }
    }

    // Test 9: Eliminar profesional
    console.log('\nTest 9: DELETE /profesionales - Eliminar profesional de prueba');
    try {
      const response = await apiClient.delete('/profesionales', {
        data: { name: "Test Professional" }
      });
      console.log(`Profesional eliminado: ${response.data.data.name}`);
    } catch (error) {
      console.log(`Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 10: Intentar crear profesional con datos inválidos
    console.log('\nTest 10: POST /profesionales - Datos inválidos');
    const profesionalInvalido = {
      name: "Test Invalid",
      age: 200, // Edad inválida
      weight: 10, // Peso inválido
      height: 50  // Altura inválida
      // Faltan campos requeridos
    };

    try {
      await apiClient.post('/profesionales', profesionalInvalido);
      console.log('Se permitió crear profesional con datos inválidos');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('Correctamente rechazado profesional con datos inválidos');
      } else {
        console.log(`Error inesperado: ${error.response?.data?.message || error.message}`);
      }
    }

    console.log('\n=== PRUEBAS DE API COMPLETADAS ===');
    console.log('\nResumen de endpoints probados:');
    console.log('   GET /health');
    console.log('   GET /profesionales');
    console.log('   GET /profesionales?firstName=X&lastName=Y');
    console.log('   GET /profesionales/:firstName/:lastName');
    console.log('   POST /profesionales');
    console.log('   PUT /profesionales');
    console.log('   DELETE /profesionales');

  } catch (error) {
    console.error('Error durante las pruebas:', error.message);
  }
}

// Función auxiliar para verificar si el servidor está ejecutándose
async function verificarServidor() {
  try {
    await apiClient.get('/health');
    return true;
  } catch (error) {
    return false;
  }
}

// Ejecutar pruebas si se llama directamente
if (require.main === module) {
  console.log('Verificando disponibilidad del servidor...');
  verificarServidor().then(disponible => {
    if (!disponible) {
      console.log('Servidor no disponible.');
      console.log('Para ejecutar las pruebas:');
      console.log('   1. Abre una terminal en la carpeta ApiRest');
      console.log('   2. Ejecuta: npm install');
      console.log('   3. Ejecuta: npm start');
      console.log('   4. En otra terminal, ejecuta: node test-api.js');
      return;
    }
    ejecutarPruebas();
  });
}

module.exports = { ejecutarPruebas, verificarServidor };