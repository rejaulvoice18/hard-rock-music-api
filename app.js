//Enter key er maddhome search button a click koranu hochhe nicher function er madhome

document.getElementById('input-value').addEventListener("keypress", function (event){
    if(event.key === 'Enter'){
        document.getElementById("search-button").click();
    }
})
const searchSongs = async() => {
    const getInput = document.getElementById('input-value').value;
    const url = `https://api.lyrics.ovh/suggest/${getInput}`
    // toggleSpinner(true);
    toggleSpinner();
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
        // toggleSpinner(false);
        toggleSpinner();
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

// const toggleSpinner = (show) => {
//     const spinner = document.getElementById('loading-spinner');
//     if(show){
//         spinner.classList.remove('d-none');
//     }
//     else{
//         spinner.classList.add('d-none');
//     }
// }

// loading-spinner tag er value initialy e (d-none) means display none rakha hoiche
// tarpor toggleSpinner a conditionally searchSongs() function er vitor theke call kora hoiche and
// true paramenter pass kora hoiche means call kora hoiche jar jonno sppiner theke d-none class remove kora hoiche
// means spinner show hoiche
// Abar toggleSpinner() data load hoye jauar por bondho korar jonno displaySongs() functionerer ekdom last er dike abar call kora hoiche
// and parameter false pass kora hoiche, parameter false houar karone toggleSpinner abar spinner a d-none class add korche
// d-none means display none;

// Uporer kaj ta aaro short cut a kora jay ta niche dekhanu holo

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    // const songs = document.getElementById('lyricContainer'); // lyricContainer a o d-none class add korar mechanism add kora hoiche aikhane
    spinner.classList.toggle('d-none');
    // songs.classList.toggle('d-none');


}

// Ekhon toggleSpinner() function a toggle method ta use kora hoiche, jeta ekbar d-none class remove korbe
// aarekbar d-none class ta add korebe loading-spinner tag e.