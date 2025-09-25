import { Professional } from './professional';
import { Imdb } from './imdb';

const imdbInstance = new Imdb([]);
const imdbLoaded = imdbInstance.obtenerInstanciaIMDB("imdbBBDD.json");

console.log("--- Añadir un nuevo profesional ---");
const name = readlineSync.question('Nombre: ');
const age = parseInt(readlineSync.question('Edad: '));
const weight = parseFloat(readlineSync.question('Peso: '));
const height = parseFloat(readlineSync.question('Altura: '));
const isRetired = readlineSync.question('¿Está retirado? (true/false): ') === 'true';
const nationality = readlineSync.question('Nacionalidad: ');
const oscarsNumber = parseInt(readlineSync.question('Número de Oscars: '));
const profession = readlineSync.question('Profesión: ');

const newProfessional = new Professional(name, age, weight, height, isRetired, nationality, oscarsNumber, profession);

// Elegir a qué película añadir el profesional
const movieTitles = imdbLoaded.peliculas.map(movie => movie.title);
const movieIndex = readlineSync.keyInSelect(movieTitles, 'Selecciona la película para añadir al profesional:');
const movieToUpdate = imdbLoaded.peliculas[movieIndex];

if (movieToUpdate) {
    // Decidir si es actor, director, etc.
    const roleOptions = ['actor', 'director', 'writer'];
    const roleIndex = readlineSync.keyInSelect(roleOptions, 'Selecciona el rol del profesional:');
    const role = roleOptions[roleIndex];

    if (role === 'actor') {
        movieToUpdate.actors.push(newProfessional);
    } else if (role === 'director') {
        movieToUpdate.director = newProfessional;
    } else if (role === 'writer') {
        movieToUpdate.writer = newProfessional;
    }

    // Guardar los cambios en el archivo JSON
    imdbLoaded.escribirEnFicheroJSON("imdbBBDD.json");
    console.log(`Profesional ${newProfessional.name} añadido como ${role} a la película ${movieToUpdate.title}.`);
} else {
    console.log("Selección de película inválida.");
}
