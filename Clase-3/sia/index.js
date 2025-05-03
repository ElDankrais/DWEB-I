const input = document.querySelector('#porcentajeInput');
const button = document.querySelector('#mostrarBtn');
const resultado = document.querySelector('.resultado');

button.addEventListener('click', () => {
    const valor = Number(input.value);
    
    let redondeado;

    redondeado = valor <= 5 ? 5 : Math.floor(valor / 5) * 5

    const imgSrc = `img/${redondeado}.jpg`

    resultado.innerHTML = `
        <div class="resultado__card">
            <h2 class="resultado__title">Avance: ${valor}</h2>
            <img src="${imgSrc}" alt="Avance ${redondeado}" class="resultado__image">
        </div>
    `;
})