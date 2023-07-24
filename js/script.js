let isMuted = false;

let audioElements = Array.from(document.getElementsByTagName('audio'));

function toggleAudio() {
  let audioIcon = document.getElementById('soundButton');
  if (!isMuted) {
    audioIcon.style.backgroundImage = "url('img/icons/mute.png')";
    audioElements.forEach(audio => {
      audio.muted = true;
    });
    isMuted = true;
  } else {
    audioIcon.style.backgroundImage = "url('img/icons/volume.png')";
    audioElements.forEach(audio => {
      audio.muted = false;
    });
    isMuted = false;
  }
}


/**
 * Function to show the game information and hide the start button and bottom buttons.
 */
function aboutGame() {
  document.getElementById('gameInfo').style.display = 'flex';
  document.getElementById('startButton').classList.add('d-none');
  document.getElementById('bottomButtons').classList.add('d-none');
}


/**
* Function to hide the game information and show the start button and bottom buttons.
*/
function closeAboutGame() {
  document.getElementById('gameInfo').style.display = 'none';
  document.getElementById('startButton').classList.remove('d-none');
  document.getElementById('bottomButtons').classList.remove('d-none');
}


/**
* Function to show the game controlling guide and hide the start button and bottom buttons.
*/
function openControlling() {
  document.getElementById('controlling').style.display = 'flex';
  document.getElementById('startButton').classList.add('d-none');
  document.getElementById('bottomButtons').classList.add('d-none');
}


/**
* Function to hide the game controlling guide and show the start button and bottom buttons.
*/
function closeControlling() {
  document.getElementById('controlling').style.display = 'none';
  document.getElementById('startButton').classList.remove('d-none');
  document.getElementById('bottomButtons').classList.remove('d-none');
}


/**
* Function to enter fullscreen mode and modify the canvas, start screen, and outro screen dimensions to fill the entire viewport.
*/
function fullscreen() {
  let fullscreen = document.getElementById('startScreen');
  enterFullscreen(fullscreen);
  showFullScreenCanvasAndGameOver();
}


/**
* Function to modify the canvas, start screen, and outro screen dimensions to fill the entire viewport and hide the h1 element.
*/
function showFullScreenCanvasAndGameOver() {
  document.getElementById('canvas').style.width = '100vw';
  document.getElementById('canvas').style.height = '100vh';
  document.getElementById('fullStartscreen').style.width = '100vw';
  document.getElementById('fullStartscreen').style.height = '100vh';
  document.getElementById('outro').style.width = '100vw';
  document.getElementById('outro').style.height = '100vh';
  document.querySelector('h1').style.display = 'none';
}


/**
* Function to enter fullscreen mode for a specific HTML element.
* @param {HTMLElement} element - The HTML element to be displayed in fullscreen mode.
*/
function enterFullscreen(element) {
  if(element.requestFullscreen) {
      element.requestFullscreen();
  } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
  }
}


/**
* Function to exit fullscreen mode.
*/
function exitFullscreen() {
  if(document.exitFullscreen) {
      document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  }
}
