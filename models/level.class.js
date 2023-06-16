class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
/*
enemies = level1.enemies;
clouds = level1.clouds;
backgroundObjects = level1.backgroundObjects;
//level_end_x = 700 */