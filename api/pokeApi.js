const pokeApi = {};

function createPokemonModel(pokeInfos) {
  const pokemon = new Pokemon()
  pokemon.number = pokeInfos.id
  pokemon.name = pokeInfos.name
  pokemon.photo = pokeInfos.sprites.other.dream_world.front_default

  const types = pokeInfos.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type

  return pokemon
}

pokeApi.getPokemonInfos = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then((createPokemonModel))
};

pokeApi.getPokemons = (offset = 0, limit = 0) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonInfos))
    .then((infoRequests) => Promise.all(infoRequests))
    .then((pokemonInfos) => pokemonInfos);
};
