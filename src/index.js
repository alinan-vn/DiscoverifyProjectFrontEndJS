const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = 'http://localhost:3000/artists'
const CONNECTIONS_URL = 'http://localhost:3000/connections'
const GENRES_URL = `${BASE_URL}/genres`
const findBody = document.querySelector('body')

document.addEventListener("DOMContentLoaded", function() {
    clickListener();
    fetchArtists();
    // fetchGenres();
});

// click events for create artist and create genre buttons
function clickListener() {
    document.addEventListener('click', function(e){
        console.log(e.target)
        const createArtistBtn = document.getElementById('create-artist-btn');
        // const createGenreBtn = document.getElementById('create-genre-btn');

        if (e.target === createArtistBtn){
            postNewArtistGenre();
        } 
        // else if (e.target === createGenreBtn){
        //     console.log('genre creation soon?');
        // }
    })
};

//fetch existing artists from db    
function fetchArtists(){
    return fetch(ARTISTS_URL)
        .then(resp => resp.json())
        .then(artists => iterateArtists(artists))
}
        
//takes array of artists and passes each artist element into renderArtist
function iterateArtists(artists){
    artists.forEach(renderArtist)
}
        
//render individual artist obj on page
function renderArtist(artObj){
    const mainSec = document.getElementById('artists-list')

    const divWithCard = document.createElement('div')
    divWithCard.classList.add('card')
    divWithCard.id = artObj.id
            
    const h4 = document.createElement('h4')
    h4.innerText = artObj.name

    const p = document.createElement('p')
    p.innerText = 'Genres'

    const ul = document.createElement('ul')
    divWithCard.append(h4, p, ul)

    artObj.genres.forEach(function(genLi){
        const li = document.createElement('li')
        li.innerText = genLi.name
        ul.append(li)
    }),
    mainSec.append(divWithCard)
}       
        

function postNewArtistGenre(){


    const artistNameField = document.getElementById('create-artist-input')
    const genreNameField = document.getElementById('create-genre-input')
    const artistInfo = {'name': artistNameField.value}
    const genreInfo = {'name': genreNameField.value}
    debugger

    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({artistName: artistInfo, genreName: genreInfo})
    }

    return fetch(CONNECTIONS_URL, reqObj)
        .then(resp => resp.json())
        .then(json => {console.log(json)}
        )
}

//fetch existing genres from db
function fetchGenres(){
    return fetch(GENRES_URL)
    .then(resp => resp.json())
    .then(genres => iterateGenres(genres))
};
        
//takes array of genres and passes each genre element into renderGenre
function iterateGenres(genres){
    genres.forEach(renderGenre);
};
        
//render individual genre obj on page
function renderGenre(genreObj){
    const mainSec = document.getElementById('genres-list');

    const divWithCard = document.createElement('div');
    divWithCard.classList.add('card');
    divWithCard.id = genreObj.id;
    
    const h5 = document.createElement('h5');
    h5.innerText = genreObj.name;

    const p = document.createElement('p');
    p.innerText = 'Artists';

    const ul = document.createElement('ul');
    divWithCard.append(h5, p, ul);

    genreObj.artists.forEach(function(artLi){
        const li = document.createElement('li');
        li.innerText = artLi.name;
        ul.append(li);
    });

    mainSec.append(divWithCard);
}