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
        const estado = validarEntrada(valor);
        if (estado === EstadoCarga.Error) {
            mostrarError("Por favor, ingresa un número entre 0 y 100.", resultado, spinner);
            return;
        }
        cambiarEstado(EstadoCarga.Cargando, spinner, resultado);
        try {
            await delayFunc();
            cambiarEstado(EstadoCarga.Exitoso, spinner, resultado);
            resultado.innerHTML = obtenerImagen(valor);
        }
        catch (error) {
            cambiarEstado(EstadoCarga.Error, spinner, resultado);
            resultado.innerHTML = manejarError(error);
        }
    });
});
function validarEntrada(valor) {
    if (isNaN(valor) || valor < 0 || valor > 100) {
        return EstadoCarga.Error;
    }
    return EstadoCarga.Exitoso;
}
function cambiarEstado(estado, spinner, resultado) {
    switch (estado) {
        case EstadoCarga.Cargando:
            spinner.style.display = "flex";
            resultado.innerHTML = "";
            break;
        case EstadoCarga.Exitoso:
            spinner.style.display = "none";
            break;
        case EstadoCarga.Error:
            spinner.style.display = "none";
            break;
    }
}
function mostrarError(mensaje, resultado, spinner) {
    resultado.innerHTML = `<p class="resultado__error">${mensaje}</p>`;
    spinner.style.display = "none";
}
function delayFunc() {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 6;
        setTimeout(() => {
            if (delay >= 5) {
                reject("Error: El tiempo de carga superó los 5 segundos");
            }
            else {
                resolve();
            }
        }, delay * 1000);
    });
}
function obtenerImagen(valor) {
    const redondeado = valor <= 5 ? 5 : Math.ceil(valor / 5) * 5;
    const imagenSrc = `img/${redondeado}.jpg`;
    return `
        <div class="resultado__card">
        <h3 class="resultado__title">Avance: ${valor}%</h3>
        ${imagenSrc}
        </div>
    `;
}
function manejarError(error) {
    if (typeof error === "string") {
        return `<p class="resultado__error">${error}</p>`;
    }
    else if (error instanceof Error) {
        return `<p class="resultado__error">${error.message}</p>`;
    }
    else {
        return lanzarError("Error inesperado");
    }
}
function lanzarError(mensaje) {
    throw new Error(mensaje);
}
export {};
