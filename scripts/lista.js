const displayList = document.getElementById("pokeList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let offset = 0;
const limit = 9;
const maxRecord = 151

function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons
      .map(
        (pokemon) =>
          `<div class="pokemon-card ${pokemon.type}" id="pokemon-card">
        <div class="pokemon-card-body-text">
          <h2 class="pk-name" id="pokemon-name">${pokemon.name}</h2>
          <h2 class="pk-id" id="pokemon-id">#${pokemon.number}</h2>
        </div>
        <div class="pokemon-card-body">
          <div class="pokemon-card__text">
            <div class="pokemon-card__type">      
              ${pokemon.types
                .map(
                  (type) =>
                    `<div class="pk-tp ${type}" id="pokemon-type1">${type}</div>`
                )
                .join("")}
            </div>
          </div>
          <img src="${pokemon.photo}" alt="" id="${pokemon.name}">
        </div>
      </div>  
    `
      )
      .join("");
    displayList.innerHTML += newHTML;
  });
}

loadPokemons(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  const pokemonOnDisplay = offset + limit

  if (pokemonOnDisplay >= maxRecord){
    const newLimit = maxRecord - offset
    loadPokemons(offset, newLimit);

    loadMoreBtn.parentElement.removeChild(loadMoreBtn)
  } else {
    loadPokemons(offset, limit);
  }
});
