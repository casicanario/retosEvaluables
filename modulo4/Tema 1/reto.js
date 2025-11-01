const fs = require('fs');
const readline = require('readline');
const path = './usuario.json';

// 1. Borrar el archivo anterior si existe
if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

// 2. Crear interfaz readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 3. Preguntar datos al usuario
rl.question('Nombre: ', (name) => {
  rl.question('Apellido: ', (surname) => {
    rl.question('Edad: ', (age) => {
      const usuario = { name, surname, age };

      // 4. Guardar el objeto en un archivo JSON
      fs.writeFile(path, JSON.stringify(usuario, null, 2), (err) => {
        if (err) {
          console.error('Error al guardar el archivo:', err);
        } else {
          // 5. Leer el archivo y mostrarlo en consola
          fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
              console.error('Error al leer el archivo:', err);
            } else {
              console.log('Contenido del archivo JSON:');
              console.log(JSON.parse(data));
            }
            rl.close(); // cerrar readline
          });
        }
      });
    });
  });
});
