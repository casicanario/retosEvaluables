const ProfesionalService = require('./profesionalService');

async function main() {
  const service = new ProfesionalService();
  
  try {
    // Conectar a la base de datos
    console.log('Conectando a MongoDB...');
    const connected = await service.init();
    
    if (!connected) {
      console.log('No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('\n=== GESTIÓN DE PROFESIONALES ===\n');
    
    // Mostrar estado de la conexión
    const status = service.db.getConnectionStatus();
    console.log('Estado de la conexión:', status);
    
    // Contar profesionales existentes
    const total = await service.contarProfesionales();
    
    if (total === 0) {
      console.log('\nNo hay profesionales en la base de datos.');
      console.log('Ejecuta "node crearDatos.js" primero para poblar la base de datos.');
    } else {
      // Mostrar todos los profesionales
      console.log('\n=== TODOS LOS PROFESIONALES ===');
      const profesionales = await service.obtenerTodosProfesionales();
      profesionales.forEach((prof, index) => {
        console.log(`\n${index + 1}. ${prof.name}`);
        console.log(`   Edad: ${prof.age} años`);
        console.log(`   Peso: ${prof.weight} kg`);
        console.log(`   Altura: ${prof.height} cm`);
        console.log(`   Oscars: ${prof.oscarNumber}`);
        console.log(`   Nacionalidad: ${prof.nationality}`);
        console.log(`   Profesión: ${prof.profession}`);
        console.log(`   Retirado: ${prof.isRetired ? 'Sí' : 'No'}`);
      });
      
      // Ejemplo de búsqueda específica
      console.log('\n=== BÚSQUEDA ESPECÍFICA ===');
      const chrisHemsworth = await service.buscarPorNombre('Chris Hemsworth');
      if (chrisHemsworth) {
        console.log(`Encontrado: ${chrisHemsworth.name} - ${chrisHemsworth.profession}`);
      }
      
      // Ejemplo de búsqueda con filtros
      console.log('\n=== BÚSQUEDA CON FILTROS ===');
      const actoresAmericanos = await service.buscarPorFiltros({
        nationality: 'American',
        profession: { $in: ['Actor', 'Actress'] }
      });
      console.log('Actores americanos encontrados:');
      actoresAmericanos.forEach(actor => {
        console.log(`- ${actor.name} (${actor.oscarNumber} Oscars)`);
      });
    }
    
  } catch (error) {
    console.error('Error en la aplicación:', error.message);
  } finally {
    // Cerrar conexión
    console.log('\nCerrando conexión...');
    await service.close();
  }
}

// Ejecutar la aplicación principal
if (require.main === module) {
  main();
}

module.exports = main;