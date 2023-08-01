class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -30;
    speed = 0.40;
    energy = 500;

    offset = {
        top: 0,
        left: 50,
        right: 0,
        bottom: 0
    }

 IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
 ];


 IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
 ];

 IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
 ];

 IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
 ];

 IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
 ];

 hadFirstContact = false;
 isHurt = false;
/*
 chicken_sound = new Audio('audio/chicken.mp3');
 dead_sound = new Audio('audio/gameover.mp3');
*/


/**
 * Constructor for the Endboss class.
 * Endboss class inherits from the MovableObject class.
 */
    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2400;
        this.animate();
        this.addSounds();
    }


/**
 * Add the audios and push it to the audioElements Array.
 */
    addSounds() {
        this.chicken_sound = new Audio('audio/chicken.mp3');
        audioElements.push(this.chicken_sound);

        this.dead_sound = new Audio('audio/gameover.mp3');
        audioElements.push(this.dead_sound);
    }


/**
 * This methods handles the animation of the Endboss instance. 
 */
    animate() {
        this.setAnimateInterval();
    }
    

/**
 * This methods handles the animation of the Endboss instance. 
 */
    setAnimateInterval() {
        let i = 0;
        let moveInterval;
    
        setInterval(() => {
            i = this.handleAnimation(i);
            moveInterval = this.maybeMove(moveInterval);
            this.handleHurtOrDead();
        }, 200);
    }
    

/**
 * This method decides which animation to play based on the character's x position. 
 * If the character's x position is greater than 1950 and hasn't made the first contact yet, it resets i and sets hadFirstContact to true.
 */
    handleAnimation(i) {
        if (i < 8) {
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (world.character.x > 1950 && !this.hadFirstContact) {
            i = 0;
            this.hadFirstContact = true;
        }
        return ++i;
    }
    

/**
 * This method starts moving the object to the left if it had the first contact and moveInterval is not set yet.
 */
    maybeMove(moveInterval) {
        if (this.hadFirstContact && !moveInterval) {
            moveInterval = setInterval(() => this.moveLeft(), 1000 / 60);
        }
        return moveInterval;
    }
    

/**
 * The handleHurtOrDead() method handles the situation when the character is hurt or dead. 
 * If the character is hurt, it plays the hurt sound and changes the animation to hurt animation. 
 * If the character is dead, it plays the dead sound and changes the animation to dead animation.
 */
    handleHurtOrDead() {
        if (this.isHurt && this.energy > 0) {
            this.chicken_sound.play();
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.energy <= 0) {
            if (!this.hasSoundPlayed) {
                this.dead_sound.play();
                this.hasSoundPlayed = true;
            }
            this.playAnimation(this.IMAGES_DEAD);
        }
    }


  /**
   * The getHurt() function is a method that controls the behavior of the character when it gets hurt. 
   * This function is typically invoked when a character like Endboss interacts with an object or 
   * another character that reduces its health or energy.
   * 
   * Functionality:
   * 1. Sets the character's state to 'hurt' by setting 'this.isHurt' to true.
   * 2. Starts the 'hurt' animation using the 'IMAGES_HURT' array of image paths.
   * 3. After the 'hurt' animation, the callback function checks the character's energy level:
   *     - If the energy level is above 0, it implies the character is still 'alive'. The character's
   *       state is set back to 'not hurt', and the 'walking' animation starts again.
   *     - If the energy level is not above 0, it implies the character is 'dead'. The 'dead' animation starts.
   */
  getHurt() {
    this.isHurt = true;
    this.playAnimation(this.IMAGES_HURT, () => {
        this.isHurt = false;
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_DEAD);
        }
    });
}


  /**
   * The isDead() function is a method that checks whether the Endboss is dead.
   * A character is considered dead if the following two conditions are met:
   * 1. The character's energy level (this.energy) is less than or equal to zero.
   * 2. The character's vertical position (this.y) is greater than or equal to 420.
   * 
   * @returns {boolean} - returns true if the character is dead according to the mentioned conditions, 
   *                      false otherwise.
   */
    isDead() {
        return this.energy <= 0 && this.y >= 420;
    }
  

}