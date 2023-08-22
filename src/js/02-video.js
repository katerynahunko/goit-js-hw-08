import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const videoPlayer = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';

const saveTime = throttle((time) => {
    localStorage.setItem(localStorageKey, JSON.stringify(time));
}, 1000);

videoPlayer.on('timeupdate', (data) => {
    const time = data.seconds;
    saveTime(time);
});

document.addEventListener('DOMContentLoaded', () => {
    const time = JSON.parse(localStorage.getItem(localStorageKey));
    if (time) {
        videoPlayer.setCurrentTime(time);
    }
});

// localStorage.clear();