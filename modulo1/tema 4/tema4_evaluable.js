// Estructura de objeto literal persona
// Según el enunciado
// nombre: string
// apellido: string
// anioNacimiento: number
// aficiones: array de string
// dni: { anioExpedicion: number, lugarNacimiento: string }
// colorPelo: string

// 1. Crear un array llamado personas con 4 objetos tipo persona
let personas = [
    {
        nombre: "Juan",
        apellido: "Pérez",
        anioNacimiento: 1985,
        aficiones: ["leer", "fútbol", "cine"],
        dni: { anioExpedicion: 2005, lugarNacimiento: "Madrid" },
        colorPelo: "castaño"
    },
    {
        nombre: "Laura",
        apellido: "Martínez",
        anioNacimiento: 1995,
        aficiones: ["bailar", "viajar"],
        dni: { anioExpedicion: 2014, lugarNacimiento: "Barcelona" },
        colorPelo: "rubio"
    },
    {
        nombre: "Carlos",
        apellido: "López",
        anioNacimiento: 1975,
        aficiones: ["pintar", "ajedrez"],
        dni: { anioExpedicion: 1993, lugarNacimiento: "Sevilla" },
        colorPelo: "negro"
    },
    {
        nombre: "Ana",
        apellido: "Gómez",
        anioNacimiento: 2002,
        aficiones: ["natación", "senderismo"],
        dni: { anioExpedicion: 2020, lugarNacimiento: "Valencia" },
        colorPelo: "pelirrojo"
    }
];

// 2. Mostrar todas las propiedades y valores de un objeto persona usando for...in
console.log("Propiedades y valores de la primera persona:");
for (let propiedad in personas[0]) {
    console.log(`${propiedad}:`, personas[0][propiedad]);
}

// 3. Mostrar todos los elementos del array personas con un bucle for
console.log("\n--- Lista de personas con bucle for ---");
for (let i = 0; i < personas.length; i++) {
    console.log(personas[i]);
}

// Con un bucle while
console.log("\n--- Lista de personas con bucle while ---");
let i = 0;
while (i < personas.length) {
    console.log(personas[i]);
    i++;
}

// Con un bucle for...of
console.log("\n--- Lista de personas con bucle for...of ---");
for (let persona of personas) {
    console.log(persona);
}

// 4. Mostrar solo las personas cuyo año de nacimiento esté entre 1978 y 2000
console.log("\n--- Personas nacidas entre 1978 y 2000 (bucle for) ---");
for (let persona of personas) {
    if (persona.anioNacimiento >= 1978 && persona.anioNacimiento <= 2000) {
        console.log(persona);
    }
}

// 5. Mensaje según condición
console.log("\n--- Mensajes según la edad ---");
for (let persona of personas) {
    if (persona.anioNacimiento >= 1978 && persona.anioNacimiento <= 2000) {
        console.log(`${persona.nombre}: Tu edad está entre 40 y 20 años`);
    } else {
        console.log(`${persona.nombre}: Tu edad no está entre 40 y 20`);
    }
}

// 6. Agregar afición "jugar a la playa" a todos los elementos usando for...of
for (let persona of personas) {
    persona.aficiones.push("jugar a la playa");
}

// Mostrar resultado final
console.log("\n--- Personas después de agregar afición ---");
console.log(personas);
