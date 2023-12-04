class PathTile {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

}

// This is for Jest testing
var module = module || {}
module.exports = PathTile