class World  {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarEndboss = new StatusbarEndboss();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];
    isInAir = false;
    audioElements = [];

    /*
    collect_bottle_sound = new Audio('audio/bottle.mp3');
    collect_coin_sound = new Audio('audio/coin.mp3');
    bottle_splash_sound = new Audio('audio/bottlesplash.mp3');
*/

    scoreCoins = 0; //counter which counts the collected coins
    scoreBottles = 0; //counter which counts the collected bottles


/**
 * Constructs a new `World` instance.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas on which the world will be rendered.
 * @param {Object} keyboard - The keyboard object for handling user input.
 */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.addSounds();
    }


/**
 * Add the audios and push it to the audioElements Array.
 */
    addSounds() {
        this.collect_bottle_sound = new Audio('audio/bottle.mp3');
        audioElements.push(this.collect_bottle_sound);

        this.collect_coin_sound = new Audio('audio/coin.mp3');
        audioElements.push(this.collect_coin_sound);

        this.bottle_splash_sound = new Audio('audio/bottlesplash.mp3');
        audioElements.push(this.bottle_splash_sound);
    }


/**
 * Associates the `character` object with the current `World` instance. 
 * It assigns the current `World` instance (`this`) to the `world` property of the `character` object. 
 * This allows the `character` object to interact with or have knowledge of the world it exists in.
 */

    setWorld(){
        this.character.world = this;
    }


/**
 * Handles the primary game loop. Sets an interval that fires every 100 
 * milliseconds. During each interval, it checks for all collisions, 
 * checks the throwable objects, and checks if the game is over.
 */
    run() {
        setInterval(() => {
            this.checkAllCollisions();
            this.checkThrowObjects();
            this.checkGameOver();
        }, 100);
    }


/**
 * Checks all the possible collisions in the game. This method calls several other methods 
 * that each handle a specific type of collision. The specific types of collisions being 
 * checked are: general collisions, collisions with coins, collisions with bottles, 
 * and checks if a thrown bottle has hit something.
 */
    checkAllCollisions() {
        this.checkCollisions();
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkBottleHit();
    }


/**
 * Checks for collisions between the character and each enemy in the game. For each enemy, 
 * it checks if the character is colliding with the enemy.
 * If a collision is detected and the character is above the enemy (character's `y` value is 
 * less than the enemy's `y` value), it decreases the enemy's energy by `100` and checks 
 * if the enemy is dead. If the enemy is dead, it handles the enemy's fall.
 * If the character is not above the enemy or the enemy is not dead, the character is 
 * considered hit and the character's energy is updated in the status bar.
 */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
    
                if (this.character.isAboveGround() && this.character.y < enemy.y) {
                    enemy.energy -= 100;
    
                    if (enemy.isDead && enemy.isDead()) {
                        this.handleFallingEnemy(enemy);
                    }
    
                } else if (!enemy.isDead || (enemy.isDead && !enemy.isDead())) { 
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }



/**
 * Iterates through each throwable object (bottle) and checks if it has hit something 
 * (based on the `hasHit` property of the bottle). If the bottle has not yet hit anything, 
 * it checks for a collision between the bottle and the enemies.
 */
checkBottleHit() {
    this.throwableObjects.forEach((bottle) => {
        if (!bottle.hasHit) {
            this.checkBottleEnemyCollision(bottle);
        }
    });
}


/**
 * Checks whether a throwable bottle has collided with any enemy in the game. 
 * This method iterates over all the enemies in the current level, checking 
 * if each enemy is colliding with the passed bottle. If a collision is 
 * detected, it invokes a method to handle the collision between the bottle 
 * and the enemy.
 * 
 * @param {Object} bottle - The throwable bottle object to check for collisions.
 */
checkBottleEnemyCollision(bottle) {
    this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(bottle)) {
            this.bottle_splash_sound.play();
            this.handleBottleEnemyCollision(bottle, enemy);
        }
    });
}


/**
 * Handles what happens when a throwable bottle collides with an enemy. 
 * 
 * When a collision occurs, the `hasHit` attribute of the bottle is set to `true`, 
 * indicating that it has made contact. The energy of the enemy is then reduced 
 * by `100` units. A percentage representing the current energy level of the enemy 
 * (relative to a max of `500`) is then calculated and updated on the `statusBarEndboss`.
 * 
 * The method then calls `animateSplashOrHurt` to handle visual aspects of the collision. 
 * If the enemy's energy is `0` or less (indicating the enemy has been defeated), 
 * it calls `handleFallingEnemy` to manage the enemy's fall.
 * 
 * @param {Object} bottle - The throwable bottle that has collided with an enemy.
 * @param {Object} enemy - The enemy that the bottle has collided with.
 */
handleBottleEnemyCollision(bottle, enemy) {
    bottle.hasHit = true;
    enemy.energy -= 100;
    let percentage = (enemy.energy / 500) * 100;
    this.statusBarEndboss.setPercentage(percentage);
    this.animateSplashOrHurt(bottle, enemy);
    if (enemy.energy <= 0) {
        this.handleFallingEnemy(enemy);
    }
}


