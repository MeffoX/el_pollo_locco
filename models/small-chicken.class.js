class SmallChicken extends MovableObject {
    y = 370;
    width = 50;
    height = 50;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    jump_on_sound = new Audio('audio/jumpon.mp3');



/**
 * SmallChicken class extends MovableObject. Represents smaller chicken enemies in the game.
 * @property {number} speed - The speed at which the small chicken moves. Random value between 0.15 and 0.45.
 * @constructor
 * Loads the images for walking and dead states, places the chicken in the level and starts animation.
 */

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.placeChicken();
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate();
    }


    /**
     * placeChicken method sets the initial x-coordinate of the small chicken in the game world.
     * The chicken is placed randomly between 500 and 2000 pixels from the left edge of the game world.
     */
    placeChicken() {
        this.x = 500 + Math.random() * 1500;
    }


    /**
     * animate method is responsible for the animation of the small chicken within the game world.
     * The chicken continuously moves to the left based on a set interval of roughly 60 times per second.
     * It also checks whether the chicken is dead or not. If the chicken is dead, it will play a death animation. 
     * If the chicken is not dead, it will play a walking animation. The animation is updated roughly 5 times per second.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead()){
                if (!this.hasSoundPlayed) {
                    this.jump_on_sound.play();
                    this.hasSoundPlayed = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200)
    }

    
}