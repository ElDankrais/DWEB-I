//spread operator ...
const nums = [1,2,3,4,5];
const otros = [...nums];

otros[0] = 35;
console.log(nums, otros);

//objetos

const feline = { legs: 4, eyes: 2};

const canine = { isFurry: true, isFriendly: true}

const catDog = { ...feline, heads: 2};

console.log(feline, catDog);

//Operador rest

function sum(...nums) {
    return nums.reduce((total, number) => total + number);
}

console.log(sum(1,2,3,4,5,6,7,8));

//Destructuración

const scores = [10,20,30,35,12,4,50,100,20,30,32,3];

//Primeros puestos
//Oro, plata, bronce, resto

scores.sort((a,b) => b - a)
console.log(scores);

const [gold, silver, bronze, ...left] = scores;

console.log(gold, silver, bronze, left);

const user = {
    email: 'bebeshito1030@gmail.com',
    password: 'rheghrhfh',
    userName: 'EhlDiAbl0',
    born: 1930,
    died: 3000
}

const {userName, born, died} = user

console.log(userName, born, died);

const {born: birth , died: dead} = user

//param destructuring

function llamado({userName}) {
    console.log(`Llamando a ${userName}`);
}

llamado(user);