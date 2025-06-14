import { readJSON } from "../utils.js"
import { randomUUID } from 'node:crypto'

const movies = readJSON('./movies.json');
export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            return movies.filter(
              movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        }

        return movies;
    }

    static async getById ({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie;
    }

    static async create (data) {
        const newMovie = {
            id: randomUUID(),
            ...data
        }

        movies.push(newMovie)
        return newMovie;
    }

    static async delete ({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false
    
        movies.splice(movieIndex, 1)
        return true
      }
    
    static async update ({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false

        movies[movieIndex] = {
        ...movies[movieIndex],
        ...input
        }

        return movies[movieIndex]
    }
}