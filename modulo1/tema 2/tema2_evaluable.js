// Objeto principal con los datos
const persona = {
    nombre: "Juan",
    apellidos: ["Pérez", "López"],
    edad: 30,
    padres: [
        {
            nombre: "Ana",
            apellidos: ["García", "Martínez"],
            edad: 60,
            padres: [
                {
                    nombre: "Carmen",
                    apellidos: ["Ruiz", "Hernández"],
                    edad: 85
                },
                {
                    nombre: "Miguel",
                    apellidos: ["Fernández", "Castillo"],
                    edad: 90
                }
            ]
        },
        {
            nombre: "Luis",
            apellidos: ["Rodríguez", "Muñoz"],
            edad: 65,
            padres: [
                {
                    nombre: "Rosa",
                    apellidos: ["Sánchez", "Moreno"],
                    edad: 88
                },
                {
                    nombre: "Javier",
                    apellidos: ["Gómez", "Peña"],
                    edad: 92
                }
            ]
        }
    ]
};

// Parte 1: Mostrar por consola el nombre del abuelo por parte de madre
console.log("Nombre del abuelo por parte de madre:", persona.padres[0].padres[1].nombre);

// Parte 2: Mostrar el segundo apellido del abuelo por parte de padre
console.log("Segundo apellido del abuelo por parte de padre:", persona.padres[1].padres[1].apellidos[1]);

// Parte 3: Sumar la edad de la madre y la edad del abuelo por parte de padre
const sumaEdades = persona.padres[0].edad + persona.padres[1].padres[1].edad;
console.log("Suma de edades de la madre y el abuelo por parte de padre:", sumaEdades);

// Parte 4: Intercambiar los valores de los abuelos por parte de padre
let temp = persona.padres[1].padres[0];
persona.padres[1].padres[0] = persona.padres[1].padres[1];
persona.padres[1].padres[1] = temp;

console.log("Abuelos por parte de padre después de intercambiar:");
console.log(persona.padres[1].padres);

// Parte 5: Añadirle a la abuela por parte de madre el segundo apellido del abuelo por parte de padre
persona.padres[0].padres[0].apellidos.push(persona.padres[1].padres[1].apellidos[1]);

console.log("Abuela por parte de madre después de añadir segundo apellido:");
console.log(persona.padres[0].padres[0]);

// Parte 6: Eliminar el primer apellido de la madre
persona.padres[0].apellidos.shift();

console.log("Apellidos de la madre después de eliminar el primero:");
console.log(persona.padres[0].apellidos);

// Parte 7: Mostrar la última letra del segundo apellido del abuelo por parte de padre
const segundoApellidoAbueloPadre = persona.padres[1].padres[1].apellidos[1];
const ultimaLetra = segundoApellidoAbueloPadre.charAt(segundoApellidoAbueloPadre.length - 1);

console.log("Última letra del segundo apellido del abuelo por parte de padre:", ultimaLetra);
