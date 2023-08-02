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
 * Makes an HTML element visible by changing its display style to 'flex'.
 * @param {string} elementId - The ID of the HTML element to make visible.
 */
function showElement(elementId) {
  document.getElementById(elementId).style.display = 'flex';
}


/**
 * Hides an HTML element by changing its display style to 'none'.
 * @param {string} elementId - The ID of the HTML element to hide.
 */
function hideElement(elementId) {
  document.getElementById(elementId).style.display = 'none';
}


/**
 * Hides the start button by adding 'd-none' class to it.
 */
function hideStartButton() {
  document.getElementById('startButton').classList.add('d-none');
}


/**
 * Makes the start button visible by removing 'd-none' class from it.
 */
function showStartButton() {
  document.getElementById('startButton').classList.remove('d-none');
}


/**
 * Makes the bottom buttons visible by removing 'd-none' class from them.
 */
function showBottomButtons() {
  document.getElementById('bottomButtons').classList.remove('d-none');
}


/**
 * Shows the game information and hides the start button.
 */
function aboutGame() {
  showElement('gameInfo');
  hideStartButton();
}


/**
 * Hides the game information and makes the start button and bottom buttons visible.
 */
function closeAboutGame() {
  hideElement('gameInfo');
  showStartButton();
  showBottomButtons();
}


/**
 * Shows the game controlling guide and hides the start button.
 */
function openControlling() {
  showElement('controlling');
  hideStartButton();
}


/**
 * Hides the game controlling guide and makes the start button and bottom buttons visible.
 */
function closeControlling() {
  hideElement('controlling');
  showStartButton();
  showBottomButtons();
}
