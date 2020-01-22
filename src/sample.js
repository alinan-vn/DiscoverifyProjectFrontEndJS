const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const GENRES_URL = `${BASE_URL}/genres`
const findBody = document.querySelector('body')

function removeFirstButtons(){
    const mainfirst = document.getElementById('buttons');
    mainfirst.innerHTML = '';
}

function askGenreForm(){
    console.log('in artist creation')
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
    // removeFirstButtons();
    console.log('remove first buttons')
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
        genreInput.id = `genre-input-${i}`
        genreInput.placeholder = `Genre ${i +1}`;
        mainButtons.append(genreInput);
    };
    mainButtons.append(artistCreateBtn);
};

document.addEventListener("DOMContentLoaded", function() {
    clickyBoy();
    
});

// just looks at click events anywhere on page
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