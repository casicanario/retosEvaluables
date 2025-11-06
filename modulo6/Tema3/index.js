const { ejecutarReto1 } = require('./reto1');
const { ejecutarReto2 } = require('./reto2');

async function main() {
    console.log('SISTEMA DE AGREGACIONES MONGODB');
    console.log('Módulo 6 - Tema 3: Agregaciones');
    console.log('================================');
    
    try {
        console.log('\nEjecutando ambos retos...\n');
        
        // Ejecutar Reto 1
        await ejecutarReto1();
        
        console.log('\n\n');
        
        // Ejecutar Reto 2
        await ejecutarReto2();
        
        console.log('\n\nAMBOS RETOS COMPLETADOS EXITOSAMENTE');
        
    } catch (error) {
        console.error('Error ejecutando los retos:', error);
    }
}

// Ejecutar si este archivo es el punto de entrada
if (require.main === module) {
    main();
}

module.exports = { main };