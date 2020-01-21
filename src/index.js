const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const GENRES_URL = `${BASE_URL}/genres`
const findBody = document.querySelector('body')

const divy = document.getElementsByClassName('card')

document.addEventListener("DOMContentLoaded", function() {
    fetchArtists();
    clickListener();
});

function clickyBoy() {
    document.addEventListener('click', function(e){
    console.log(e.target)
    })
};

function clickListener(){
    document.addEventListener('click', function(e){
        if (e.target.id === 'search-artists'){
            // change if to be create-artist
            postNewArtist(e)
        } else if (e.target.id === 'search-genres'){
            // change if to be create-genre
            postNewGenre(e)
        }
    })
}

function postNewArtist(event){
    const artistInfo = event.target.dataset.//artistInfo
    const reqObj = {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ /someArtistInfo/ })
    }
  
    fetch(ARTISTS_URL, reqObj)
      .then(resp => resp.json())
      .then(artObj=> renderPostArtist(event, artObj))
}
  
  function renderPostPokemon(event, artObj){
    const ul = event.target.nextSibling
    renderPokemon(ul, artObj)
  }

function fetchArtists(){
    return fetch(ARTISTS_URL)
        .then(resp => resp.json())
        .then(artists => 
            // console.log(artists)
            renderArtists(artists))
}

function renderArtists(artists){

    for (const artObj of artists){
        const divWithCard = document.createElement('div')
        divWithCard.classList.add('card')
        divWithCard.id = artObj.id
        const p = document.createElement('p')
        p.innerText = artObj.name
        divWithCard.appendChild(p)
        findBody.appendChild(divWithCard)
    }
}