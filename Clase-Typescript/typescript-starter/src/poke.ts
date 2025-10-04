interface PokemonData {
    name: string;
    types: PokemonType[];
    sprites: PokemonImage
}

interface PokemonType {
    type: {
        name: string
    }
}

interface PokemonImage {
    front_default: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pokemonInput") as HTMLInputElement;
    const button = document.getElementById("buscarBtn") as HTMLButtonElement;
    const result = document.getElementById("pokemonResult") as HTMLDivElement;
  
    button.addEventListener("click", () => {
      const nombre = input.value.trim().toLowerCase();
      if (!nombre) {
        result.innerHTML = `<p class="error">Por favor, ingresa el nombre de un Pokémon.</p>`;
        return;
      }
  
      result.innerHTML = `<p class="loading">Buscando...</p>`;
      input.value = "";
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(response => {
          if (!response.ok) throw new Error("Pokémon no encontrado");
          return response.json();
        })
        .then((data: PokemonData) => {
          result.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Tipo: ${data.types.map(type => type.type.name).join(", ")}</p>
          `;
        })
        .catch(error => {
          result.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        });
    });
  });
  