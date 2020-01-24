function dynamicSearchInput(){
    const searchForm = document.getElementById('find-artist-genre-field')
    const artContainer = document.getElementById('artists-list')

    fetch('http://localhost:3000/artists')
    .then((resp) => resp.json())
    .then((artistJSONData) => {
      allArtistData = artistJSONData //hook into get artists
      artContainer.innerHTML = renderAllArtists(allArtistData)
    })

    searchForm.addEventListener('input', (e) => {handleSearchInput(e, allArtistData, artContainer)})

    function handleSearchInput(e, allArtistData, artContainer){
        const filteredArtists = allArtistData.filter(artObj => {
            return artObj.name.includes(e.target.value.toLowerCase())
        })

        const filteredArtistsHTML = renderAllArtists(filteredArtists)
        artContainer.innerHTML = filteredArtistsHTML ? filteredArtistsHTML : `<p><center>There are no artists here by that name</center></p>`
    }
}


const pokemonSearchInput = document.querySelector('#pokemon-search-form')

pokemonSearchInput.addEventListener('input', (event) => handleSearchInput(event, allPokemonData, pokemonContainer))


function handleSearchInput(event, allPokemonData, pokemonContainer) {
    const filteredPokes = allPokemonData.filter(pokeObj => {
      return pokeObj.name.includes(event.target.value.toLowerCase())
    })
    const filteredPokeHTML = renderAllPokemon(filteredPokes)
    pokemonContainer.innerHTML = filteredPokeHTML ? filteredPokeHTML : `<p><center>There are no Pokémon here</center></p>`
  }