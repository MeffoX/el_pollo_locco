let isMuted = false;
let audioElements = [];


/**
 * Switch with onclick on the soundButton the image und mutes the Game.
 */
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