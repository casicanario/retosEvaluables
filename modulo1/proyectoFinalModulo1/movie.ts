import { Professional } from './professional';

export class Movie {
    public title: string;
    public releaseYear: number;
    public actors: Professional[];
    public nationality: string;
    public director: Professional;
    public writer: Professional;
    public language: string;
    public plataforma: string;
    public isMCU: boolean;
    public mainCharacterName: string;
    public producer: string;
    public distributor: string;
    public genre: string;

    constructor(
        title: string,
        releaseYear: number,
        nationality: string,
        genre: string
    ) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.actors = [];
        this.nationality = nationality;
        this.director = new Professional("", 0, 0, 0, false, "", 0, "");
        this.writer = new Professional("", 0, 0, 0, false, "", 0, "");
        this.language = "";
        this.plataforma = "";
        this.isMCU = false;
        this.mainCharacterName = "";
        this.producer = "";
        this.distributor = "";
        this.genre = genre;
    }

    public showMovieData(): void {
        console.log("--- Datos de la Película ---");
        console.log(`Título: ${this.title}`);
        console.log(`Año de Estreno: ${this.releaseYear}`);
        console.log(`Nacionalidad: ${this.nationality}`);
        console.log(`Género: ${this.genre}`);
        console.log(`Actores: `);
        this.actors.forEach(actor => actor.showProfessionalData());
        console.log(`Director: ${this.director.name}`);
        console.log(`Guionista: ${this.writer.name}`);
        console.log(`Idioma: ${this.language}`);
        console.log(`Plataforma: ${this.plataforma}`);
        console.log(`Es del MCU: ${this.isMCU}`);
        console.log(`Personaje Principal: ${this.mainCharacterName}`);
        console.log(`Productor: ${this.producer}`);
        console.log(`Distribuidor: ${this.distributor}`);
    }
}
