let saludar = "     Hola a todos";
let contador = '0';
const sebas = 'CRACK, MAQUINA, BESTIA, MASTODONTE, ESPARTANO';

if (contador) {
    console.log(saludar);
} else {
    console.log('Jaja manco')
}

console.log(saludar);
console.log(saludar[5]);
console.log(saludar.length);
console.log(saludar.toUpperCase());
console.log(saludar.toLowerCase());
console.log(saludar.indexOf('a'));
console.log(saludar.trim())
console.log(saludar);

saludar = saludar.trim();

//INMUTABILIDAD VS MUTABILIDAD
console.log(saludar.slice(0, 10)); //inmutable
console.log(saludar.substring(0, 10)); //inmutable
console.log(saludar);

//Operador ternario 

let mensaje = contador ? 'Contador mayor a 4' : 'Jaja manko';

console.log(mensaje);

//false-y values
//false 
//0
//''
//null
//undefined
//NaN


const arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 0; i < arreglo.length; i++) {
    console.log(arreglo[i]);
}

arreglo[1000] = 'Tamales';
console.log(arreglo.length);
console.log(arreglo[500]);

// push, pop, shift, unshift, concat, includes, join, reverse, slice, splice, sort

const frutas = ['manzana', 'pera', 'naranja', 'uva'];
const verduras = ['lechuga', 'tomate', 'pepino'];

//push es mutable

frutas.push('sandia');
console.log(frutas);
frutas.pop();
console.log(frutas);

//concat une arreglos
console.log(frutas.concat(verduras));
console.log(frutas);

//join une arreglos en un string
let cadenaFrutas = frutas.join(' - ');
console.log(cadenaFrutas);

//split 
console.log(cadenaFrutas.split(' - '));

//reverse 
console.log(frutas.reverse());

console.log(frutas);

//slice
console.log(frutas.slice(1, 3)); //inmutable
console.log(frutas);

//splice
console.log(frutas.splice(1, 2)); //mutable
console.log(frutas);

console.log('-------------')

//sort MUTABLE
console.log(frutas.sort());
console.log(frutas);

const frutas2 = ['manzana', 'pera', 'naranja', 'uva'];

//manzana, pera, sandia, naranja, uva

console.log(frutas2.splice(2, 0, 'sandia')); //inmutable
console.log(frutas2);

//objetos

const michi = {
    nombre: 'michi',
    edad: 5,
    raza: 'persa',
    color: 'blanco',
    ladrar() {
        console.log('Miau');
    }
}

console.log(michi);
console.log(michi.nombre);
console.log(michi['nombre']);
michi.ladrar();

for (let key in michi) {
    console.log(key);
}

for (let value of frutas2) {
    console.log(value);
}

//Referencia vs valor

let saludar2 = saludar;
saludar2 = 'Chao';

console.log(saludar, saludar2);

const michi2 = michi;
michi2.nombre = 'michifus';
console.log(michi, michi2);