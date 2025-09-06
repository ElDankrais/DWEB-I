const express = require('express');

const cors = require('cors');

const crypto = require('node:crypto');

const app = express();

const movies = require('./movies.json');

const { validateMovie, validatePartialMovie } = require('./schemas/movies');

app.use(express.json())

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:1234',
            'http://127.0.0.1:5500' 
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Papu, F por el CORS'));
    }
}))

app.disable('x-powered-by');

//Middlewares

app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies);
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({ message: 'Movie not found' })
})

app.get('/', (req, res) => res.json({message: 'Aprendamos juntos'}));

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message)});
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        res.status(404).json({ message: 'Película no encontrada' })
    }

    movies.splice(movieIndex, 1);
    return res.json({ message: 'Movie deleted'})
})

app.listen(1234, () => {
    console.log(`server listening on port http://localhost:1234`)
});