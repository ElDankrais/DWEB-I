//conexion a BD

import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config);


export class MovieModel {
  static async getAll ({ genre }) {
    //filtrar generos elegidos
    if (genre) {
        const lowerCaseGenre = genre.toLowerCase();

        const [genres] = await connection.query(
            'SELECT id, name FROM genre WHERE LOWER(name) =?;',
            [lowerCaseGenre]
        )

        if (genres.length === 0) return []

        const [{ id }] = genres;

        const [movies] = await connection.query(
            `SELECT
                m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id
            FROM movie m
            JOIN movie_genres mg ON m.id = mg.movie_id
            WHERE mg.genre_id = ?;`,
            [id]
        )
        return movies
    }

    //devolver las películas con su género

    const [movies] = await connection.query(
        `SELECT
            title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;`
    )

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
    );

    return movies[0]
  }

  static async create ({ input }) {
    
  }

  static async delete ({ id }) {
    
  }

  static async update ({ id, input}) {
    
  }

//   static async getById ({ id }) {
//     const movie = movies.find(movie => movie.id === id)
//     return movie
//   }

//   static async create ({ input }) {
//     const newMovie = {
//       id: randomUUID(),
//       ...input
//     }

//     movies.push(newMovie)

//     return newMovie
//   }

//   static async delete ({ id }) {
//     const movieIndex = movies.findIndex(movie => movie.id === id)
//     if (movieIndex === -1) return false

//     movies.splice(movieIndex, 1)
//     return true
//   }

//   static async update ({ id, input }) {
//     const movieIndex = movies.findIndex(movie => movie.id === id)
//     if (movieIndex === -1) return false

//     movies[movieIndex] = {
//       ...movies[movieIndex],
//       ...input
//     }

//     return movies[movieIndex]
//   }
}