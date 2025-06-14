const express = require('express');
const cors = require('cors');
const crypto = require('node:crypto');

const movies = require('./movies.json');
const { validateMovie,validatePartialMovie } = require('./schemas/movies').default;

const app = express();
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        console.log(origin);
        const ACCEPTED_ORIGINS = [
            'http://localhost:1234',
            'http://localhost:8080',
            'http://127.0.0.1:5500'
        ];

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) return callback(null, true);

        callback(new Error('Not allowed by CORS'));
    }
}));

app.get('/movies', (req, res) => {
    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(movieGenre => movieGenre.toLowerCase() === genre.toLowerCase())
        );
        return res.json(filteredMovies);
    }
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({ message: 'La película solicitada no se ha encontrado' });
});

app.post('/movies', (req, res) => {
    const newMovie = req.body;
    const result = validateMovie(newMovie);
    
    if (!result.success) {
        return res.status(400).json({ errors: result.error.message});
    }

    const newMovieWithId = { ...result.data, id: crypto.randomUUID() };

    movies.push(newMovieWithId);

    res.status(201).json(newMovieWithId);
});

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
  
    movies.splice(movieIndex, 1)
  
    return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

app.listen(1234, () => {
    console.log('Server running on port 1234');
});