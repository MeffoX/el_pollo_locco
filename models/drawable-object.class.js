class DrawableObject {
    x = 120;
    y = 325;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img == document.getElementbyID('image') <img id="image" src>
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch(e) {
        console.warn('Error loading image', e);
        console.log('Could not load image,', this.img.src);
    }


    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }


    drawScore(ctx, scoreCoins, scoreBottles) {
        ctx.font = "34px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(scoreCoins, 80, 103);
        ctx.fillText(scoreBottles, 173, 103);
    }


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
    

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();            
        }
    }

}