const ProfesionalService = require('./profesionalService');

// Datos de ejemplo para poblar la base de datos
const profesionalesEjemplo = [
  {
    name: "Chris Hemsworth",
    age: 40,
    weight: 91,
    height: 190,
    isRetired: false,
    nationality: "Australian",
    oscarNumber: 0,
    profession: "Actor"
  },
  {
    name: "Scarlett Johansson",
    age: 39,
    weight: 57,
    height: 160,
    isRetired: false,
    nationality: "American",
    oscarNumber: 0,
    profession: "Actress"
  },
  {
    name: "Leonardo DiCaprio",
    age: 49,
    weight: 75,
    height: 183,
    isRetired: false,
    nationality: "American",
    oscarNumber: 1,
    profession: "Actor"
  },
  {
    name: "Meryl Streep",
    age: 74,
    weight: 60,
    height: 168,
    isRetired: false,
    nationality: "American",
    oscarNumber: 3,
    profession: "Actress"
  },
  {
    name: "Robert De Niro",
    age: 80,
    weight: 77,
    height: 177,
    isRetired: false,
    nationality: "American",
    oscarNumber: 2,
    profession: "Actor"
  }
];

async function crearDatos() {
  const service = new ProfesionalService();
  
  try {
    // Conectar a la base de datos
    console.log('Conectando a la base de datos...');
    await service.init();
    
    // Limpiar datos existentes (opcional)
    console.log('Limpiando datos existentes...');
    await service.db.clearDatabase();
    
    // Crear profesionales de ejemplo
    console.log('Creando profesionales de ejemplo...');
    for (const profesionalData of profesionalesEjemplo) {
      await service.crearProfesional(profesionalData);
    }
    
    // Mostrar todos los profesionales creados
    console.log('\nListado de todos los profesionales:');
    const todos = await service.obtenerTodosProfesionales();
    todos.forEach((prof, index) => {
      console.log(`${index + 1}. ${prof.name} - ${prof.profession} (${prof.nationality})`);
    });
    
    // Mostrar estadísticas
    const total = await service.contarProfesionales();
    console.log(`\nTotal de profesionales en la base de datos: ${total}`);
    
    console.log('\nDatos creados exitosamente!');
    
  } catch (error) {
    console.error('Error creando datos:', error.message);
  } finally {
    // Cerrar conexión
    await service.close();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  crearDatos();
}

module.exports = { crearDatos, profesionalesEjemplo };