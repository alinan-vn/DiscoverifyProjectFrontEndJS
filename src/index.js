const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const GENRES_URL = `${BASE_URL}/genres`


document.addEventListener("DOMContentLoaded", function() {
    clickyBoy();
    fetchArtists();
    clickListener();
});


// just looks at click events anywhere on page
function clickyBoy() {
    document.addEventListener('click', function(e){
        console.log(e.target)
    })
};

// click events for create artist and create genre buttons
function clickListener(){
    document.addEventListener('click', function(e){
        if (e.target.id === 'create-artist-btn'){
            postNewArtist(e)
            
        } else if (e.target.id === 'create-genre-btn'){
            postNewGenre(e)
        }
    })
}


// creates fetch request for new artist from form field
function postNewArtist(event){
    const artistInfo = event.target.dataset
    const reqObj = {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({artistInfo})
    }
    
    fetch(ARTISTS_URL, reqObj)
    .then(resp => resp.json())
    .then(artObj=> renderArtist(artObj))
}

// feels unecessary for now
//   function renderPostArtist(event, artObj){
    //     const ul = event.target.nextSibling
    //     renderArtist( / ul, / artObj)
    //   }
    
    //fetch existing artists from db
    function fetchArtists(){
        return fetch(ARTISTS_URL)
        .then(resp => resp.json())
        .then(artists => 
            // console.log(artists)
            iterateArtists(artists))
        }
        
        //takes array of artists and passes each artist element into renderArtist
        function iterateArtists(artists){
            artists.forEach(renderArtist)
        }
        
        //render individual artist obj on page
        function renderArtist(artObj){
            const mainSec = document.querySelector('main')

            const divWithCard = document.createElement('div')
            divWithCard.classList.add('card')
            divWithCard.id = artObj.id
            
            const p = document.createElement('p')
            p.innerText = artObj.name
            
            divWithCard.append(p)
            mainSec.append(divWithCard)
        }
        
        
// creates fetch request for new genre from form field
function postNewGenre(event){
    const genreInfo = event.target.dataset
    const reqObj = {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({genreInfo})
    }
  
    fetch(GENRES_URL, reqObj)
      .then(resp => resp.json())
      .then(genreObj=> renderGenre(genreObj))
}

//fetch existing genres from db
function fetchGenres(){
    return fetch(GENRES_URL)
        .then(resp => resp.json())
        .then(genres => 
            // console.log(genres)
            iterateGenres(genres))
}

//takes array of genres and passes each genre element into renderGenre
function iterateGenres(genres){
    genres.forEach(renderGenre)
}

//render individual genre obj on page
function renderGenre(genreObj){
    const mainSec = document.querySelector('main')

    const divWithCard = document.createElement('div')
    divWithCard.classList.add('card')
    divWithCard.id = genreObj.id

    const p = document.createElement('p')
    p.innerText = genreObj.name

    divWithCard.append(p)
    mainSec.append(divWithCard)
}