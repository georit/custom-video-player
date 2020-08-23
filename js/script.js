/* ========== Variables ========= */
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const expandVideo = document.getElementById('expand-video');

/* ========== Functions ========= */
// Play and pause
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

// Play/pause with the spacebar
function spacebarPlayOrPause() {
    document.addEventListener('keydown', e => {
        if (e.keyCode === 32) {
            toggleVideoStatus();
        }
    });
};

// Update play/pause icon
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play-circle fa-3x"></i>';
    } else {
        play.innerHTML = '<i class="fas fa-pause-circle fa-3x"></i>';
    }
};

// Update progress and timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }

    // Get seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }

    timestamp.innerHTML = `${minutes}:${seconds}`;

};

// Set video time to progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
};

// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
};

// Toggle fullscreen
function toggleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        /* IE/Edge */
        video.msRequestFullscreen();
    }
};

/* ========== Event Listeners ========= */
video.addEventListener('mouseover', spacebarPlayOrPause);

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

expandVideo.addEventListener('click', toggleFullscreen);