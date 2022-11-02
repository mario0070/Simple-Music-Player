
var outOf= document.getElementById("outOf")
var startTime = document.getElementById("startTime")
var endTime = document.getElementById("endTime")
var musicNames = document.getElementById("musicName")
var artist = document.getElementById("artist")


var wave1 = document.getElementById("wave1")
var wave2 = document.getElementById("wave2")
var wave3 = document.getElementById("wave3")
var wave4 = document.getElementById("wave4")
var wave5 = document.getElementById("wave5")
var wave6 = document.getElementById("wave6")
var wave7 = document.getElementById("wave7")

var img = document.getElementById("img")
var audio = document.getElementById("audio")
var play = document.getElementById("play")
var next = document.getElementById("next")
var roller = document.getElementById("roller")
var body = document.getElementById("body")

var prev = document.getElementById("prev")
var roller = document.getElementById("roller")
var range = document.getElementById("range")
var curr_track = document.createElement("audio")
var volume_slider = document.getElementById("volume_slider")

var isRandom = false
var isplaying = false
var track_index = 0
let updateTimer;


var list = [
    {
        artist : "Asake",
        music : "music/song1.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Joha"
    },
    {
        artist : "Asake",
        music : "music/song2.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Kanipe"
    },
    {
        artist : "Bella Shmurdha",
        music : "music/song3.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Loose it"
    },
    {
        artist : "Asake",
        music : "music/song4.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Yanyan"
    },
    {
        artist : "Asake",
        music : "music/song5.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Organise"
    },
    {
        artist : "Wizkid",
        music : "music/song6.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Joro"
    },
    {
        artist : "Wizkid",
        music : "music/song10.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Reckless"
    },
    {
        artist : "Wizkid",
        music : "music/song9.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Picture_Perfect"
    },
    {
        artist : "Wizkid",
        music : "music/song8.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Matser Groove"
    },
    {
        artist : "Wizkid",
        music : "music/song7.mp3",
        image : "image/IMG_0037.jpeg",
        musicName : "Fever"
    }
]


loadTrack(track_index)

function loadTrack(track_index){
    clearInterval(updateTimer)
    reset()

    curr_track.src = list[track_index].music
    curr_track.load()
    img.src=list[track_index].image
    musicNames.textContent = list[track_index].musicName
    artist.textContent = list[track_index].artist 
    outOf.textContent =  `Playing Music ${track_index + 1} of ${list.length}`
    
    updateTimer = setInterval(setUpdate , 1000)
 
    curr_track.addEventListener("ended",nextTrack)
    random_bg()
    
}

function random_bg(){
    let  hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','c','d','e']
    let a;

    function populate(a){
        for(var i = 0 ; i < 6 ; i++){
            let x = Math.random(Math.round()*14)
            let y = hex[x]
            a += y;
        }
        return a
    }

    let color1 = populate('#')
    let color2 = populate('#')
    let angle = 'to right'

    let gradient =  'linear-gradient(' + angle + ',' + color1 + ',' + color2 + ')';
    document.body.style.background= gradient;
}

function reset(){
    startTime.textContent = "00:00"
    endTime.textContent = "00:00"
    range.value = 0

}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom()
}

function playRandom(){
    isRandom = true
}

function pauseRandom(){
    isRandom = false
}

function repeatTrack(){
    var current_index = track_index
    loadTrack(current_index)
    playTrack();
}

function playPauseTrack(){
    isplaying ? pauseTrack() : playTrack()
}

function playTrack(){
    curr_track.play()
    isplaying = true
    play.innerHTML='<i class="fa-solid fa-pause"></i>'
    roller.classList.add("valid")
    wave1.classList.add("valid")
    wave2.classList.add("valid")
    wave3.classList.add("valid")
    wave4.classList.add("valid")
    wave5.classList.add("valid")
    wave6.classList.add("valid")
    wave7.classList.add("valid")
    body.classList.add("valid")
}

function pauseTrack(){
    curr_track.pause()
    isplaying = false
    play.innerHTML='<i class="fa-solid fa-play"></i>'
    roller.classList.remove("valid")
    roller.classList.remove("valid")
    wave1.classList.remove("valid")
    wave2.classList.remove("valid")
    wave3.classList.remove("valid")
    wave4.classList.remove("valid")
    wave5.classList.remove("valid")
    wave6.classList.remove("valid")
    wave7.classList.remove("valid")
    body.classList.remove("valid")
}

function nextTrack() {
    if(track_index < list.length -1 && isRandom === false){
        track_index += 1
    } else if(track_index < list.length -1 && isRandom === true){
        let random_index=Number.parseInt(Math.random() * list.length);
        track_index = random_index
    }else{
        track_index = 0
    }
    loadTrack(track_index)
    playTrack()
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1
    }else{
        track_index = list.length -1
    }

    loadTrack(track_index)
    playTrack()
}

function seekTo(){
    let seekto = curr_track.duration * (range.value / 100)
    curr_track.currentTime = seekto
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100
}

function setUpdate(){
    let seekPosition = 0
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration)
        range.value = seekPosition

        let currentMinutes = Math.floor(curr_track.currentTime / 60)
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60)
        let durationMinutes = Math.floor(curr_track.duration /60);
        let durationSeconds = Math.floor(curr_track.duration -durationMinutes * 60)

        if(currentSeconds < 10){currentSeconds = '0' + currentSeconds}
        if(durationSeconds < 10){durationSeconds = '0' + durationSeconds}
        if(currentMinutes < 10){currentMinutes = '0' + currentMinutes}
        if(durationMinutes < 10){durationMinutes = '0' + durationMinutes}
        
        startTime.textContent = currentMinutes + ':' + currentSeconds ;
        endTime.textContent = durationMinutes + ':' + durationMinutes
    }
}

var shuffle = document.getElementById("shuffle")
shuffle.addEventListener("click",()=>{
    shuffle.classList.toggle("valid")

})
