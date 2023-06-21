class SmallChicken extends MovableObject {
    y = 370;
    width = 50;
    height = 50;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];



    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.placeChicken();
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate();
    }


    placeChicken() {
        this.x = 500 + Math.random() * 1500;
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
    }, 200)
    }
}