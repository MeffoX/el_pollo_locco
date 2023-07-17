class Bottle extends MovableObject {
    height = 80;
    width = 80;


/**
 * Constructor for a Bottle is a subclass of MovableObject. 
 * The object is a subclass that inherits from a superclass.
 * The constructor calls the loadImage method to load an image for the object
 * and the placeBottles method to position the bottle object on the game screen.
 *
 * @param {string} imagePath - The path to the image to be used for the bottle object.
 */
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.placeBottles();
    }

    hasHit = false;


/**
 * This function positions a bottle object on the game screen.
 * It sets a fixed y-position and a random x-position for the bottle.
 */
    placeBottles() {
        this.y = 355;
        this.x = 500 + Math.random() * 1700;
    }
}