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
        <div class="col-md-3 mb-4">
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

