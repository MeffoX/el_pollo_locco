class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;


/**
 * Constructor for a new Cloud instance. 
 * The constructor calls several methods to set up the cloud:
 * loadImage loads an image for the cloud,
 * sets a random x position for the cloud, 
 * and animate handles the cloud's movement.
 */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
    
    this.x = Math.random() * 5000;
    this.animate();
    }


/**
 * This method handles the movement of the Cloud instance. 
 * It uses an interval to continually update the cloud's x position, making it move to the left.
 */
    animate() {
        this.moveLeft();
            setInterval(() => this.x -= this.speed, 1000 / 60);
    }

}