const fs = require('fs/promises');

async function writeAndRead(path, obj) {
    try {
        // Escribir el objeto en el archivo JSON
        await fs.writeFile(path, JSON.stringify(obj, null, 2));
        console.log('Archivo guardado correctamente');
        
        // Leer el archivo
        const data = await fs.readFile(path, 'utf8');
        const objetoLeido = JSON.parse(data);
        console.log('Objeto guardado y leído:', objetoLeido);
        
        return objetoLeido;
    } catch (error) {
        console.error('Error en writeAndRead:', error);
        throw error;
    }
}

module.exports = { writeAndRead };