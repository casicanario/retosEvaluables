import { Movie } from './movie';
import { Professional } from './professional';

// Creamos profesionales de ejemplo
const director = new Professional("Christopher Nolan", 51, 85, 1.76, false, "britanico", 0, "director");
const actor1 = new Professional("Leonardo DiCaprio", 47, 75, 1.83, false, "estadounidense", 1, "actor");
const actor2 = new Professional("Joseph Gordon-Levitt", 41, 72, 1.77, false, "estadounidense", 0, "actor");

// Creamos una película y le asignamos los profesionales
const inception = new Movie("Inception", 2010, "Estadounidense", "Ciencia Ficción");
inception.director = director;
inception.actors = [actor1, actor2];
inception.language = "inglés";
inception.plataforma = "HBO Max";
inception.isMCU = false;
inception.mainCharacterName = "Cobb";
inception.producer = "Emma Thomas";
inception.distributor = "Warner Bros. Pictures";

// Mostramos los datos de la película
inception.showMovieData();