/**
 * Animates the visual effects when a throwable bottle collides with an enemy. 
 * If the bottle hits an instance of the `Endboss` class, the enemy will perform a 
 * `getHurt` animation. For all other types of enemies, the bottle will perform the 
 * `animateBottleSplash` animation.
 * 
 * @param {Object} bottle - The throwable bottle that has collided with an enemy.
 * @param {Object} enemy - The enemy that the bottle has collided with.
 */
animateSplashOrHurt(bottle, enemy) {
    bottle.animateBottleSplash();
    if (enemy instanceof Endboss) {
        enemy.getHurt();
    } else {
        bottle.animateBottleSplash();
    }
}

    
/**
 * Removes a specified throwable object from the collection of throwable objects
 * in the game world.
 * It first finds the index of the specified object within the array of throwable
 * objects. It then removes that object from the array using the splice method.
 * 
 * @param {Object} bottle - The throwable object (bottle) to be removed.
 */
removeThrowableObject(bottle) {
    let index = this.throwableObjects.indexOf(bottle);
    this.throwableObjects.splice(index, 1);
}


/**
 * Manages the fall of an enemy character when it has been defeated. 
 * If the enemy is not already falling, it sets `isFalling` to `true` and starts 
 * a falling animation, causing the enemy to move downward every 70 milliseconds. 
 * The falling animation stops when the enemy's vertical position (`y`) reaches 
 * or surpasses `480`. At this point, the enemy is removed from the `level.enemies` 
 * array and the game checks if the game is over by calling the `checkGameOver` method.
 * 
 * @param {Object} enemy - The enemy character that is falling.
 */
handleFallingEnemy(enemy) {
    if (enemy.isFalling) {
        return;
    }
    enemy.isFalling = true;
    let fallingInterval = setInterval(() => {
        enemy.y += 10;
        if (enemy.y >= 480) {
            clearInterval(fallingInterval);

            let index = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(index, 1);
            this.checkGameOver();
        }
    }, 70);
}


/**
 * Checks for and handles collisions between the player's character and 
 * any coins in the game world.
 *  If it detects a collision between the character and a coin, it calls the 
 * `removeCoin` method to remove the coin from the game world and increments 
 * the `scoreCoins` attribute by one, indicating that the player has collected a coin.
 */
checkCoinCollision() {
    this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
            this.collect_coin_sound.play();
            this.removeCoin(coin);
            this.scoreCoins += 1;
        }
    })
}


/**
 * Removes a specified coin from the level's array of coins. 
 * It first finds the index of the specified coin within the array of coins. 
 * It then removes that coin from the array using the splice method.
 * 
 * @param {Object} coin - The coin to be removed.
 */
removeCoin(coin) {
    let index = this.level.coins.indexOf(coin);
    this.level.coins.splice(index, 1);
}


/**
 * Checks for and handles collisions between the player's character and 
 * any bottle in the game world.
 *  If it detects a collision between the character and a bottle, it calls the 
 * `removeBottle` method to remove the bottle from the game world and increments 
 * the `scoreBottles` attribute by one, indicating that the player has collected a bottle.
 */
checkBottleCollision() {
    this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
            this.collect_bottle_sound.play();
            this.removeBottle(bottle);
            this.scoreBottles += 1;
        }
    })
}


/**
 * Removes a specified bottle from the level's array of bottles. 
 * It first finds the index of the specified bottle within the array of bottles. 
 * It then removes that bottle from the array using the splice method.
 * 
 * @param {Object} bottle - The bottle to be removed.
 */
removeBottle(bottle) {
    let index = this.level.bottles.indexOf(bottle);
    this.level.bottles.splice(index, 1);
}


/**
 * Checks for a key press to trigger throwing an object. 
 * If the "D" key is pressed, this method creates a new `ThrowableObject` 
 * at the character's current position offset by 100 in both x and y directions. 
 * The new object is then added to the `throwableObjects` array.
 */
