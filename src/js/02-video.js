//podpunkt 2
import Player from '@vimeo/player';
import _ from 'lodash';

//podpunkt 3-done
// Select with the DOM API
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

//podpunkt 7 - definicja
const persistTimeThrottled = _.throttle(seconds => {
  //podpunkt 5-done
  localStorage.setItem('videoplayer-current-time', seconds);
}, 1000);

//podpunkt 4
// timeupdate

// Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser.

// {
//     duration: 61.857
//     percent: 0.049
//     seconds: 3.034 <- tyle sekund filmu upłynęło
// }
player.on('timeupdate', data => {
  // data is an object containing properties specific to that event
  // podpunkt 7 - uzycie
  persistTimeThrottled(data.seconds);
});

//podpunkt 6
const timeFromLocalStorage = localStorage.getItem('videoplayer-current-time');
player
  .setCurrentTime(timeFromLocalStorage)
  .then(function (seconds) {
    console.log('Film załadowany na: ', seconds, ' sekundzie');
  })
  .catch(function (error) {
    console.error(error);
  });
