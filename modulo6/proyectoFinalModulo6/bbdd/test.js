const ProfesionalService = require('./profesionalService');

async function ejecutarPruebas() {
  const service = new ProfesionalService();
  
  console.log('=== INICIANDO PRUEBAS DE LA BBDD ===\n');
  
  try {
    // Test 1: Conexión
    console.log('Test 1: Conexión a la base de datos');
    const connected = await service.init();
    console.log(connected ? 'Conexión exitosa' : 'Error de conexión');
    
    if (!connected) return;
    
    // Test 2: Limpiar base de datos
    console.log('\nTest 2: Limpieza de la base de datos');
    await service.db.clearDatabase();
    console.log('Base de datos limpiada');
    
    // Test 3: Crear profesional
    console.log('\nTest 3: Crear nuevo profesional');
    const nuevoProfesional = {
      name: "Test Actor",
      age: 35,
      weight: 70,
      height: 175,
      isRetired: false,
      nationality: "Spanish",
      oscarNumber: 1,
      profession: "Actor"
    };
    
    const creado = await service.crearProfesional(nuevoProfesional);
    console.log(creado ? 'Profesional creado correctamente' : 'Error creando profesional');
    
    // Test 4: Buscar profesional
    console.log('\nTest 4: Buscar profesional por nombre');
    const encontrado = await service.buscarPorNombre('Test Actor');
    console.log(encontrado ? 'Profesional encontrado' : 'Profesional no encontrado');
    
    // Test 5: Actualizar profesional
    console.log('\nTest 5: Actualizar profesional');
    const actualizado = await service.actualizarProfesional('Test Actor', { age: 36, oscarNumber: 2 });
    console.log(actualizado && actualizado.age === 36 ? 'Profesional actualizado' : 'Error actualizando');
    
    // Test 6: Contar profesionales
    console.log('\nTest 6: Contar profesionales');
    const total = await service.contarProfesionales();
    console.log(total === 1 ? 'Conteo correcto' : 'Error en el conteo');
    
    // Test 7: Búsqueda con filtros
    console.log('\nTest 7: Búsqueda con filtros');
    const filtrados = await service.buscarPorFiltros({ nationality: 'Spanish' });
    console.log(filtrados.length === 1 ? 'Filtros funcionando' : 'Error en filtros');
    
    // Test 8: Eliminar profesional
    console.log('\nTest 8: Eliminar profesional');
    const eliminado = await service.eliminarProfesional('Test Actor');
    console.log(eliminado ? 'Profesional eliminado' : 'Error eliminando');
    
    // Test 9: Verificar eliminación
    console.log('\nTest 9: Verificar eliminación');
    const totalFinal = await service.contarProfesionales();
    console.log(totalFinal === 0 ? 'Eliminación verificada' : 'Error en eliminación');
    
    console.log('\n=== TODAS LAS PRUEBAS COMPLETADAS ===');
    
  } catch (error) {
    console.error('Error durante las pruebas:', error.message);
  } finally {
    await service.close();
  }
}

// Ejecutar pruebas si se llama directamente
if (require.main === module) {
  ejecutarPruebas();
}

module.exports = ejecutarPruebas;