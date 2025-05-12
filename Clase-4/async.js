//setTimeout

console.log('Inicio');
setTimeout(() => console.log('Felicidades por participar'), 5000);
setTimeout(() => console.log('Crack, bestia, animal, fiera, espartano'), 0);
console.log('Final')

const button = document.querySelector('button');

button.addEventListener('click', () => {
    arcoIrisPromise('red', 1000)
        .then(() => arcoIrisPromise('blue', 1000))
        .then(() => arcoIrisPromise('yellow', 1000))
})

//Arcoiris

const arcoIris = (newColor, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor;
        doNext && doNext();
    }, delay)
}

//promises

const arcoIrisPromise = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay) 
    })
}

//Request

const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (delay > 2000) {
                reject('F por la conexión')
            } else {
                resolve('Url encontrada')
            }
        }, delay)
    })
}

fakeRequestPromise('pokemon/1')
    .then((data) => {
        console.log(data);
        return fakeRequestPromise('pokemon/2');
    })
    .then((data) => {
        console.log(data);
        console.log('FINISH');
    })
    .catch((err) => {
        console.error(err);
    })