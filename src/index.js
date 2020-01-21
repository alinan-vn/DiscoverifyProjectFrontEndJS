const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const GENRES_URL = `${BASE_URL}/genres`
const findBody = document.querySelector('body')

const divy = document.getElementsByClassName('card')

function clickyBoy() {
    document.addEventListener('click', function(e){
    console.log(e.target)
})};

document.addEventListener("DOMContentLoaded", function() {
    clickyBoy()    
});

function fetchArtists(){
    return fetch(ARTISTS_URL)
        .then(resp => resp.json())
        .then(artists => 
            // console.log(artists)
            addArtists(artists))
}

function addArtists(artists){

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