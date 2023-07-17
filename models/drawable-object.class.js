class DrawableObject {
    x = 120;
    y = 325;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;


/**
* This method loads an image from a given path.
* @param {string} path - The path to the image.
*/
    loadImage(path) {
        this.img = new Image(); // this.img == document.getElementbyID('image') <img id="image" src>
        this.img.src = path;
    }


/**
* This method draws an image onto the canvas context.
* @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas on which to draw the image.
*/
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch(e) {
        console.warn('Error loading image', e);
        console.log('Could not load image,', this.img.src);
    }


/**
 * This method loads an array of images and stores them in the image cache.
 * @param {string[]} arr - The array of image paths to load.
 */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }


/**
 * This method draws the score for coins and bottles on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the drawing surface of a canvas.
 * @param {number} scoreCoins - The score for the collected coins.
 * @param {number} scoreBottles - The score for the collected bottles.
 */
    drawScore(ctx, scoreCoins, scoreBottles) {
        ctx.font = "34px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(scoreCoins, 80, 103);
        ctx.fillText(scoreBottles, 173, 103);
    }


/**
 * This method calculates the index of the status bar image that should be displayed based on the current percentage.
 * @returns {number} The index of the status bar image that should be displayed.
 */
        resolveImageIndex() {
            if (this.percentage == 100)
                return 5;
            else if (this.percentage > 80)
                return 4;
            else if (this.percentage > 60)
                return 3;
            else if (this.percentage > 40)
                return 2;
            else if (this.percentage > 20)
                return 1;
            else {
                return 0;
            }
        }
    


/**
 * This method draws a red border around the instance of the given classes.
 * The border represents the bounding box of the object for visual debugging purposes.
 * It helps to understand object collisions and interactions. Kepp it for Testing.
 * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas on which to draw the frame.

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();            
        }
    }
*/
}