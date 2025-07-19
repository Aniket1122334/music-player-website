console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mpeg");
let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let mastersongname = document.getElementById("mastersongname");
let songitem = Array.from(document.getElementsByClassName("songitem"));
let songplay = Array.from(document.getElementsByClassName("songplay"));

let songs = [
  {
    songName: "Mere Baba",
    filepath: "songs/1.mpeg",
    coverpath: "covers/1.jpg",
  },
  {
    songName: "Govind Bolo",
    filepath: "songs/2.mpeg",
    coverpath: "covers/2.jpg",
  },
  {
    songName: "Ram Aaye Hai",
    filepath: "songs/3.mpeg",
    coverpath: "covers/3.jpg",
  },
  {
    songName: "Bhola Bhandari",
    filepath: "songs/4.mpeg",
    coverpath: "covers/4.jpg",
  },
  {
    songName: "Shiv Mere Hai",
    filepath: "songs/5.mpeg",
    coverpath: "covers/5.jpg",
  },
  {
    songName: "Bajrang Baan",
    filepath: "songs/6.mpeg",
    coverpath: "covers/6.jpg",
  },
  { songName: "Siya Ram", filepath: "songs/7.mpeg", coverpath: "covers/7.jpg" },
  {
    songName: "Shiv Tandav",
    filepath: "songs/8.mpeg",
    coverpath: "covers/8.jpg",
  },
  {
    songName: "Shri Hari Stotram",
    filepath: "songs/9.mpeg",
    coverpath: "covers/9.jpg",
  },
  {
    songName: "Hanuman Chalisa",
    filepath: "songs/10.mpeg",
    coverpath: "covers/10.jpg",
  },
];

// Load song items
songitem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

// Play/Pause master button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myprogressbar.value = progress;
});

// Seek song
myprogressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogressbar.value * audioElement.duration) / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songplay")).forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

// Individual song play buttons
songplay.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    songIndex = i;
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.src = songs[songIndex].filepath;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  });
});

// Next song
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filepath;
  mastersongname.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

// Previous song
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filepath;
  mastersongname.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
