const fs = require('fs/promises');

// Crear objeto con propiedades
const persona = {
    name: "Juan",
    surname: "Pérez",
    age: 25
};

// Función para guardar y leer con promesas
async function guardarYLeerObjeto() {
    try {
        // Guardar en archivo JSON
        await fs.writeFile('persona.json', JSON.stringify(persona, null, 2));
        console.log('Archivo guardado correctamente');
        
        // Leer el archivo
        const data = await fs.readFile('persona.json', 'utf8');
        const objetoLeido = JSON.parse(data);
        console.log('Objeto leído:', objetoLeido);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejecutar
guardarYLeerObjeto();