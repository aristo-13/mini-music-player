const play_Pausebtn = document.querySelector('.pause-play');
const play = document.querySelector('.fa-play');
const pause = document.querySelector('.fa-pause');
const prevbtn = document.querySelector('.prev');
const nextbtn = document.querySelector('.next');
const repeatbtn = document.querySelector('.repeat');
const shufflebtn = document.querySelector('.shuffle');
const listbtn = document.querySelector('.list');
const progressbar = document.querySelector('.progressbar');
const title = document.querySelector('.title');
const tracks = [
  {title: 'Feel Good by Mohbad',img: '/mini-music-player/images/Mohbad.jpg', url: '/mini-music-player/tracks/Mohbad - Feel Good.mp3' },
  {title: 'Tiff by Mohbad',img: '/mini-music-player/images/Mohbad-dead.webp', url: '/mini-music-player/tracks/Mohbad - Tiff (Official Video).mp3' },
  {title: 'Every Season by Roddy Ricch',img: '/mini-music-player/images/roddy-dec-14.jpg', url: '/mini-music-player/tracks/Roddy Ricch - Every Season.mp3' }
];
const music = document.getElementById('music');
const img = document.querySelector('.poster-img')
let musicIndex = 0;

function loadMusic() {
  if (musicIndex < 0) {
    musicIndex = tracks.length - 1;
  } else if (musicIndex > tracks.length - 1) {
    musicIndex = 0;
  }
  img.src = tracks[musicIndex].img
  title.innerHTML = `<marquee>${tracks[musicIndex].title}</marquee>`;
  music.src = tracks[musicIndex].url;
}

function togglePlayPause() {
  if (music.paused) {
    music.play();
    TrackProgress();
    pause.style.display = 'block';
    play.style.display = 'none';
  } else {
    music.pause();
    play.style.display = 'block';
    pause.style.display = 'none';
  }
}

play_Pausebtn.addEventListener('click', togglePlayPause);

nextbtn.addEventListener('click', () => {
  musicIndex++;
  loadMusic();
  music.play();
  pause.style.display = 'block';
  play.style.display = 'none';
  TrackProgress();
});

prevbtn.addEventListener('click', () => {
  musicIndex--;
  loadMusic();
  music.play();
  pause.style.display = 'block';
  play.style.display = 'none';
  TrackProgress();
});

function TrackProgress(){
  music.addEventListener('timeupdate', (e) => {
    let Duration = e.target.duration;
    let currTime = e.target.currentTime;

    progressbar.max = Math.floor(Duration);
    progressbar.min = 0;
    progressbar.step = 1;
    progressbar.value = currTime;

    if(progressbar.value === progressbar.max) {
      musicIndex++;
      nextbtn.click()
    }
  });
}
listbtn.addEventListener('click', showlist)

function showlist(){
    const playlist = document.querySelector('.playlist')
    const lists = document.querySelector('.lists ul')
     playlist.style.right = '0'

     for(let i = 0; i < tracks.length; i++){
       lists.innerHTML += `
        <li class='song'>🎵 ${tracks[i].title}</li>
       `
     }
    let songs = document.querySelectorAll('.song')
    songs.forEach((song,index) =>{
        song.addEventListener('click', () =>{
        playlist.style.right = '-100%'
        musicIndex = index
        loadMusic()
        music.play()
         })
    })

    let back = document.querySelector('.back')
    back.addEventListener('click', () =>{
        playlist.style.right = '-100%'
    })
}     
loadMusic();
