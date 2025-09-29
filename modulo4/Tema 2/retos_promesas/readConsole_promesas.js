const readline = require('readline/promises');

async function readConsole() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        const name = await rl.question('Ingresa tu nombre: ');
        const surname = await rl.question('Ingresa tu apellido: ');
        const age = await rl.question('Ingresa tu edad: ');

        const usuario = {
            name: name,
            surname: surname,
            age: parseInt(age)
        };

        return usuario;
        
    } catch (error) {
        console.error('Error en readConsole:', error);
        throw error;
    } finally {
        rl.close();
    }
}

module.exports = { readConsole };