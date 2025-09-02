// Importar la clase desde person.js
const Person = require("./person.js");

// Crear un objeto de la clase Person
let person1 = new Person("Fran", 75, 1.78, 1985, ["Fútbol", "Gimnasio", "Viajar"]);

// Probar los métodos
console.log("=== Datos de la persona ===");
person1.printAll();

console.log("\n=== Hobbies ===");
person1.printHobbies();
