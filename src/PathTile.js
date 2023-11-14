class PathTile {

    TILE_SIZE = 50

    constructor(img, x, y) {
        this.x = x
        this.y = y
        this.img = img
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

}

// This is for Jest testing
var module = module || {};
module.exports = PathTile;