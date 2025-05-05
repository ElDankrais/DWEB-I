import despedir from './module.js';
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

console.log(rollDice());

''

function greet(name, msg) {
    console.log(`Hello ${name}, ${msg}`);
}

console.log(greet('Carlos', 'welcome to the class'));

//Scope

//Lexical scope

function bankRobbery() {
    const heroes = ['Batman', 'Profesor Super O', 'Rey Mysterio'];
    return function auxilio() {
        for (let i = 0; i < heroes.length; i++) {
            console.log(`SALVAME ${heroes[i]}`);
        }
    }
}

//Function expressions

const square = function (x) {
    return x ** 2;
}

console.log(square(5));

bankRobbery()();


//Objetos

const obj = {
    name: 'Carlos',
    age: 20,
    greet: function () {
        console.log(`Hello ${this.name}`);
    }
}

obj.greet();

//Callback

function suma (a, b) {
    return a + b;
}

//operador ternario
// if (a + b > c) {
//     return a + b;
// } else {
//     return c;
// }

function maxValue(a, b, c, callback) {
    return callback(a, b) > c ? callback(a, b) : c;
}

//maxValue
//callback 
//llamo callback
//retorn callback

console.log(maxValue(12, 20, 30, suma))

//Arrow functions

const suma2 = (a, b) => {
    console.log('HOla');
    return a + b;
}
//PROLOG

const movies = [
    {
        title: 'Avengers',
        score: 70,
    },
    {
        title: 'Star Wars',
        score: 85,
    },
    {
        title: 'El Paseo 7',
        score: 100,
    }
]

//Imprima los títulos de las películas
for (let i = 0; i < movies.length; i++) {
    console.log(movies[i].title);
}

//forEach

movies.forEach((movie) => console.log(movie.title));

//map

const titles = movies.map((movie) => movie.title);
console.log(titles);

//filter

//Imprima las pelícuals que contengan 'El' en su título

function filtrarPeliculas(arreglo) {
    const arregloFiltrado = [];
    for (let movie of arreglo) {
        if (movie.title.includes('El')) {
            arregloFiltrado.push(movie);
        }
    }
    return arregloFiltrado;
}

console.log(filtrarPeliculas(movies));

console.log(movies.filter(movie => movie.title.includes('El')));

//reduce: Reduce un arreglo a un solo valor

const scores = movies.map(movie => movie.score);

const totalScore = scores.reduce((acc, curr) => acc + curr, 300);

console.log(scores, totalScore);

//reduce con objetos

const frutas = ["manzana", "pera", "naranja", "uva", "manzana", "pera", "naranja", "uva", "manzana", "pera"];

const lista = frutas.reduce((acc, fruta) => {
    acc[fruta] = (acc[fruta] ?? 0) + 1;
    return acc
}, {});

console.log(lista);

//

console.log(despedir())
