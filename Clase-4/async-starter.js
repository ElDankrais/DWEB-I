//setTimeout

const button = document.querySelector('button');

button.addEventListener('click', () => {
    // arcoiris('red', 1000, () => {
    //     arcoiris('yellow', 1000, () => {
    //         arcoiris('green', 1000, () => {
    //             arcoiris('gold', 1000, () => {
    //                 arcoiris('silver', 1000, () => {
    //                     arcoiris('red', 1000)
    //                 })
    //             })
    //         })
    //     })
    // });

    arcoirisPromise('red', 2000)
        .then(() => arcoirisPromise('yellow', 2000))
        .then(() => arcoirisPromise('green', 2000));
})

console.log('Inicio');
setTimeout(() => {
    console.log('hola a todos')
}, 5000);
setTimeout(() => {
    console.log('hola a todos 2')
}, 0);
console.log('Final');

//setInterval

//arcoiris

const arcoiris = (newColor, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor;
        if (doNext) {
            doNext();
        }
    }, delay)
};

const arcoirisPromise = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay)
    })
}


const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (delay > 2500) {
                reject('F por la conexión');
            } else {
                resolve('Url encontrada');
            }
        }, delay)
    })
}

//llama url 1, llama url2, termina con FINISH, y si falla, muestra error
