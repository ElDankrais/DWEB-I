document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pokemonInput");
    const button = document.getElementById("buscarBtn");
    const result = document.getElementById("pokemonResult");
    button.addEventListener("click", () => {
        const nombre = input.value.trim().toLowerCase();
        if (!nombre) {
            result.innerHTML = `Por favor, ingresa el nombre de un Pokémon.`;
            return;
        }
        result.innerHTML = `Buscando...`;
        input.value = "";
        fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
            .then((response) => {
            if (!response.ok)
                throw new Error("Pokémon no encontrado");
            return response.json();
        })
            .then((data) => {
            result.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Tipo: ${data.types.map((t) => t.type.name).join(", ")}</p>
            `;
        })
            .catch((error) => {
            if (error instanceof Error) {
                result.innerHTML = `Error: ${error.message}`;
            }
            else {
                result.innerHTML = "Error desconocido";
            }
        });
    });
});
export {};
