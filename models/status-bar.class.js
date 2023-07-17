class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png', // 1
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png', // 2
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png', // 3
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png', // 4
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', // 5
    ];

    percentage = 100;


/**
 * Constructs an instance of the class, extends DrawableObject, loads images,
 * sets initial x and y coordinates, sets initial height and width, and
 * sets the initial percentage to 100.
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 25;
        this.y = 0;
        this.height = 50;
        this.width = 170;
        this.setPercentage(100);
    }


/**
 * Sets the percentage property of the object, resolves the image index,
 * and sets the image property of the object based on the resolved index.
 * @param {number} percentage - The percentage to be set (between 0 and 5 inclusive).
 */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


}
