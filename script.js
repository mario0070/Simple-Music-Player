
var outOf= document.getElementById("outOf")
var startTime = document.getElementById("startTime")
var endTime = document.getElementById("endTime")
var musicNames = document.getElementById("musicName")
var artist = document.getElementById("artist")
var img = document.getElementById("img")
var audio = document.getElementById("audio")
var play = document.getElementById("play")
var next = document.getElementById("next")
var prev = document.getElementById("prev")
var roller = document.getElementById("roller")
var wave1 = document.getElementById("wave1")
var wave2 = document.getElementById("wave2")
var wave3 = document.getElementById("wave3")
var wave4 = document.getElementById("wave4")
var wave5 = document.getElementById("wave5")
var wave6 = document.getElementById("wave6")
var wave7 = document.getElementById("wave7")

var list = [
    {
        artist : "Asake",
        music : "music/song1.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Joha"
    },
    {
        artist : "David",
        music : "music/song2.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Kanipe"
    }
]

play.addEventListener("click",playSong)
next.addEventListener("click",()=>changeMusic())
prev.addEventListener("click",()=>changeMusic(false))

initPlayer()

function initPlayer(){
    curr_index  = 0
    next_index = curr_index + 1
    updatePlayer()
}

function updatePlayer(){
    song = list[curr_index]
    next = list[next_index]
    musicNames.innerHTML = song.musicName
    artist.innerText = song.artist
    img.src = song.image
    outOf.innerHTML =  `Playing Music ${curr_index + 1} of ${list.length}`
    audio.src = song.music
}

function playSong(){
    if(audio.paused){
        audio.play()
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
        roller.classList.toggle("valid")
        wave1.classList.add("valid")
        wave2.classList.add("valid")
        wave3.classList.add("valid")
        wave4.classList.add("valid")
        wave5.classList.add("valid")
        wave6.classList.add("valid")
        wave7.classList.add("valid")
    }else{
        audio.pause()
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
        roller.classList.remove("valid")
        wave1.classList.remove("valid")
        wave2.classList.remove("valid")
        wave3.classList.remove("valid")
        wave4.classList.remove("valid")
        wave5.classList.remove("valid")
        wave6.classList.remove("valid")
        wave7.classList.remove("valid")
    }

}

function changeMusic(next=true){
    if(next && audio.paused){
        curr_index ++;
        next_index = curr_index + 1

        if(curr_index > list.length - 1){
            curr_index = 0
            next_index = curr_index + 1
        }

        if(next_index > list.length - 1){
            next_index = 0
        } 

    }
    else{
        curr_index --;
        next_index = curr_index + 1

        if(curr_index < 0){
            curr_index = list.length - 1
            next_index = 0
        }

    }

    playSong()
    updatePlayer()
}