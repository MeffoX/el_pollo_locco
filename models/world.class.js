class World  {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];
    isInAir = false;

    scoreCoins = 0; //counter which counts the collected coins
    scoreBottles = 0; //counter which counts the collected bottles


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld(){
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkAllCollisions();
            this.checkThrowObjects();
        }, 100);
    }


    checkAllCollisions() {
        this.checkCollisions();
        this.checkCoinCollision();
        this.checkBottleCollision();
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
    
                if (this.character.isAboveGround() && this.character.y < enemy.y) {
                    enemy.energy -= 100;
    
                    if (enemy.isDead && enemy.isDead()) {
                        this.handleFallingEnemy(enemy);
                    }
    
                } else if (!enemy.isDead || (enemy.isDead && !enemy.isDead())) { 
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }
    


handleFallingEnemy(enemy) {
    if (enemy.isFalling) {
        return;
    }
    enemy.isFalling = true;
    let fallingInterval = setInterval(() => {
        enemy.y += 10;
        if (enemy.y >= 480) {
            clearInterval(fallingInterval);

            let index = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(index, 1);
        }
    }, 50);
}


    checkCoinCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.removeCoin(coin);
                this.scoreCoins += 1;
            }
        })
    }

    
    removeCoin(coin) {
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
    }


    checkBottleCollision() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.removeBottle(bottle);
                this.scoreBottles += 1;
            }
        })
    }


    removeBottle(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index, 1);
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x +100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }


    /**
     * if you want to throw a bottle, function generates the throwable Object
     */
    checkThrowObjects() {
        if (this.wantThrowBottle()) {
            let bottle;
            this.isInAir = true;
            if (this.character.otherDirection == true) {
                bottle = new ThrowableObject(this.character.x, this.character.y + 100);
                bottle.otherDirection = true;
            } else
                bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.scoreBottles -= 1;
            bottle.setOrStopIntervalBottle(this.throwableObjects);
            this.throwNextBottle();
        }
    }
    
    

    throwNextBottle() {
        setTimeout(() => {
            this.isInAir = false;
        }, 500);
    }
    
    
    wantThrowBottle() {
        return this.keyboard.D && this.scoreBottles > 0 && !this.isInAir
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        //----- Space for fixed objects ------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.character.drawScore(this.ctx, this.scoreCoins, this.scoreBottles);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);


        //draw() is called again and again
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(objects){
      objects.forEach((o) => {
          this.addToMap(o);
    })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    
}






