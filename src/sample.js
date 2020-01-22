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
    const artistInfo = {'name': '', 'genres': []};

    artistInfo['name'] = artistName.value;
    genreInputList.forEach(function(elem){
        let genre = elem.value;
        artistInfo['genres'].push(genre)
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

    return fetch(ARTISTS_URL, reqObj)
        .then(resp => resp.json())
        .then(json => console.log(json))
}