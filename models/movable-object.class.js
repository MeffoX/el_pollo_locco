class MovableObject {
    x = 120;
    y = 325;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.20;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 160;
    }


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img == document.getElementbyID('image') <img id="image" src>
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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


    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; // i = 0, 1, 2, 3, 4, 5, 6, 1, 2, 3, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }

    

    moveLeft(){
            this.x -= this.speed;
    }


    jump(){
        this.speedY = 25;
    }

/*
// Bessere Formel zur Kollisionsberechnung (Genauer)
isColliding (obj) {
    return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
            (this.Y + this.offsetY + this.height) >= obj.Y &&
            (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

}

isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
} */
    
isColliding(obj) {
    return (this.x + this.width) - this.offset.right > obj.x + obj.offset.left &&
        (this.y + this.height) - this.offset.bottom > obj.y + obj.offset.top &&
        this.x + this.offset.left < obj.x + obj.width + obj.offset.right &&
        this.y + this.offset.top < obj.y + obj.height + obj.offset.bottom;
}



}



