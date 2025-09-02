import { Imdb } from './imdb';
import { Movie } from './movie';
import { Professional } from './professional';
import { readFileSync, writeFileSync } from 'fs';

// Crear profesionales y películas de ejemplo
const director = new Professional("Christopher Nolan", 51, 85, 1.76, false, "britanico", 0, "director");
const actor = new Professional("Leonardo DiCaprio", 47, 75, 1.83, false, "estadounidense", 1, "actor");

const movie1 = new Movie("Inception", 2010, "estadounidense", "Ciencia Ficción");
movie1.director = director;
movie1.actors.push(actor);

const movie2 = new Movie("Parasite", 2019, "coreana", "Thriller");

// Crear una instancia de Imdb
const imdb = new Imdb([movie1, movie2]);

// Parte 5: Guardar el objeto en un JSON
const jsonString = JSON.stringify(imdb, null, 2);
writeFileSync("imdbBBDD.json", jsonString, { encoding: 'utf8' });
console.log("Objeto Imdb guardado en imdbBBDD.json");

// Parte 5: Leer el JSON y crear una nueva instancia
const loadedImdb = new Imdb([]); // Se crea una instancia vacía para luego llenarla
const newImdbInstance = loadedImdb.obtenerInstanciaIMDB("imdbBBDD.json");
console.log("\nObjeto Imdb cargado desde el fichero:");
console.log(newImdbInstance);
