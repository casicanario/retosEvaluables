const readline = require('readline/promises');
const fs = require('fs/promises');

// Función principal
async function crearUsuario() {
    // Crear interfaz de readline con promesas
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        // Solicitar datos usando readline/promises
        const name = await rl.question('Ingresa tu nombre: ');
        const surname = await rl.question('Ingresa tu apellido: ');
        const age = await rl.question('Ingresa tu edad: ');
        
        // Crear objeto con los datos
        const usuario = {
            name: name,
            surname: surname,
            age: parseInt(age)
        };
        
        // Guardar en archivo JSON
        await fs.writeFile('usuario.json', JSON.stringify(usuario, null, 2));
        console.log('Archivo guardado correctamente');
        
        // Leer y mostrar
        const data = await fs.readFile('usuario.json', 'utf8');
        const objetoLeido = JSON.parse(data);
        console.log('Objeto creado:', objetoLeido);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }
}

// Ejecutar
crearUsuario();