class OrangeTile {

    TILE_SIZE = 50
    TOWER_OFFSET = 5

    constructor(img, x, y) {
        this.x = x
        this.y = y
        this.img = img
        this.tower = null
    }

    sellTower() {
        this.tower = null
    }

    buyTower() {
        const tower = new Tower(tower1Images, this.x - this.TOWER_OFFSET, this.y - this.TOWER_OFFSET)
        if (this.tower === null) {
            this.tower = tower
        }
    }
    
    draw() {
        image(this.img, this.x, this.y)
        if (this.tower) {
            this.tower.draw()
        }
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    isClicked(mouse_x, mouse_y) {
        let insideX = false
        let insideY = false
        
        if ((this.x < mouse_x) && ((this.x + this.TILE_SIZE) > mouse_x)) {
            insideX = true
        }
        if ((this.y < mouse_y) && ((this.y + this.TILE_SIZE) > mouse_y)) {
            insideY = true
        }

        if (insideX && insideY) {
            return true
        }
        return false
    }

}

// This is for Jest testing
var module = module || {};
module.exports = OrangeTile;