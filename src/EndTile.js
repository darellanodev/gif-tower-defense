class EndTile {

    constructor(img, x, y) {
        this.x = x
        this.y = y
        this.img = img
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

}

// This is for Jest testing
var module = module || {}
module.exports = EndTile