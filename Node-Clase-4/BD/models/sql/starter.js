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
    if (genre) {
        const lowerCaseGenre = genre.toLowerCase();

        const [genres] = await connection.query(
            'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
            [lowerCaseGenre]
        )

        if (genres.length === 0) return []

        const [{ id }] = genres

        const [movies] = await connection.query(
           `SELECT
                m.title, m.year, m.director,m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id 
            FROM movie m
            JOIN movie_genres mg ON m.id = mg.movie_id
            WHERE mg.genre_id = ?;`,
            [id]
        )

        return movies
    }

    const [movies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
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
    const {
        genre: genreInput,
        title, 
        year,
        director,
        duration, 
        rate, 
        poster
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult;

    try {
        await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate)
                VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                [title, year, director, duration, poster, rate]
        )

        for (let genre of genreInput) {
            // Obtener el ID del género
            const [genreResult] = await connection.query(
              'SELECT id FROM genre WHERE LOWER(name) = ?;',
              [genre.toLowerCase()]
            );
            const [{ id: genreId }] = genreResult;
    
            // Relacionar género con la película
            await connection.query(
              'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);',
              [uuid, genreId]
            );
          }

          const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
            ) 

          return movies[0]
    } catch(e) {
        console.log(e);
        throw new Error('Error creating movie')
    }
  }

  static async delete ({ id }) {
    
  }

  static async update ({ id, input }) {
    
  }
}