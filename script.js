const music = document.querySelector('audio');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playButton = document.getElementById('play');
const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight Disco, Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// CHeck if already Playing
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playButton.classList.replace('fa-play', 'fa-pause');
  playButton.setAttribute('title', 'pause');
  music.play();
}

// Pause
function pauseSong() {
  music.pause();
  playButton.classList.replace('fa-pause', 'fa-play');
  playButton.setAttribute('title', 'play');
  isPlaying = false;
}

// Update the DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// prev function
function prevSong() {
  if (songIndex >= 0) {
    songIndex--;
  }
  if (songIndex < 0) {
    songIndex = 3;
  }
  loadSong(songs[songIndex]);
  console.log(songIndex);
  playSong();
}

// Current Song
let songIndex = 0;

// next function
function nextSong() {
  if (songIndex < 4) {
    songIndex++;
  }
  if (songIndex === 4) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);

  playSong();
}

// Function update Progress bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculatin the Duration in Minutes
    const durationMinutes = Math.floor(duration / 60);
    // Calculating the Seconds out of Duration
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculatin the Duration in Minutes
    const currentMinutes = Math.floor(currentTime / 60);
    // Calculating the Seconds out of Duration
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

// Function -  Click anywhere on the Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const { offsetX } = e;
  const { duration } = music;

  music.currentTime = (offsetX / width) * duration;
  playSong();
}

// Play or Pause Event Listener
playButton.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Event listeners for Playing the next or previous Songs
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Event listener for the Audio Playback
music.addEventListener('timeupdate', updateProgressBar);

// Event Listener for Progress bar
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
