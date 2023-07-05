class StatusbarCoin extends DrawableObject {

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.setCharacteristics();
    }



    setCharacteristics() {
        this.x = -20;
        this.y = 20;
        this.height = 140;
        this.width = 140;
    }
}