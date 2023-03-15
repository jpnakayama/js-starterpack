function gotchaPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      pkId = document.getElementById('pokemon-id')
      pkName = document.getElementById('pokemon-name')
      pkImg = document.getElementById('pokemon-img')

      pkId.innerHTML = data.id
      pkName.innerHTML = data.name
      pkImg.src = data.sprites.back_default
    })
}

gotchaPokemon(5)