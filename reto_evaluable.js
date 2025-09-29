const fs = require('fs');
   const readline = require('readline');

   // Función para leer desde consola
   function leerDatosConsola(callback) {
       const rl = readline.createInterface({
           input: process.stdin,
           output: process.stdout
       });

       rl.question('Ingresa tu nombre: ', (name) => {
           rl.question('Ingresa tu apellido: ', (surname) => {
               rl.question('Ingresa tu edad: ', (age) => {
                   
                   const persona = {
                       name: name,
                       surname: surname,
                       age: parseInt(age)
                   };

                   rl.close();
                   callback(persona);
               });
           });
       });
   }

   // Función principal
   function ejecutarReto() {
       // Primero crear el objeto manualmente
       const objetoInicial = {
           name: "Juan",
           surname: "Pérez",
           age: 25
       };

       // Guardar en archivo JSON
       fs.writeFileSync('persona.json', JSON.stringify(objetoInicial, null, 2));
       
       // Leer y mostrar
       const objetoLeido = JSON.parse(fs.readFileSync('persona.json', 'utf8'));
       console.log('Objeto inicial guardado:', objetoLeido);

       // Ahora borrar el archivo antes de crear uno nuevo con readline
       fs.unlinkSync('persona.json');
       console.log('\nArchivo borrado. Ahora ingresa los datos manualmente:\n');

       // Solicitar datos por consola
       leerDatosConsola((personaConsola) => {
           // Guardar el nuevo objeto
           fs.writeFileSync('persona.json', JSON.stringify(personaConsola, null, 2));
           
           // Leer y mostrar usando readline
           const objetoFinal = JSON.parse(fs.readFileSync('persona.json', 'utf8'));
           console.log('\nObjeto final guardado:', objetoFinal);
       });
   }

   // Ejecutar el reto
   ejecutarReto();