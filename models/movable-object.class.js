class MovableObject {
    x = 120;
    y = 325;
    img;
    height = 100;
    width = 100;

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img == document.getElementbyID('image') <img id="image" src>
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right');
    }

    

    moveLeft(){
        
    }
}