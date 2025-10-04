var EstadoCarga;
(function (EstadoCarga) {
    EstadoCarga["Cargando"] = "CARGANDO";
    EstadoCarga["Exitoso"] = "EXITOSO";
    EstadoCarga["Error"] = "ERROR";
})(EstadoCarga || (EstadoCarga = {}));
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("porcentajeInput");
    const button = document.getElementById("mostrarBtn");
    const resultado = document.getElementById("resultado");
    const spinner = document.getElementById("spinner");
    button.addEventListener("click", async () => {
        const valor = Number(input.value);
        let estado = validarEntrada(valor);
        if (estado === EstadoCarga.Error) {
            return;
        }
        spinner.style.display = "flex";
        resultado.innerHTML = "";
        try {
            await delayFunc();
            estado = EstadoCarga.Exitoso;
            spinner.style.display = "none";
            resultado.innerHTML = obtenerImagen(valor);
        }
        catch (error) {
            estado = EstadoCarga.Error;
            spinner.style.display = "none";
            resultado.innerHTML = `<p class="resultado__error">${error}</p>`;
        }
        // const delay = Math.random() * 6;
        // setTimeout(() => {
        //     spinner.style.display = "none";
        //     if (delay >= 5) {
        //       resultado.innerHTML = `<p class="resultado__error">Error: El tiempo de carga superó los 5 segundos.</p>`;
        //     } else {
        //       resultado.innerHTML = obtenerImagen(valor);
        //     }
        //   }, delay * 1000);
    });
    function validarEntrada(valor) {
        if (isNaN(valor) || valor < 0 || valor > 100) {
            resultado.innerHTML = `<p class="resultado__error">Por favor, ingresa un número entre 0 y 100.</p>`;
            spinner.style.display = "none";
            return EstadoCarga.Error;
        }
        return EstadoCarga.Exitoso;
    }
    function delayFunc() {
        return new Promise((resolve, reject) => {
            const delay = Math.random() * 6;
            setTimeout(() => {
                if (delay >= 5) {
                    reject('Error: El tiempo de carga superó los 5 segundos');
                }
                else {
                    resolve();
                }
            }, delay * 1000);
        });
    }
    function obtenerImagen(valor) {
        let redondeado;
        if (valor <= 5) {
            redondeado = 5;
        }
        else {
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
export {};
