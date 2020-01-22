const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const GENRES_URL = `${BASE_URL}/genres`
const findBody = document.querySelector('body')

document.addEventListener("DOMContentLoaded", function() {
    clickyBoy();
    fetchArtists();
    fetchGenres();
});

// click events for create artist and create genre buttons
function clickyBoy() {
    document.addEventListener('click', function(e){
        console.log(e.target)
        const createArtistBtn = document.getElementById('create-artist-btn');
        const genreNumBtn = document.getElementById('genre-num-btn');
        const artistFormBtn = document.getElementById('artist-btn');
        if (e.target === createArtistBtn){
            askGenreForm();
        } else if (e.target === genreNumBtn){
            createArtistForm();
        } else if (e.target === artistFormBtn) {
            postNewArtist();
        }

    })
};

function removeFirstButtons(){
    const mainfirst = document.getElementById('buttons');
    mainfirst.innerHTML = '';
}

function askGenreForm(){
    const mainButtons = document.getElementById('buttons');
    const howManyGenresInput = document.createElement('input');
    const p = document.createElement('p');
    const genreNumBtn = document.createElement('button');


    p.innerText = 'How many genres will this artist have?';
    howManyGenresInput.placeholder = 'Number'
    howManyGenresInput.id = 'genre-num-input';
    genreNumBtn.id = 'genre-num-btn'
    genreNumBtn.innerText = 'Create Form';
    removeFirstButtons();

    mainButtons.append(p, howManyGenresInput, genreNumBtn);
};

function createArtistForm(){
    const artistNameInput = document.createElement('input');
    artistNameInput.id = 'artist-input';
    artistNameInput.placeholder = 'Artist Name';
    const mainButtons = document.getElementById('buttons');
    const artistCreateBtn = document.createElement('button')
    artistCreateBtn.innerText = 'Create Artist!';
    artistCreateBtn.id = 'artist-btn';

    const numGenreStr = document.getElementById('genre-num-input');
    let genreInt = parseInt(numGenreStr.value);
    console.log(genreInt);
    removeFirstButtons();
    mainButtons.append(artistNameInput);
    for (let i = 0; i < genreInt; i++){
        const genreInput = document.createElement('input');
        genreInput.id = `genre-input`
        genreInput.placeholder = `Genre ${i +1}`;
        mainButtons.append(genreInput);
    };
    mainButtons.append(artistCreateBtn);
};

// creates fetch request for new artist from form field
function postNewArtist(){
    const artistName = document.getElementById('artist-input');
    const genreInputList = document.querySelectorAll('input#genre-input');
    const artistInfo = {'name': '', 'genre': []};

    artistInfo['name'] = artistName.value;
    genreInputList.forEach(function(elem){
        let genre = elem.value;
        artistInfo['genre'].push(genre)
    })
    console.log(artistInfo)
    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(artistInfo)
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