let allCoins = [];
let allBottles = [];
let level1;


//create 15 coins and push them in Array
for (let i = 0; i < 10; i++) {
    let coin = new Coin();
    allCoins.push(coin);
}


//create 12 Bottles who looks to the left and push them in Array
for (let i = 0; i < 11; i++) {
    let bottle = new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    allBottles.push(bottle);
}


//create 12 Bottles who looks to the right and push them in Array
for (let i = 12; i < 24; i++) {
    let bottle = new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    allBottles.push(bottle);
}


//all Objects from the Game except Character
function initLevel() {
    level1 = new Level(
        [
            new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new SmallChicken(), new SmallChicken(), new SmallChicken(),
            new SmallChicken(), new SmallChicken(), new SmallChicken(),
            new SmallChicken(), new SmallChicken(),
            new Endboss()
        ],

        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 200),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 3000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 4000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 5000)
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],

        [
            allCoins[0], allCoins[1], allCoins[2], allCoins[3], allCoins[4], allCoins[5], allCoins[6], allCoins[7],
            allCoins[8], allCoins[9]
        ],

        [
            allBottles[0], allBottles[1], allBottles[2], allBottles[3], allBottles[4], allBottles[5],
            allBottles[6], allBottles[7], allBottles[8], allBottles[9], allBottles[10]
        ]
    )
}


