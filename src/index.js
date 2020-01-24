const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = 'http://localhost:3000/artists'
const CONNECTIONS_URL = 'http://localhost:3000/connections'
const GENRES_URL = `${BASE_URL}/genres`
const findBody = document.querySelector('body')

document.addEventListener("DOMContentLoaded", function() {
    clickListener();
    fetchArtists();
    fetchGenres();
});

// click events for create artist and create genre buttons
function clickListener() {
    document.addEventListener('click', function(e){
        console.log(e.target)
        const createArtistBtn = document.getElementById('create-artist-btn');
        
        if (e.target === createArtistBtn){
            postNewArtistGenre();
        } else if (e.target.id === 'active-edit'){
            patchArtistName(e.target);
            fetchArtists();
            fetchGenres();
        } else if (e.target.innerText === 'D'){
            deleteArtist(e.target.id);
        } else if (e.target.innerText === 'E'){
            createEditArtistInput(e.target.id);
        } 
    })
};

function patchArtistName(editBtn){
    const idInt = editBtn.parentElement.id;
    const editInputInfo = document.getElementById('active-edit-info');

    let nameData = {"name": editInputInfo.value};
    console.log(nameData)
    let nameConfig = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(nameData)
    };

    resetArtistGenreDisplay();

    fetch(ARTISTS_URL + '/' + `${idInt}`, nameConfig)
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(error => console.error('No patch workin', error.message))
}

function createEditArtistInput(id){
    const inputField = document.createElement('input');
    const artistDiv = document.getElementById(`${id}`);
    inputField.placeholder = 'edit name';
    inputField.id = 'active-edit-info';
    artistDiv.insertBefore(inputField, artistDiv.children[3]);
    const editBtn = artistDiv.children[2];
    editBtn.id = 'active-edit';
    editBtn.innerText = 'Submit';
}

//fetch existing artists from db    
function fetchArtists(){
    return fetch(ARTISTS_URL)
        .then(resp => resp.json())
        .then(artists => iterateArtists(artists))
};
        
//takes array of artists and passes each artist element into renderArtist
function iterateArtists(artists){
    artists.forEach(renderArtist)
};
        
//render individual artist obj on page
function renderArtist(artObj){
    const mainSec = document.getElementById('artists-list');

    const divWithCard = document.createElement('div');
    divWithCard.classList.add('card');
    divWithCard.id = artObj.id;
            
    const h2 = document.createElement('h2');
    h2.innerText = artObj.name;

    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    deleteBtn.innerText = 'D';
    deleteBtn.id = artObj.id;
    editBtn.innerText = 'E';
    editBtn.id = artObj.id;

    const h3 = document.createElement('h3');
    h3.innerText = 'Genres';

    const ul = document.createElement('ul');
    divWithCard.append(h2, deleteBtn, editBtn, h3, ul);

    artObj.genres.forEach(function(genLi){
        const li = document.createElement('li');
        li.innerText = genLi.name;
        ul.append(li);
    });
    mainSec.append(divWithCard);
};
        

function postNewArtistGenre(){
    const artistNameField = document.getElementById('create-artist-input')
    const genreNameField = document.getElementById('create-genre-input')
    const artistInfo = {'name': artistNameField.value}
    const genreInfo = {'name': genreNameField.value}
    
    resetForm();
    resetArtistGenreDisplay();

    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({artistName: artistInfo, genreName: genreInfo})
    }

    fetch(CONNECTIONS_URL, reqObj)
        .then(resp => resp.json())
        .then(json => {console.log(json)}
        );

    fetchArtists();
    fetchGenres();
};

function deleteArtist(id){
    console.log(id)
    unrenderArtist(id);

    return fetch(ARTISTS_URL + '/' + `${id}`, {method: 'delete'})
    .then(resp => resp.json())
    .then(json => {return json})
    .catch(error => console.error('oops, something is wrong', error.message))

};

function unrenderArtist(id){
    const artistDiv = document.getElementById(`${id}`);
    artistDiv.innerHTML = '';
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

function resetForm(){
    const artistFormInput = document.getElementById('create-artist-input');
    const genreFormInput = document.getElementById('create-genre-input');

    artistFormInput.value = '';
    genreFormInput.value = '';
};

function resetArtistGenreDisplay(){
    // console.log('You still need to render the new jazzzz')
    const artistsMain = document.getElementById('artists-list');
    const genresMain = document.getElementById('genres-list');
    artistsMain.innerHTML = '';
    genresMain.innerHTML = '';
};