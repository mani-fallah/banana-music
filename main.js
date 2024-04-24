const musicContainer = document.querySelector('.musicContainer')
const play = document.querySelector('#play')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progressContainer')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// song title
const songs = ['16.6-sorena','biTo','Rimaazz']
let songIndex = 2
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
 const progressPercent = (duration*currentTime)/100;
 progress.style.width = `${progressPercent}%`
}
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width) * duration

}
audio.addEventListener('timeUpdate',updateProgress)
progressContainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSong)
