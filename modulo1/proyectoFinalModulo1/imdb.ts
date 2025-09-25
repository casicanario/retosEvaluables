import { Movie } from './movie';
import { readFileSync, writeFileSync } from 'fs';

export class Imdb {
    public peliculas: Movie[];

    constructor(peliculas: Movie[]) {
        this.peliculas = peliculas;
    }

    public escribirEnFicheroJSON(nombreFichero: string): void {
        const data = JSON.stringify(this, null, 2);
        writeFileSync(nombreFichero, data, { encoding: 'utf8' });
    }

    public obtenerInstanciaIMDB(nombreFichero: string): Imdb {
        try {
            const data = readFileSync(nombreFichero, { encoding: 'utf8' });
            const imdbData = JSON.parse(data);
            const loadedMovies: Movie[] = imdbData.peliculas.map((movie: any) => {
                const newMovie = new Movie(movie.title, movie.releaseYear, movie.nationality, movie.genre);
                Object.assign(newMovie, movie);
                return newMovie;
            });
            return new Imdb(loadedMovies);
        } catch (error) {
            console.error(`Error al leer el fichero ${nombreFichero}:`, error);
            return new Imdb([]);
        }
    }
}