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
        world.initBackgroundMusic();
        applyMuteState();
        responsivePressEvents();
    }, 100);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    placeButtons();
    showSmartControl();
}


/**
 * Checks the size of the window and toggles visibility of the warning message and the ability to click the start button.
 * If the size of the window is less than 370x220, it displays a warning message and disables the start button.
 * If the size of the window is greater or equal to 370x220, it hides the warning message and enables the start button.
 * It also binds itself to window 'resize' and 'load' events, so it's executed when the window is resized or the page is loaded.
 */
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
 * Detects the orientation of the device and toggles the visibility of an element with the id 'mobileRotation'.
 * If the orientation is portrait, the element is displayed. 
 * If the orientation is landscape, the element is hidden.
 * It also binds itself to window 'resize' event, so it's executed when the window is resized.
 */
  function detectPhonePosition() {

    if (window.matchMedia("(orientation: portrait)").matches) {
        // Portrait mode
        this.document.getElementById('mobileRotation').style.display = 'flex';
    }

    window.addEventListener("resize", function () {
        if (window.matchMedia("(orientation: landscape)").matches) {
            // Landscape mode
            this.document.getElementById('mobileRotation').style.display = 'none';
        } else {
            // Portrait mode
            this.document.getElementById('mobileRotation').style.display = 'flex';

        }
    });
}


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


/**
 *  Adding an event listener to the window object that listens for the 'keydown' event.
 *  This event is fired when a key is pressed down.
 */
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

/**
 *Adding an event listener to the window object that listens for the 'keyup' event.
 *This event is fired when a key is released.
 */
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
    const goLeftElement = document.getElementById('goLeft');

    goLeftElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    }, {passive: false});

    goLeftElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, {passive: false});

    goLeftElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}


function responsiveGoRight() {
    const goRightElement = document.getElementById('goRight');

    goRightElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    }, {passive: false});

    goRightElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, {passive: false});

    goRightElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}


function responsiveJumpUp() {
    const goJumpElement = document.getElementById('goJump');

    goJumpElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    }, {passive: false});

    goJumpElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    }, {passive: false});

    goJumpElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}


function responsiveThrowBottle() {
    const goThrowElement = document.getElementById('goThrow');

    goThrowElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    }, {passive: false});

    goThrowElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    }, {passive: false});

    goThrowElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}
