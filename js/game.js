let canvas;
let world;
let keyboard = new Keyboard();


/**
 * This function initializes the game by setting up the canvas, 
 * initializing the level, creating the game world, and configuring the UI elements.
 * It also sets up the press events for responsiveness.
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel(); //creates all Elements in the game, except character
    setTimeout(() => {
        world = new World(canvas, keyboard);
    }, 100);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('panel1').classList.remove('d-none');
    document.getElementById('panel2').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');

    responsivePressEvents();
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
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('goLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}


function responsiveGoRight() {
    document.getElementById('goRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('goRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}


function responsiveJumpUp() {
    document.getElementById('goJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('goJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}


function responsiveThrowBottle() {
    document.getElementById('goThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('goThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}