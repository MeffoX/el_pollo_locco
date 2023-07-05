class Bottle extends MovableObject {
    height = 70;
    width = 70;


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
        this.x = 500 + Math.random() * 1800;
    }
}