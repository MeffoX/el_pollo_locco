class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;


/**
 * Level class represents a game level with its various elements.
 *
 * @property {Array} enemies - Array of all enemies present in the level.
 * @property {Array} clouds - Array of all clouds present in the level.
 * @property {Array} backgroundObjects - Array of all background objects present in the level.
 * @property {Array} coins - Array of all coins present in the level.
 * @property {Array} bottles - Array of all bottles present in the level.
 *
 * @constructor
 * @param {Array} enemies - Array of enemy objects to be placed in the level.
 * @param {Array} clouds - Array of cloud objects to be placed in the level.
 * @param {Array} backgroundObjects - Array of background objects to be placed in the level.
 * @param {Array} coins - Array of coin objects to be placed in the level.
 * @param {Array} bottles - Array of bottle objects to be placed in the level.
 *
 * All properties are assigned from the constructor parameters.
 */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}