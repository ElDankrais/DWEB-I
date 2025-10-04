enum EstadoCarga {
    Cargando = "CARGANDO",
    Exitoso = "EXITOSO",
    Error = "ERROR"
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("porcentajeInput") as HTMLInputElement;
    const button = document.getElementById("mostrarBtn") as HTMLButtonElement;
    const resultado = document.getElementById("resultado") as HTMLDivElement;
    const spinner = document.getElementById("spinner") as HTMLDivElement;

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
        } catch (error: unknown) {
            cambiarEstado(EstadoCarga.Error, spinner, resultado);
            resultado.innerHTML = manejarError(error);
        }
    });
});

function validarEntrada(valor: number): EstadoCarga {
    if (isNaN(valor) || valor < 0 || valor > 100) {
        return EstadoCarga.Error;
    }
    return EstadoCarga.Exitoso;
}

function cambiarEstado(
    estado: EstadoCarga,
    spinner: HTMLDivElement,
    resultado: HTMLDivElement
    ): void {
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

function mostrarError(mensaje: string, resultado: HTMLDivElement, spinner: HTMLDivElement): void {
    resultado.innerHTML = `<p class="resultado__error">${mensaje}</p>`;
    spinner.style.display = "none";
}

function delayFunc(): Promise<void> {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 6;
        setTimeout(() => {
        if (delay >= 5) {
            reject("Error: El tiempo de carga superó los 5 segundos");
        } else {
            resolve();
        }
        }, delay * 1000);
    });
}

function obtenerImagen(valor: number): string {
    const redondeado = valor <= 5 ? 5 : Math.ceil(valor / 5) * 5;
    const imagenSrc = `img/${redondeado}.jpg`;

    return `
        <div class="resultado__card">
        <h3 class="resultado__title">Avance: ${valor}%</h3>
        ${imagenSrc}
        </div>
    `;
}

function manejarError(error: unknown): string {
    if (typeof error === "string") {
        return `<p class="resultado__error">${error}</p>`;
    } else if (error instanceof Error) {
        return `<p class="resultado__error">${error.message}</p>`;
    } else {
        return lanzarError("Error inesperado");
    }
}

function lanzarError(mensaje: string): never {
    throw new Error(mensaje);
}