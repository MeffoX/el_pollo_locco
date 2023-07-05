class StatusbarBottle extends DrawableObject {


    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.setCharacteristics();
    }


    /**
     * places the coin next to the number of the collected coins
     */
    setCharacteristics() {
        this.x = 130;
        this.y = 60;
        this.height = 55;
        this.width = 55;
    }
}