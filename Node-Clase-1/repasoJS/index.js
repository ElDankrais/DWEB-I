// var name = 'Chansey';

// function summarizeUser(userName, userAge) {
//     return 'Name is ' + userName + ', age is ' + userAge;
// }

// console.log(name);

// const summarize = (name) => {
//     let pokemonName = 'Pidgeotto';
//     console.log(`Trainer ${name} uses ${pokemonName}`);
// }

// summarize('Andrea');


// const trainer = {
//     name: 'Manuel',
//     favoritePokemon: {
//         name: 'Charmander',
//         type: ['fire'],
//         attacks: [
//             {
//                 name: 'ember',
//                 power: 60
//             },
//             {
//                 name: 'scratch',
//                 power: 40
//             } 
//         ]
//     },
//     battle (index) {
//         console.log(`${this.favoritePokemon?.name} uses ${this.favoritePokemon?.attacks[index].name}`)
//     }
// }

// trainer.battle(0);

// //Arrays

// for (let attack of trainer.favoritePokemon.attacks) {
//     console.log(attack)
// }

// const attacks = trainer.favoritePokemon.attacks;

// console.log(attacks.map(attack => 'Hola ' + attack.name))
// console.log(trainer.favoritePokemon.attacks);

// //Spread and rest operators

// const newAttacks = [...attacks];
// newAttacks.push({name: 'leer', power: 0})
// console.log(attacks);
// console.log(newAttacks);

// //destructuring

// const printAttackName = ({name}) => console.log(name);

// newAttacks.map(attack => printAttackName(attack));

// const {name1, power} = attacks[0]
// console.log(name1, power);

//Async code and promises

const fetchData = callback => {
    setTimeout(() => {
        callback('Finish papu')
    }, 1500) 
}

setTimeout(() => {
    console.log('Se acabó');
    fetchData(text => console.log(text))
}, 2000);
console.log('hi');

const otherFetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Finish papu')
        }, 1500)
    });
    return promise
}

setTimeout(() => {
    console.log('Se acabó');
    otherFetchData()
    .then(text => {
        console.log(text)
        return otherFetchData()
    })
    .then(text2 => console.log(text2))
}, 2000);




