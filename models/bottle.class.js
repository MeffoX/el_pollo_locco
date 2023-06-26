class Bottle extends ThrowableObject {

    
    IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES_GROUND);
        placeBottles();
    }


    placeBottles() {
        this.x = 500 + Math.random() * 1700;
    }
}