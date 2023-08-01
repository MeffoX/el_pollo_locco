let canvas;
let world;
let keyboard = new Keyboard();


/**
 * This function initializes the game by setting up the canvas, 
 * initializing the level, creating the game world, and configuring the UI elements.
 * It also sets up the press events for responsiveness.
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel(); //creates all Elements in the game, except character
    setTimeout(() => {
        world = new World(canvas, keyboard);
        applyMuteState();
        responsivePressEvents();
    }, 100);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    placeButtons();
    showSmartControl();
}


function checkSize() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var warningDiv = document.getElementById('warning');

    if (width >= 370 && height >= 220) {
      warningDiv.style.display = 'none';
      document.getElementById('startButton').style.pointerEvents = 'auto';
    } else {
      warningDiv.style.display = 'block';
      document.getElementById('startButton').style.pointerEvents = 'none';
    }
  }

  // Check size on page load and resize
  window.addEventListener('resize', checkSize);
  window.addEventListener('load', checkSize);


/**
 * checks if the screen size is below 800.
 * if this is the case, the panels are displayed
 */
function showSmartControl() {
    if (window.innerWidth < 800) {
        document.getElementById('panel1').classList.remove('d-none');
        document.getElementById('panel2').classList.remove('d-none');
    }
}


/**
 * It place the Buttons during the running Game.
 */
function placeButtons() {
    document.getElementById('bottomButtons').style.position = 'absolute';
    document.getElementById('bottomButtons').style.top = '15px';
    document.getElementById('aboutGame').classList.add('d-none');
    document.getElementById('controlButton').classList.add('d-none');
}


/**
 * This function reloads the page, effectively bringing the user back to the start state of the application.
 */
function backToStart() {
    location.reload();
}


/**
 * This function clears all active intervals in the window.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}


/**
 * Apply the current mute state to all audio elements.
 */
function applyMuteState() {
    audioElements.forEach(audio => {
      audio.muted = isMuted;
    });
  }


// Adding an event listener to the window object that listens for the 'keydown' event.
// This event is fired when a key is pressed down.
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})


// Adding an event listener to the window object that listens for the 'keyup' event.
// This event is fired when a key is released.
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})


/**
 * This function sets up press events for a responsive design. 
 * It calls various functions that handle different types of user input 
 * (going left, going right, jumping up, and throwing a bottle).
 */
function responsivePressEvents() {
    responsiveGoLeft();
    responsiveGoRight();
    responsiveJumpUp();
    responsiveThrowBottle();
}


function responsiveGoLeft() {
    document.getElementById('goLeft').addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
    }, {passive: true});

    document.getElementById('goLeft').addEventListener('touchend', (e) => {
        keyboard.LEFT = false;
    }, {passive: true});
}


function responsiveGoRight() {
    document.getElementById('goRight').addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
    }, {passive: true});

    document.getElementById('goRight').addEventListener('touchend', (e) => {
        keyboard.RIGHT = false;
    }, {passive: true});
}


function responsiveJumpUp() {
    document.getElementById('goJump').addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
    }, {passive: true});

    document.getElementById('goJump').addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
    }, {passive: true});
}


function responsiveThrowBottle() {
    document.getElementById('goThrow').addEventListener('touchstart', (e) => {
        keyboard.D = true;
    }, {passive: true});

    document.getElementById('goThrow').addEventListener('touchend', (e) => {
        keyboard.D = false;
    }, {passive: true});
}