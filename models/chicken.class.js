class Chicken extends MovableObject {
    height = 75;
    width = 80;
    y = 355;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]



/**
 * Constructor for a new Chicken instance. 
 * The constructor calls several methods to set up the chicken:
 * loadImage loads an initial image for the chicken,
 * loadImages loads all necessary images for the chicken's states,
 * placeChicken places the chicken on the game screen at a random position,
 * and animate handles the chicken's movement and animation.
 */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.placeChicken();
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate();

    }

    /**
     * This method positions a chicken object on the game screen.
     * It sets a random x-position for the chicken.
     */
    placeChicken() {
        this.x = 500 + Math.random() * 1700;
    }

    
    /**
     * This method handles the movement and animation of the Chicken instance. 
     * It uses two intervals to continually check and update the chicken's state and position.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200)
    }


}