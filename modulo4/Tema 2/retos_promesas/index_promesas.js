const { writeAndRead } = require('./writeAndReadObject_promesas');
const { readConsole } = require('./readConsole_promesas');

async function ejecutarRetos() {
    try {
        // Ejemplo 1: Objeto directo
        console.log('=== Ejemplo 1: Objeto directo ===');
        await writeAndRead('./miFichero.json', { 
            calle: "Teruel", 
            numero: 8 
        });

        console.log('\n=== Ejemplo 2: Datos del usuario ===');
        // Ejemplo 2: Datos del usuario
        const usuarioData = await readConsole();
        await writeAndRead('./usuario.json', usuarioData);
        
        console.log('\n¡Todos los retos completados!');
        
    } catch (error) {
        console.error('Error en la ejecución:', error);
    }
}

// Ejecutar
ejecutarRetos();