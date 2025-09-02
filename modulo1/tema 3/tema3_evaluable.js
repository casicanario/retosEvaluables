
// 1. Teniendo la siguiente estructura de objeto literal:
//    persona = {
//      nombre: string,
//      apellido: string,
//      anyoNacimiento: number,
//      aficiones: array of string,
//      dni: { anyoExpedicion: number, lugarNacimiento: string },
//      colorPelo: string
//    }

// 2. Crear un array de personas con 4 objetos de tipo persona.
const personas = [
  {
    nombre: "Ana",
    apellido: "García",
    anyoNacimiento: 1985,
    aficiones: ["leer", "viajar"],
    dni: {
      anyoExpedicion: 2005,
      lugarNacimiento: "Madrid",
    },
    colorPelo: "castaño",
  },
  {
    nombre: "Pedro",
    apellido: "López",
    anyoNacimiento: 1992,
    aficiones: ["cocinar", "cine"],
    dni: {
      anyoExpedicion: 2012,
      lugarNacimiento: "Barcelona",
    },
    colorPelo: "negro",
  },
  {
    nombre: "Marta",
    apellido: "Pérez",
    anyoNacimiento: 1978,
    aficiones: ["correr", "dormir"],
    dni: {
      anyoExpedicion: 2018, // DNI caducado si la fecha actual es 2025
      lugarNacimiento: "Sevilla",
    },
    colorPelo: "rubio",
  },
  {
    nombre: "Juan",
    apellido: "Sánchez",
    anyoNacimiento: 1995,
    aficiones: ["música", "deportes"],
    dni: {
      anyoExpedicion: 2015,
      lugarNacimiento: "Valencia",
    },
    colorPelo: "castaño",
  },
];

// 1. Mostrar el nombre de todas aquellas personas del array que tengan el pelo castaño.
console.log("1. Personas con pelo castaño:");
personas.forEach((persona) => {
  if (persona.colorPelo === "castaño") {
    console.log(persona.nombre);
  }
});

// 2. Mostrar la edad de todos los que sean mayores de 30.
console.log("\n2. Edad de personas mayores de 30:");
personas.forEach((persona) => {
  const edad = new Date().getFullYear() - persona.anyoNacimiento;
  if (edad > 30) {
    console.log(`${persona.nombre}: ${edad} años`);
  }
});

// 3. Mostrar el lugar de nacimiento de todos los que tengan el pelo negro y el dni caducado,
//    o sean menores de edad y su afición sea comer o dormir.
//    (DNI caducado si han pasado más de 10 años desde su expedición).
console.log("\n3. Lugar de nacimiento por condiciones especiales:");
personas.forEach((persona) => {
  const edad = new Date().getFullYear() - persona.anyoNacimiento;
  const dniCaducado = new Date().getFullYear() - persona.dni.anyoExpedicion > 10;
  const esMenorEdad = edad < 18;
  const aficionComerODormir =
    persona.aficiones.includes("comer") || persona.aficiones.includes("dormir");

  // Condición 1: pelo negro Y DNI caducado
  const condicion1 = persona.colorPelo === "negro" && dniCaducado;

  // Condición 2: menor de edad Y afición 'comer' o 'dormir'
  const condicion2 = esMenorEdad && aficionComerODormir;

  if (condicion1 || condicion2) {
    console.log(`${persona.nombre}: ${persona.dni.lugarNacimiento}`);
  }
});