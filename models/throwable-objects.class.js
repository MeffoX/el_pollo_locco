class ThrowableObject extends MovableObject {
    speedX = 20;
    colliding = false;
    isAnimating;

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]



    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }

/*
    throw() {
        this.checkDirectionThrowBottle();
        this.applyGravity();
        setInterval(() => {
            if (this.colliding == true)
                this.animateBottleBreak();
            else if (this.colliding == false)
                this.bottleDisappearsFromScreen();
        }, 80);
    }
*/

throw() {
    this.checkDirectionThrowBottle();
    this.applyGravity();
    setTimeout(() => {
        if (!this.isAnimating) { // Prüfen ob die Flasche nicht gerade animiert wird
            if (this.colliding)
                this.animateBottleSplash(); // Ändern Sie dies zu animateBottleSplash
            else
                this.bottleDisappearsFromScreen();
                this.throw(); // Rufen Sie throw() erneut auf, wenn die Flasche noch nicht kollidiert hat
        }
    }, 80);
}



    checkDirectionThrowBottle() {
        if (this.otherDirection == true)
            this.speedY = 10;
        else
            this.speedY = 10;
    }



    setOrStopIntervalBottle(throwableObjects) {
        let intervalThrownBottle = setInterval(() => {
            throwableObjects.forEach((thrownBottle) => {
                if (thrownBottle.y > 1000) {
                    let index = (throwableObjects.indexOf(thrownBottle));
                    throwableObjects.splice(index, 1);
                    if (throwableObjects.length <= 0)
                        clearInterval(intervalThrownBottle);
                }
            });
        }, 2000);
    }


    bottleDisappearsFromScreen() {
        this.playAnimation(this.BOTTLE_IMAGES);
        if (this.otherDirection == true)
            this.x -= 30;
        else
            this.x += 30;
    }

    animateBottleSplash() {
        this.isAnimating = true;
        this.playAnimation(this.BOTTLE_SPLASH, () => {
            setTimeout(() => {
                this.isAnimating = false;
                if (this.hasHit) {  // Fügen Sie diese Zeile hinzu
                    world.removeThrowableObject(this);
                }
            }, 300);
        });
    }
    
    

}