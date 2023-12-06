class Const {

    static HUD_NORMAL = 1
    static HUD_UPGRADING = 2
    static HUD_UPGRADING_MAX = 3

    static GREEN_TOWER = 1
    static RED_TOWER = 2
    static YELLOW_TOWER = 3

    static GREEN_COLOR = [75, 185, 35]
    static RED_COLOR = [185, 35, 35]
    static YELLOW_COLOR = [202, 191, 24]

    static LEFT_DIRECTION = 1
    static RIGHT_DIRECTION = 2
    static UP_DIRECTION = 3
    static DOWN_DIRECTION = 4

    static TILE_SIZE = 50

    static UPGRADE_MAX_LEVEL = 5

    static TOTAL_TOWER_UPGRADES = 5
    static TOTAL_ENEMIES = 5
    static CANVAS_WIDTH = 800
    static CANVAS_HEIGHT = 580
    static HUD_HEIGHT = 84
    static KEY_1 = 49
    static KEY_2 = 50
    static KEY_3 = 51

    static CREATE_ENEMY_MAX_TIME = 100

}

// This is for Jest testing
var module = module || {}
module.exports = Const