class StartTile {

    TILE_SIZE = 50

    constructor(img, x, y, startDirection) {
        this.x = x
        this.y = y
        this.img = img
        this.startDirection = startDirection
    }

    draw() {
        image(this.img, this.x, this.y)
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getStartDirection() {
        return this.startDirection
    }

}

// This is for Jest testing
var module = module || {};
module.exports = StartTile;