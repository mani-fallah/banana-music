const musicContainer = document.querySelector('.musicContainer')
const play = document.querySelector('#play')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progressContainer')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const  body = document.getElementsByTagName('body')[0]
const addMusicInput = document.getElementById('addMusicInput')
// song title
const songs = ['16.6-sorena','Rimaazz','Andy - Dokhtar Irooni']
let songIndex = 0
loadSong(songs[songIndex])

// load song from dom
function loadSong(song) {
    title.innerHTML = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}
function playSong()
{
musicContainer.classList.add('play');
play.querySelector('i.fas').classList.remove('fa-pause')
play.querySelector('i.fas').classList.add('fa-play');
audio.play();


}

function pauseSong()
{
musicContainer.classList.remove('play')
 play.querySelector('i.fas').classList.remove('fa-play')
 play.querySelector('i.fas').classList.add('fa-pause');
audio.pause()
}

// add events
play.addEventListener('click', ()=>{
    let isPlaying = musicContainer.classList.contains('play')
    if (!isPlaying)
    {
        playSong()
    }
    else {
        pauseSong()
    }
})

// change song
prev.addEventListener('click',prevSong)
next.addEventListener('click',nextSong)

function prevSong()
{
    songIndex--;
    if (songIndex<0)
    {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong()
{
    songIndex++;
    if (songIndex> songs.length-1)
        songIndex = 0;

    loadSong(songs[songIndex])
    playSong()
}

// progress bar
function updateProgress(e)
{
 let {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
 progress.style.width = `${progressPercent}%`
}
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width) * duration

}
audio.addEventListener("timeupdate",updateProgress)
progressContainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSong)


// change mode
function changeMode()
{
    if(mode.classList.contains('fa-sun')){
        mode.classList.remove('fa-sun');
        mode.classList.add('fa-moon');
        mode.style.color = 'white';
        modeBtn.style.border = 'none';
        console.log("night");
        body.style.backgroundImage = "linear-gradient(0deg,gray 23.8%,black 92%";
        Name.style.color = 'yellow';
        musicContainer.style.backgroundColor = 'black'
        play.style.backgroundColor = 'black'
        prev.style.backgroundColor = 'black'
        next.style.backgroundColor = 'black'
        cover.style.border= '2px solid white'
    }
    else {
        mode.classList.add('fa-sun');
        mode.classList.remove('fa-moon');
        mode.style.color = 'black';
        modeBtn.style.border = 'none';
        console.log("day")
        body.style.backgroundImage = "linear-gradient(0deg,white 23.8%,#ffff6f 92%)"
        Name.style.color = 'black'
        musicContainer.style.backgroundColor = 'white'
        play.style.backgroundColor = 'white'
        prev.style.backgroundColor = 'white'
        next.style.backgroundColor = 'white'
        cover.style.border= '2px solid black'

    }
}

const mode = document.querySelector('.modeIcon')
mode.addEventListener('click',changeMode)

const modeBtn = document.querySelector('.modeBtn')
const Name= document.querySelector('.Name')

// add music
function addMusic()
{
    let output = addMusicInput.value
    console.log(output)
    songs.push(output)
    localStorage.setItem(songs)
}
