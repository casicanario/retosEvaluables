export class Professional {
    public name: string;
    public age: number;
    public weight: number;
    public height: number;
    public isRetired: boolean;
    public nationality: string;
    public oscarsNumber: number;
    public profession: string;

    constructor(
        name: string,
        age: number,
        weight: number,
        height: number,
        isRetired: boolean,
        nationality: string,
        oscarsNumber: number,
        profession: string
    ) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.isRetired = isRetired;
        this.nationality = nationality;
        this.oscarsNumber = oscarsNumber;
        this.profession = profession;
    }

    public showProfessionalData(): void {
        console.log("--- Datos del Profesional ---");
        console.log(`Nombre: ${this.name}`);
        console.log(`Edad: ${this.age}`);
        console.log(`Peso: ${this.weight}`);
        console.log(`Altura: ${this.height}`);
        console.log(`Retirado: ${this.isRetired}`);
        console.log(`Nacionalidad: ${this.nationality}`);
        console.log(`Número de Oscars: ${this.oscarsNumber}`);
        console.log(`Profesión: ${this.profession}`);
    }
}