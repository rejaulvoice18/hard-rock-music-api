const searchSongs = async() => {
    const getInput = document.getElementById('input-value').value;
    const url = `https://api.lyrics.ovh/suggest/${getInput}`
       try{
         //Load data
         const res = await fetch(url);
         const data =  await res.json();
         displaySongs(data.data);
       }
       catch(error){
        displayError(error)
       }
}

//Function for Display Data
const displaySongs = (lyric) => {
    // console.log(lyric)
    const lyricContainer = document.getElementById('lyricContainer')
    lyricContainer.innerHTML = ""

    lyric.forEach(song => {
        const singleDiv = document.createElement('div');
        singleDiv.className = 'single-result row align-items-center my-3 p-3';
        singleDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        lyricContainer.appendChild(singleDiv);
    });
}

const getLyric = (artist, title) => {

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    // uporer url theke jokhon data asbe nah ba onno kuno problem hoy tokhon user k erro notice deua lage so er jonn use kora hoy catch
    // mane error ta k catch kora hoy
    .catch(error => displayError(error))

}

const displayLyrics = lyrics =>{
    const lyricDiv = document.getElementById('lyricDiv');
    lyricDiv.innerText = lyrics;
}

// Displaying Error message

const displayError = error =>{
    const errorTag = document.getElementById('error-message')
    errorTag.innerText = error;
}