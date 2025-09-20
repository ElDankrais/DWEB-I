console.log('Hola a todos');

if (true) {
  var casa = 'muy linda';
  let cel = 2;
  const bool = true;
}

console.log(casa);

// HOISTING

// string
let Harrison = '     Pana ';

console.log(Harrison[3]);
console.log(Harrison.length);
console.log(Harrison.trim());
console.log(Harrison.slice(4, 9));

console.log(Harrison);

// template literals

let nombre = 'Harrison';
let resto = 'A mimir';

let palabra = nombre + resto;
console.log(palabra);

console.log(nombre + ' no te adelantes, por favor.' + resto);
console.log(`${nombre} no te adelantes ${resto}`);


// JS IS WEIRD

console.log(2 + 2);
console.log(5 - 2);
console.log('2' + 5);
console.log('2' - 3);
console.log(nombre + '5' - 3);
console.log(nombre + +nombre);

if (nombre.length >= 0) {
  console.log('a bueno')
} else {
  console.log('egvwsfgw');
}

const sebas = nombre.length >= 50 ? 
              'Un crack' : 
              'Un cracnt';

console.log(sebas);

//falsy values
//false
//0
//''
//null
//undefinded
//NaN


const arreglo = [1, 2, 3, 4, 5, 6, 7];
console.log(arreglo[4]);
console.log(arreglo.length);
console.log(arreglo[80]);
arreglo[80] = 'rvev3ecv';
console.log(arreglo);

//métodos (No mutables)

const arr = arreglo.concat([1, 2 ,3]);
console.log(arreglo, arr);


console.log(arr.slice(0, 4));
console.log(arr);

//includes

console.log(arr.includes(5, 7));
console.log(arr.join(','));
//métodos mutables

arr.sort();

arr.push(20);
console.log(arr);

arr.pop();
console.log(arr);


console.log(arr.splice(0, 4));
console.log(arr);

//Objetos

const person = {
  nombre: 'David',
  apellido: 'Villa'
}

console.log(person);

//Enumerables vs iterables

for (property in person) {
  console.log(property, person[property]);
}

for (property of Object.entries(person)) {
  console.log(property);
}

// REFERENCIA VS VALOR

let num = 5;
num2 = num;
num2 = 7;
console.log(num, num2);


person2 = person;
person2.apellido = 'Chanci';
console.log(person, person2);

//funciones

saludar('Maria Alejandra');

function saludar(nombre) {
  console.log(`Hola ${nombre}`);
}

const suma = function (a, b) {
  return a + b;
}

console.log(suma(2, 3));

console.log(saludar, suma);

//this

console.log(this);

const object = {
  name: 'Daniel Chanci',
  sayMyName() {
    return this.name
  }
}

console.log(object.sayMyName());

function saludar2() {
  console.log(`Holis soy ${this.name}`)
}

saludar2();

const chanci = {
  name: 'Juan',
  greet: saludar2
}

chanci.greet()


//Lexical scope

function funcion1(){
  let count = 0;
  return function contador() {
    count+= 1;
    console.log(count)
  }
}

const miFunc = funcion1();
miFunc();
miFunc();
miFunc();
miFunc();
miFunc();

const harrisonFunc = funcion1()
harrisonFunc();
harrisonFunc();

//call, apply, bind

const sebas2 = {
  name: 'Sebas',
  age: 25,
  greet: () => {
    console.log(`Hola ${this.name}`)
  }
}

const jp = {
  name: 'Juan Pablo',
  age: 20
}

sebas2.greet();
sebas2.greet.call(jp);

//bind

const newFunc = sebas2.greet.bind(jp);
newFunc()

//callbacks

function position(element, index) {
  console.log(`pos=${index} caracter=${element}`)
}

const array2 = [1,2,3,4,5,6,7];

array2.forEach(function (index, element) {
  console.log(`pos=${index} caracter=${element}`)
})

array2.forEach((element, index) => console.log(`pos=${index} caracter=${element}`));

array2.forEach(position);

//Arrow functions

const resta = function(a, b) {
  return a - b;
}

const reastArrFunc = (a, b) => a - b;

//prolog
const arr2 = []

for (let i = 0; i < array2.length; i++) {
  arr2[i] = array2[i] * 2;
}

//map

console.log(array2.map(num => num * 2));

//filter

console.log(array2.filter(num => num%2 === 0));

//some y every

console.log(array2.some(num => num%2 === 0));

console.log(array2.every(num => num%2 === 0));