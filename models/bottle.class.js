class Bottle extends ThrowableObject {

    



    constructor() {
        super();
        this.loadImages(this.IMAGES_GROUND);
        placeBottles();
    }


    placeBottles() {
        this.x = 500 + Math.random() * 1700;
    }
}