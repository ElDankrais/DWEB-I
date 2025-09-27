document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("porcentajeInput");
    const button = document.getElementById("mostrarBtn");
    const resultado = document.getElementById("resultado");
    const spinner = document.getElementById("spinner");
  
    button.addEventListener("click", async() => {
        spinner.style.display = "flex";
        resultado.innerHTML = "";
        const valor = Number(input.value);
        if (isNaN(valor) || valor < 0 || valor > 100) {
            resultado.innerHTML = `<p class="resultado__error">Por favor, ingresa un número entre 0 y 100.</p>`;
            spinner.style.display = "none"; 
            return;
        }

        resultado.innerHTML = obtenerImagen(valor);
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
  