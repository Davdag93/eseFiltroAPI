 const API = 'pokemon.json-master/pokedex.json'

let pokemon
fetch(API)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        pokemon = data;
        
        console.log(pokemon)
        generaCards(pokemon)
    })
    .catch((err) => {})


function generaCards(pokemon) {
    const pokedex = document.querySelector("#pokedex");
    pokemon.forEach(pkm => {
        const card = `
        <div class="col-md-2 mb-4">
        <div class="card">
            <div class="card-image-top p-3"><img src="pokemon.json-master/images/${formatoID(pkm.id)}.png" alt="${pkm.name.english}" title="${pkm.id}" class="img-fluid"></div>
            
            <div class="card-text">
                <h3 class="text-center">${pkm.name.english}</h3>
            </div>
        </div>
    </div>`;
        pokedex.insertAdjacentHTML("beforeend", card);
    });
}

function formatoID(id) {
    if (id.toString().length === 1) {
        return `00${id}`;
    } else if (id.toString().length === 2) {
        return `0${id}`;
    } else {
        return id.toString();
    }
}


const searchBar = document.querySelector("#cercaPkm")
// Funzione per filtrare i Pokémon per nome (non case sensitive)
function filterByPokemonName(name, pokemon) {
    const lowerCaseName = name.toLowerCase();
    return pokemon.filter(pkmn => pkmn.name.english.toLowerCase().startsWith(lowerCaseName));
  }
  
  // Funzione per filtrare i Pokémon per tipo (non case sensitive)
  function filterByPokemonType(type, data) {
    const lowerCaseType = type.toLowerCase();
    return data.filter(pkmn => pkmn.type.some(t => t.toLowerCase() === lowerCaseType));
  }

// Funzione per aggiornare le card dei Pokémon
function updatePokemonCards(filteredPokemon) {
  const pokedex = document.querySelector("#pokedex");
  pokedex.innerHTML = ""; // Svuota il contenitore
  generaCards(filteredPokemon);
}

// Aggiungi un ascoltatore all'evento "keyup" sulla searchBar
searchBar.addEventListener("keyup", (e) => {
    const inputValue = e.target.value.trim();
    let pokemonFiltrati = [];
  
    if (inputValue.startsWith("type:")) {
      const typeValue = inputValue.replace("type:", "").trim();
      pokemonFiltrati = filterByPokemonType(typeValue, pokemon);
    } else {
      pokemonFiltrati = filterByPokemonName(inputValue, pokemon);
    }
  
    updatePokemonCards(pokemonFiltrati);
});

