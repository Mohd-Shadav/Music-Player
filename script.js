
let song = document.querySelector(".song");
let playBtn = document.querySelector(".play");
let progress = document.querySelector(".rangeType");
let currTime = document.querySelector(".currTime");
let durTime = document.querySelector(".durTime");
let picCont = document.querySelector(".picCont");
let playList = document.querySelector(".fa-layer-group");
let picNameCont = document.querySelector(".picNameCont");
let controls = document.querySelector(".controls");
let backBtn = document.querySelector(".fa-circle-chevron-left");
let selectedMusic = document.querySelector(".selectMusic");
let musicInput = document.querySelector("#music-input");
let plusBtn = document.querySelector(".plusButton");
let musicList = document.querySelector("#music-list");
let noMusic = document.querySelector(".nomusic");
let title = document.querySelector(".titleSong");
let backward = document.querySelector(".backward");
let forward = document.querySelector(".forward");
let mainTitle = document.querySelector(".playerName");
let arr = [];
selectedMusic.style.display = "none";





song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}



function progressRun(){ 
    setInterval(() => {
        progress.value = song.currentTime;
        let seconds = Math.floor(song.currentTime % 60);
        let minutes = Math.floor(song.currentTime / 60);

        currTime.innerHTML = `${minutes}:${seconds}`;
        let seconds2 = Math.floor(song.duration % 60);
        let minutes2 = Math.floor(song.duration / 60);

        durTime.innerHTML = `${minutes2}:${seconds2}`;

        if (minutes === minutes2 && seconds === seconds2) {
            playBtn.classList.add("fa-circle-play");
            playBtn.classList.remove("fa-circle-pause");

        }
    }, 1000);
}



function playPause(){
    if(playBtn.classList.contains("fa-circle-pause")) {
        playBtn.classList.add("fa-circle-play");
        playBtn.classList.remove("fa-circle-pause");
        picCont.classList.remove("imageRotating");
        song.pause();
    } else {
        playBtn.classList.add("fa-circle-pause");
        playBtn.classList.remove("fa-circle-play");
        picCont.classList.add("imageRotating");
        song.play();     
        progressRun();
    }
}



playBtn.addEventListener("click", playPause);


function changingTrack() {
    song.currentTime = progress.value;
}

progress.addEventListener("change", changingTrack);



playList.addEventListener("click", () => {

    picNameCont.style.display = "none";
    controls.style.display = "none";
    selectedMusic.style.display = "flex";
    mainTitle.innerHTML = `Create Playlist`;
    plusBtn.addEventListener("click",(e)=>{
    musicInput.click();
  
    
    
  
    
    });

});


backBtn.addEventListener("click", () => {
    picNameCont.style.display = "flex";
    controls.style.display = "flex";
    selectedMusic.style.display = "none";
    mainTitle.innerHTML = `Music Player`;
});

let currentSongIndex = 0;
musicInput.addEventListener("change",(e,idx)=>{
Array.from(e.target.files).forEach((file, index) => {
if(!arr.some(music => music.name === file.name))
{


let nameMusic = document.createElement("h3");
nameMusic.innerHTML = `${file.name}`;
nameMusic.classList.add("musicNames");

musicList.appendChild(nameMusic);


arr.push({ name: file.name, file: file });

localStorage.setItem("musicItem",musicList.innerHTML);


// Add click event listener to each song name
nameMusic.addEventListener("click", () => {
    
    let index = arr.findIndex(music => music.name === file.name); // 
    playSong(index);
    
});
 
// if end the music then


}
});
if(arr.length>0){
noMusic.remove();
}

let currentSongIndex = 0; // To keep track of the current song index

function playSong(index) {
currentSongIndex = index;
let songData = arr[index];
song.src = URL.createObjectURL(songData.file);
song.play();
playBtn.classList.add("fa-circle-pause");
playBtn.classList.remove("fa-circle-play");
picCont.classList.add("imageRotating");
title.innerHTML = `${songData.name}`;
progressRun();
}

// Event listener for when the song ends
song.addEventListener("ended", () => {
// Check if there is a next song in the playlist
if (currentSongIndex < arr.length - 1) {
playSong(currentSongIndex + 1); // Play the next song
playBtn.classList.add("fa-circle-pause");
playBtn.classList.remove("fa-circle-play");
} else {
// If no more songs, reset play button and animation
playBtn.classList.add("fa-circle-play");
playBtn.classList.remove("fa-circle-pause");
picCont.classList.remove("imageRotating");
}
});

backward.addEventListener("click",()=>{
if(currentSongIndex>0)
{
playSong(currentSongIndex-1);
}
})

forward.addEventListener("click",()=>{
if(currentSongIndex<arr.length-1)
{
playSong(currentSongIndex+1);

}
})



})







  
