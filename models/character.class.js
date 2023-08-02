class Character extends MovableObject {

    height = 280;
    y = 162;
    speed = 7;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'     
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    world;
    /*
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
*/

    /**
    * Constructor for a new Character instance. 
    * The constructor calls several methods to set up the character:
    * loadAllImages loads all necessary images for the character,
    * applyGravity applies the effect of gravity to the character, and
    * animate handles the character's animations.
    */
    constructor() {
        super();
        this.loadAllImages();
        this.applyGravity();
        this.animate();
        this.addSounds();
    }


/**
 * Add the audios and push it to the audioElements Array.
 */
    addSounds() {
        this.walking_sound = new Audio('audio/walking.mp3');
        this.jumping_sound = new Audio('audio/jump.mp3');
        this.hurt_sound = new Audio('audio/hurt.mp3');
        
        audioElements.push(this.walking_sound);
        audioElements.push(this.jumping_sound);
        audioElements.push(this.hurt_sound);

        this.walking_sound.volume = 0.3;
        this.jumping_sound.volume = 0.3;
        this.hurt_sound.volume = 0.3;
    }


/**
 * This method loads all the necessary images for the Character instance. 
 * It uses the loadImage method to load each image.
 * Images are categorized into different actions like walking, jumping, dead, hurt, and sleeping.
 */
    loadAllImages() {
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
    }


/**
 * This methods handles the animations of the Character instance. 
 * It uses two intervals to continually check and update the character's state and position.
 * It checks for input from the keyboard to move the character and change its state.
 * It also updates the position of the camera based on the character's x position.
 */
animate() {
    this.setAnimateIntervals();
}


setAnimateIntervals() {
    this.setFirstInterval();
    this.setSecondInterval();
}


setFirstInterval() {
    setInterval(() => this.firstIntervalActions(), 1000 / 60);
}


firstIntervalActions() {
    this.walking_sound.pause();
    this.handleMovement();
    this.handleJump();
    this.world.camera_x = -this.x + 100;
}


handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
        this.otherDirection = true;
        this.moveLeft();
        this.walking_sound.play();
    }
}


handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jumping_sound.play();
        this.jump();
    }
}


setSecondInterval() {
    setInterval(() => this.secondIntervalActions(), 240);
}


secondIntervalActions() {
    if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
        this.hurt_sound.play();
        this.playAnimation(this.IMAGES_HURT);
    } else {
        this.handleJumpingOrWalkingAnimation();
    }
}


handleJumpingOrWalkingAnimation() {
    if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
    } else {
        this.handleWalkingOrSleepingAnimation();
    }
}


handleWalkingOrSleepingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
    } else {
        this.playAnimation(this.IMAGES_SLEEPING);
    }
}
} 