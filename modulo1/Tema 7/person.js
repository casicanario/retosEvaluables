// Definición de la clase Person
class Person {
    constructor(name, weight, height, yearOfBirth, hobbies = []) {
        this.name = name;
        this.weight = weight;   // en kg
        this.height = height;   // en metros
        this.yearOfBirth = yearOfBirth;
        this.hobbies = hobbies;
    }

    // Método para calcular el IMC
    calculateIMC() {
        let imc = this.weight / (this.height * this.height);
        return imc.toFixed(2); // dos decimales
    }

    // Método para calcular la edad
    calculateAge() {
        let currentYear = new Date().getFullYear();
        return currentYear - this.yearOfBirth;
    }

    // Método para imprimir atributos
    printAll() {
        console.log(`Nombre: ${this.name}`);
        console.log(`Peso: ${this.weight} kg`);
        console.log(`Altura: ${this.height} m`);
        console.log(`Año de nacimiento: ${this.yearOfBirth}`);
        console.log(`Edad: ${this.calculateAge()} años`);
        console.log(`IMC: ${this.calculateIMC()}`);
    }

    // Método para imprimir hobbies
    printHobbies() {
        console.log(`Hobbies de ${this.name}:`);
        this.hobbies.forEach((hobby, index) => {
            console.log(`${index + 1}. ${hobby}`);
        });
    }
}

// Exportar la clase para poder importarla en otros archivos
module.exports = Person;
// Fin de la definición de la clase Person