checkThrowObjects() {
    if (this.keyboard.D) {
        let bottle = new ThrowableObject(this.character.x +100, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }
}


/**
 * Checks the condition for throwing a bottle and performs the throw if necessary.
 * If the character wants to throw a bottle (determined by the `wantThrowBottle` method), 
 * this method will create a new `ThrowableObject` (a bottle). If the character is facing the other 
 * direction, the bottle is created at the character's current x-position and y-position offset by 100.
 * Otherwise, it is created at the character's current x and y positions offset by 100.
 * The new bottle is then added to the `throwableObjects` array, the score of bottles is decreased, and 
 * a method to stop or continue the throw is called. Finally, it determines when the next bottle will be thrown.
 */
checkThrowObjects() {
    if (this.wantThrowBottle()) {
        let bottle;
        this.isInAir = true;
        if (this.character.otherDirection == true) {
            bottle = new ThrowableObject(this.character.x, this.character.y + 100);
            bottle.otherDirection = true;
        } else
            bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.scoreBottles -= 1;
        bottle.setOrStopIntervalBottle(this.throwableObjects);
        this.throwNextBottle();
    }
}

    
/**
 * Sets a delay before the next bottle can be thrown.
 * This method starts a timer that waits for 500 milliseconds (half a second) 
 * before setting the `isInAir` flag back to `false`, allowing the next bottle to be thrown.
 */
throwNextBottle() {
    setTimeout(() => {
        this.isInAir = false;
    }, 500);
}
    
   
/**
 * Determines if the character wants to throw a bottle.
 * The character wants to throw a bottle if the "D" key is pressed, there are bottles left to throw 
 * (as indicated by `scoreBottles` being more than 0), and there is not currently a bottle in the air 
 * (as indicated by `isInAir` being `false`).
 * 
 * @returns {Boolean} - `true` if the character wants to throw a bottle, `false` otherwise.
 */
wantThrowBottle() {
    return this.keyboard.D && this.scoreBottles > 0 && !this.isInAir
}


/**
 * Draws all elements of the game world in the canvas.
 * The canvas is initially cleared. Then, the various components of the game world are drawn 
 * onto the canvas in layers: first the background, then the fixed objects, and finally the moving objects. 
 * The drawing process is set to continue with the `continueDrawing` method.
 */
draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackgroundObjects();
    this.drawFixedObjects();
    this.drawMovingObjects();

    this.continueDrawing();
}


/**
 * Draws the background objects of the game world.
 * Translates the canvas according to the current camera position, adds the background objects 
 * to the map using `addObjectsToMap`, and then translates the canvas back.
 */
drawBackgroundObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
}


/**
 * Draws the fixed objects of the game world.
 * The status bars, character score, and the camera translation are handled here.
 */
drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarBottle);
    this.character.drawScore(this.ctx, this.scoreCoins, this.scoreBottles);
    this.ctx.translate(this.camera_x, 0);
}


/**
 * Draws the moving objects of the game world.
 * The character, clouds, enemies, coins, bottles, and throwable objects are added to the map. 
 * The canvas is then translated back according to the current camera position.
 */
drawMovingObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
}


/**
 * Continues drawing the game world in the canvas.
 * This method recursively calls the `draw` method in a loop using the `requestAnimationFrame` function, 
 * creating a continuous rendering loop. This keeps the game world updating and animating.
 */
continueDrawing() {
    let self = this;
    requestAnimationFrame(function() {
        self.draw();
    });
}


/**
 * Adds multiple objects to the game map.
 * Iterates over an array of game objects, adding each one to the game map using the `addToMap` method.
 * 
 * @param {Array} objects - An array of game objects to be added to the game map.
 */
addObjectsToMap(objects){
  objects.forEach((o) => {
      this.addToMap(o);
})
}


/**
 * Adds a single object to the game map.
 * This method handles the drawing of the game object to the game map. If the object is moving in the 
 * other direction, it first flips the object's image, then draws the object and its frame, and finally 
 * flips the image back. If the object is not moving in the other direction, it simply draws the object 
 * and its frame.
 * 
 * @param {Object} mo - The game object to be added to the game map.
 */
addToMap(mo) {
    if (mo.otherDirection) {
        this.flipImage(mo);
    }
    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx);
    
    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }
}


/**
 * Flips the image of a game object horizontally.
 * This method is used when the object is moving in the opposite direction. It saves the current drawing state,
 * translates the drawing to the right by the width of the game object, and then flips the drawing context
 * horizontally. It also updates the x-coordinate of the game object to reflect the direction of movement.
 * 
 * @param {Object} mo - The game object whose image is to be flipped.
 */
flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}


/**
 * Restores the original state of the image of a game object.
 * This method is used after the flipped image of a game object has been drawn to the map. It first reverts the 
 * changes made to the x-coordinate of the game object in the `flipImage` method, and then restores the drawing 
 * context to its original state by calling the `restore` method.
 * 
 * @param {Object} mo - The game object whose image is to be restored.
 */
flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
}


/**
 * Checks the game's over condition.
 * This method is called periodically in the game loop to check if the game is over. The game ends if the character
 * is dead or if any enemy is an instance of Endboss and is dead. When the game is over, it shows the game over 
 * screen and clears all intervals in the game.
 */
checkGameOver() {
    if (this.character.isDead() || this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.isDead())) {
        this.showGameOverScreen();
        clearAllIntervals();
    }
}
    

/**
 * Displays the Game Over screen.
 * This method show the Game Over screen and exit Fullscreen when the game ends.
 * It first hides the panels and canvas by adding the 'd-none' class.
 * It then selects the Game Over screen by its ID, and removes the 'd-none' class, effectively making it visible.
 */
showGameOverScreen() {
    document.getElementById('panel1').classList.add('d-none');
    document.getElementById('panel2').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('bottomButtons').classList.add('d-none');
    
    let gameOverScreen = document.getElementById('gameOver');
    gameOverScreen.classList.remove('d-none');
}
    
}






