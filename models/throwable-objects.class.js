class ThrowableObject extends MovableObject {
    speedX = 20;
    colliding = false;
    isAnimating;

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    bottle_splash_sound = new Audio('audio/bottlesplash.mp3');


    /**
     * Constructs an instance of ThrowableObject. Loads specific and multiple images, 
     * sets the initial x and y coordinates, sets the initial height and width, 
     * and initiates a throw.
     * @param {number} x - The initial x-coordinate for this object.
     * @param {number} y - The initial y-coordinate for this object.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }


/**
 * Controls the throw behavior of the object. Checks the direction of the throw, 
 * applies gravity, and after a delay of 80 milliseconds, checks if the object is 
 * still animating. If not, it checks for collision. If a collision is detected, 
 * it triggers a bottle splash animation, otherwise, the bottle is made to 
 * disappear from the screen. The function calls itself recursively to create 
 * a continuous effect.
 */
throw() {
    this.checkDirectionThrowBottle();
    this.applyGravity();
    setTimeout(() => {
        if (!this.isAnimating) {
            if (this.colliding)
                this.animateBottleSplash();
            else
                this.bottleDisappearsFromScreen();
                this.throw();
        }
    }, 80);
}


/**
 * Checks the direction of the thrown object based on the `otherDirection` property.
 * Regardless of the `otherDirection` value, it sets the `speedY` property (which possibly controls vertical speed) to 10.
 */
    checkDirectionThrowBottle() {
        if (this.otherDirection == true)
            this.speedY = 10;
        else
            this.speedY = 10;
    }



/**
 * Sets an interval that checks each object in the `throwableObjects` array every 2000 milliseconds.
 * If an object's `y` property is greater than 1000, it removes that object from the array.
 * If all objects are removed (i.e., the array's length is 0), it clears the interval.
 * @param {Array} throwableObjects - The array of throwable objects to be checked.
 */
    setOrStopIntervalBottle(throwableObjects) {
        let intervalThrownBottle = setInterval(() => {
            throwableObjects.forEach((thrownBottle) => {
                if (thrownBottle.y > 1000) {
                    let index = (throwableObjects.indexOf(thrownBottle));
                    throwableObjects.splice(index, 1);
                    if (throwableObjects.length <= 0)
                        clearInterval(intervalThrownBottle);
                }
            });
        }, 2000);
    }


/**
 * Initiates an animation using the `BOTTLE_IMAGES` and adjusts the `x` 
 * property of the object. If `otherDirection` is `true`, it decreases `x` 
 * by 30, otherwise, 
 * it increases `x` by 30 (which may represent moving the object to the right).
 */
    bottleDisappearsFromScreen() {
        this.playAnimation(this.BOTTLE_IMAGES);
        if (this.otherDirection == true)
            this.x -= 30;
        else
            this.x += 30;
    }


/**
 * Animates a bottle splash. The `isAnimating` property is initially set to `true`,
 * and then the `playAnimation` method is called with the `BOTTLE_SPLASH` images. 
 * After the animation, `isAnimating` is set back to `false` after a delay of 300 milliseconds. 
 * If the `hasHit` property is `true`, the object is removed from the `world`.
 */
    animateBottleSplash() {
        this.isAnimating = true;
        this.playAnimation(this.BOTTLE_SPLASH, () => {
            setTimeout(() => {
                this.isAnimating = false;
                if (this.hasHit) {
                    world.removeThrowableObject(this);
                }
            }, 300);
        });
    }
    
    

}