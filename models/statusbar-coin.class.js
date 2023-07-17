class StatusbarCoin extends DrawableObject {


/**
 * Constructs an instance of the class, extends DrawableObject, loads images,
 * sets initial x and y coordinates, sets initial height and width, and
 */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = -20;
        this.y = 20;
        this.height = 140;
        this.width = 140;
    }
}