class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, bottles, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}
/*
enemies = level1.enemies;
clouds = level1.clouds;
backgroundObjects = level1.backgroundObjects;
//level_end_x = 700 */