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
            <div class="card card-hover" onclick="details(${pkm.id})">
                <div class="card-image-top p-3">
                    <img src="pokemon.json-master/images/${formatoID(pkm.id)}.png" alt="${pkm.name.english}"  class="img-fluid">
                </div>
                <div class="card-text">
                    <h3 class="text-center">${pkm.name.english}</h3>
                </div>
            </div>
        </div>
    `;
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
function filterByPokemonName(name, pokemon) {
    const lowerCaseName = name.toLowerCase();
    return pokemon.filter(pkmn => pkmn.name.english.toLowerCase().startsWith(lowerCaseName));
  }

function filterByPokemonType(type, data) {
const lowerCaseType = type.toLowerCase();
return data.filter(pkmn => pkmn.type.some(t => t.toLowerCase() === lowerCaseType));
}

function updatePokemonCards(filteredPokemon) {
  const pokedex = document.querySelector("#pokedex");
  pokedex.innerHTML = ""; 
  generaCards(filteredPokemon);
}

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


function details(pokemonId) {
    const selectedPokemon = pokemon.find(pkmn => pkmn.id === pokemonId);
    console.log(selectedPokemon)
    if (selectedPokemon) {
        const elencoCard = document.querySelector("#pokedex")
        const detailsContainer = document.getElementById("details-row");
        elencoCard.innerHTML = "";

        const card = `
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${selectedPokemon.name.english}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Type: ${selectedPokemon.type.join(", ")}</h6>
                        <p class="card-text">HP: ${selectedPokemon.base.HP}</p>
                        <p class="card-text">Attack: ${selectedPokemon.base.Attack}</p>
                        <p class="card-text">Defense: ${selectedPokemon.base.Defense}</p>
                        <p class="card-text">Sp. Attack: ${selectedPokemon.base["Sp. Attack"]}</p>
                        <p class="card-text">Sp. Defense: ${selectedPokemon.base["Sp. Defense"]}</p>
                        <p class="card-text">Speed: ${selectedPokemon.base.Speed}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <img src="pokemon.json-master/images/${formatoID(selectedPokemon.id)}.png" alt="${selectedPokemon.name.english}" class="img-fluid">
            </div>
        `;

        detailsContainer.innerHTML = card;
    }
}