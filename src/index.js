const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const GENRES_URL = `${BASE_URL}/genres`


document.addEventListener("DOMContentLoaded", function() {
    clickyBoy();
    fetchArtists();
    fetchGenres();
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
            artField = document.getElementById('create-artist-field').value
            postNewArtist(artField)
            
        } else if (e.target.id === 'create-genre-btn'){
            genField = document.getElementById('create-artist-field').value
            postNewGenre(genField)
        }
    })
}


// creates fetch request for new artist from form field
function postNewArtist(artField){
    const artistInfo = artField
    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "name": artistInfo
        //   "genre": artistInfo.genres
        //   "image": artistInfo,
        //   "likes": 0
        })
    }
    
    fetch(ARTISTS_URL, reqObj)
        .then(resp => resp.json())
        .then(artObj => renderArtist(artObj))
}
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
            
            const h5 = document.createElement('h5')
            h5.innerText = artObj.name

            const p = document.createElement('p')
            p.innerText = 'Genres'

            const ul = document.createElement('ul')
            divWithCard.append(h5, p, ul)

            artObj.genres.forEach(function(genLi){
                const li = document.createElement('li')
                li.innerText = genLi.name
                ul.append(li)
            }),

            mainSec.append(divWithCard)
        }
        
        
// creates fetch request for new genre from form field
function postNewGenre(genreField){
    const genreInfo = genreField
    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "name": genreInfo
        //   "genre": artistInfo.genres
        //   "image": artistInfo,
        //   "likes": 0
        })
    }
    
    fetch(GENRES_URL, reqObj)
        .then(resp => resp.json())
        .then(genreObj => renderGenre(genreObj))
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
            
            const h5 = document.createElement('h5')
            h5.innerText = genreObj.name

            const p = document.createElement('p')
            p.innerText = 'Artists'

            const ul = document.createElement('ul')
            divWithCard.append(h5, p, ul)

            genreObj.artists.forEach(function(artLi){
                const li = document.createElement('li')
                li.innerText = artLi.name
                ul.append(li)
            }),

            mainSec.append(divWithCard)
        }