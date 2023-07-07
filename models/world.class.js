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

/*
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
            });
        }


        checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
            // Überprüfen, ob der Charakter sich über dem Boden befindet
            if (this.character.isAboveGround()) {
                // Der Charakter befindet sich über dem Boden, also soll der Gegner Schaden nehmen
                enemy.energy -= 100;
                // Überprüfen, ob der Gegner tot ist
                if (enemy.energy <= 0) {
                    enemy.playAnimation(enemy.IMAGES_DEAD); // Spiele die Todesanimation ab
                    // Nachdem die Todesanimation abgespielt wurde, entferne das Huhn
                    setTimeout(() => {
                        this.removeChicken(enemy); // Hier rufst du die removeChicken Methode mit dem enemy als Argument auf
                    }, 1000); // 1000 Millisekunden Verzögerung entspricht 1 Sekunde
                }
            } else {
                // Der Charakter befindet sich nicht über dem Boden, also soll der Charakter Schaden nehmen
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }
    });
}



    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
            
                if (this.character.isAboveGround()) {
                    enemy.energy -= 100;
                    if (enemy.energy <= 0) {
                        enemy.isDead();
                        this.removeChicken(enemy);
                    }
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }
*/

checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
            
            if (enemy.isDead) {
                this.handleFallingEnemy(enemy);
            } else {
                if (this.character.isAboveGround()) {
                    enemy.energy -= 100;
                    if (enemy.energy <= 0) {
                        enemy.isDead = true;
                        enemy.playAnimation(enemy.IMAGES_DEAD);
                        this.handleFallingEnemy(enemy);
                    }
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
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






