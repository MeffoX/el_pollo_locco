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


    /**
     * 
     * @param {Array} arr - ['img/image1.png, 'img/image2.png', . . . ] 
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }


    

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();            
        }
    }

}