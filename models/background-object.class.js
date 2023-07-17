class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;


/**
 * Constructor for a new object instance. The object is a subclass that inherits from a superclass.
 * The constructor calls the loadImage method of the superclass to load an image for the object.
 * It also sets the x and y positions of the object.
 *
 * @param {string} imagePath - The path to the image to be used for the object.
 * @param {number} x - The x-position where the object will be placed.
 */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}