class Coin extends MovableObject {
    height = 70;
    width = 70;


    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


/**
 * Constructor for a new Coin instance. 
 * The constructor calls several methods to set up the coin:
 * loadImage loads the first image for the coin,
 * loadImages loads all images for animation,
 * placeCoins randomly places the coin on the game area,
 * and animate handles the coin's animation.
 */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.placeCoins();
        this.animate();
    }


/**
 * This method randomly places the Coin instance in the game area.
 */
    placeCoins() {
        this.x = 400 + Math.random() * 1500;
        this.y = 40 + Math.random() * 250;
    }


/**
* This method handles the animation of the Coin instance. 
* It uses an interval to continually cycle through the images, creating an animation effect.
*/
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }
}