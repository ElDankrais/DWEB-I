document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("porcentajeInput");
    const button = document.getElementById("mostrarBtn");
    const resultado = document.getElementById("resultado");
    const spinner = document.getElementById("spinner");
  
    button.addEventListener("click", () => {
        spinner.style.display = "flex";
        const valor = Number(input.value);
        if (isNaN(valor) || valor < 0 || valor > 100) {
            resultado.innerHTML = `<p class="resultado__error">Por favor, ingresa un número entre 0 y 100.</p>`;
            return;
        }

        const delay = Math.random() * 6;

        setTimeout(() => {
            spinner.style.display = "none";
            if (delay >= 5) {
              resultado.innerHTML = `<p class="resultado__error">Error: El tiempo de carga superó los 5 segundos.</p>`;
            } else {
              resultado.innerHTML = obtenerImagen(valor);
            }
          }, delay * 1000);
    });

    function obtenerImagen(valor){
        let redondeado;

        if (valor <= 5) {
            redondeado = 5;
        } else {
            redondeado = Math.floor(valor / 5) * 5;
        }
    
        
        const imagenSrc = `img/${redondeado}.jpg`;
    
        return `
            <div class="resultado__card">
            <h2 class="resultado__title">Avance: ${valor}%</h2>
            <img src="${imagenSrc}" alt="Avance ${redondeado}%" class="resultado__image">
            </div>
        `;
    }
});
  