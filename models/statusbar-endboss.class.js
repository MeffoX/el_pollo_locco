class StatusbarEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue100.png'
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
        this.x = 500;
        this.y = 0;
        this.height = 60;
        this.width = 200;
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