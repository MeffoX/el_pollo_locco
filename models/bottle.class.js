class Bottle extends MovableObject {
    height = 80;
    width = 80;


    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.placeBottles();
    }

    /**
     * bottles will randomly placed on the map
     */
    placeBottles() {
        this.y = 355;
        this.x = 500 + Math.random() * 1700;
    }
}