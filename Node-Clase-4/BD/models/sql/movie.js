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
        const lowerCaseGenre = genre.toLowerCase()
  
        // get genre ids from database table using genre names
        const [genres] = await connection.query(
          'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
          [lowerCaseGenre]
        )
  
        // no genre found
        if (genres.length === 0) return []
  
        // get the id from the first genre result
        const [{ id }] = genres
  
        // get all movies ids from database table
        // la query a movie_genres
        // join
        // y devolver resultados..
        const [movies] = await connection.query(
            `SELECT 
              m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id 
            FROM movie m
            JOIN movie_genres mg ON m.id = mg.movie_id
            WHERE mg.genre_id = ?;`,
            [id]
          );
    
        return movies;
      }
    const [movies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    return movies;
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
        genre: genreInput, // genre is an array
        title,
        year,
        duration,
        director,
        rate,
        poster
    } = input

    // todo: crear la conexión de genre

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )

      // Insertar géneros asociados
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
    } catch (e) {
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    try {
      // Primero, eliminar las relaciones de géneros de la película
      await connection.query(
        'DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);',
        [id]
      );

      // Luego, eliminar la película
      const [result] = await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?);',
        [id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Movie not found');
      }

      return { message: 'Movie deleted successfully' };
    } catch (e) {
      throw new Error('Error deleting movie');
    }
}

    static async update ({ id, input }) {
        const updateFields = [];
        const updateValues = [];

        // Recolectamos solo los campos que necesitamos actualizar
        Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            updateValues.push(input[key]);
        }
        });

        if (updateFields.length === 0) {
        throw new Error('No fields to update');
        }

        // Añadimos el id a los valores a pasar en la consulta
        updateValues.push(id);

        try {
        const [result] = await connection.query(
            `UPDATE movie SET ${updateFields.join(', ')} WHERE id = UUID_TO_BIN(?);`,
            updateValues
        );

        if (result.affectedRows === 0) {
            throw new Error('Movie not found or no changes made');
        }

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        );

        return movies[0];
        } catch (e) {
        throw new Error('Error updating movie');
        }
    }

}