class Coin extends MovableObject {
    height = 70;
    width = 70;


    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.placeCoins();
        this.animate();
    }


    placeCoins() {
        this.x = 400 + Math.random() * 1500;
        this.y = 40 + Math.random() * 250;
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }
}