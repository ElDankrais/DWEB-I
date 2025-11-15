//pelicula: Título, año, director, duration, calificacion, imagen /poster, genero

const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');
const movies = require('./movies.json');
const { validateMovie } = require('./schemas/movies');

const app = express();
app.use(express.json());

//CORS
app.use(cors({
    origin: (origin, callback) => {
        console.log(origin);
        const ACCEPTED_ORIGINS = [
            'http://localhost:1234',
            'http://127.0.0.1:5500'
        ];

        if (ACCEPTED_ORIGINS.includes(origin)) {
            console.log('all good');
            return callback(null, true);
        }

        callback(new Error('Maldito CORS'));
    }
}))

app.get('/movies', (req, res) => {
    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        );
        return res.json(filteredMovies);
    }
    res.json(movies);
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    
    if (movie) {
        return res.json(movie);
    }

    res.status(404).json({ message: 'Película no encontrada'});
})

// crear peliculas

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie);

    res.status(201).json(newMovie);
})


// borrar peliculas

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        res.status(404).json({ messgae: 'Película no encontrada'})
    }

    movies.splice(movieIndex, 1);
    res.json({ message: 'Se borró'});
})

app.listen(1234, () => console.log('Te estoy escuchando'));