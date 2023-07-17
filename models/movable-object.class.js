class MovableObject extends DrawableObject {
    speed = 0.20;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    hasSoundPlayed = false;
    
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }


/**
 * Simulates the effect of gravity on the object. An interval is set to update 
 * every 40 milliseconds. In each update, if the object is above the ground or 
 * if its vertical speed (`speedY`) is greater than 0, it subtracts `speedY` from the 
 * `y` coordinate of the object (likely moving it downwards) and then decreases 
 * `speedY` by the `acceleration` property, simulating the acceleration due to gravity.
 */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


/**
 * Checks if the instance is of type `ThrowableObject` or if its `y` coordinate 
 * is less than 160. If either of these conditions is true, it returns `true`; 
 * otherwise, it returns `false`. This method could be used to check if the object 
 * is considered to be above the ground level in the application's context.
 *
 * @returns {boolean} - `true` if the object is a `ThrowableObject` or if its `y` coordinate is less than 160, `false` otherwise.
 */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 160;
        }
    }


/**
 * Handles the animation for the object by cycling through a given array of images.
 * It calculates the current image index by calculating the remainder when `this.currentImage` 
 * is divided by the length of the `images` array, which allows for cycling through 
 * the `images` array. It then retrieves the path of the image, loads it into the `img` 
 * property of the object from the `imageCache`, and increments `currentImage`.
 *
 * @param {Array} images - The array of image paths to cycle through for the animation.
 */
    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % 6; // i = 0, 1, 2, 3, 4, 5, 6, 1, 2, 3, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


/**
 * Handles the movement of the object to the right. It increases the `x` 
 * coordinate of the object by the value of `this.speed` (likely moving the 
 * object to the right). It also sets the `otherDirection` property to `false` 
 * and plays the `walking_sound`.
 */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }

    
/**
 * Handles the movement of the object to the left. It subtracts the value of `this.speed` 
 * from the `x` coordinate of the object (likely moving the object to the left).
 */
    moveLeft(){
            this.x -= this.speed;
    }


/**
 * Handles the jumping action of the object. It sets the `speedY` property 
 * of the object to `25`, which likely initiates an upward movement or jump 
 * of the object, depending on the rest of the implementation.
 */
    jump(){
        this.speedY = 25;
    }

  
/**
 * Determines whether the object is colliding with another object, `obj`. 
 * It uses a rectangular collision detection algorithm, which checks if the 
 * rectangles representing the two objects overlap on both the x and y axes. 
 * The dimensions of the rectangles are adjusted by the respective offsets of 
 * the objects.
 * 
 * @param {Object} obj - The object to check for a collision with.
 * @returns {boolean} - `true` if the object is colliding with `obj`, `false` otherwise.
 */
    isColliding(obj) {
        return (this.x + this.width) - this.offset.right > obj.x + obj.offset.left &&
            (this.y + this.height) - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width + obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height + obj.offset.bottom;
    }


/**
 * Handles the situation when the object takes a hit. It reduces the `energy` 
 * property of the object by `5`. If this results in `energy` becoming negative, 
 * it's reset to `0`. If `energy` is still greater than `0`, the `lastHit` 
 * property is updated with the current timestamp.
 */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


/**
 * Determines whether the object is hurt. The object is considered hurt if 
 * the last hit happened less than 1 second ago.
 *
 * @returns {boolean} - `true` if the last hit happened less than 1 second ago, `false` otherwise.
 */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }


/**
 * Determines whether the object is dead. The object is considered dead if 
 * its `energy` is `0`.
 *
 * @returns {boolean} - `true` if the `energy` of the object is `0`, `false` otherwise.
 */
    isDead() {
        return this.energy == 0;
    }



}



