class OrangeTile {

    TILE_SIZE = 50
    TOWER_OFFSET = 5

    GREEN_TOWER = 1
    RED_TOWER = 2
    YELLOW_TOWER = 3

    GREEN_TOWER_INFLUENCE_AREA = 120
    RED_TOWER_INFLUENCE_AREA = 180
    YELLOW_TOWER_INFLUENCE_AREA = 220

    GREEN_COLOR = [75, 185, 35]
    RED_COLOR = [185, 35, 35]
    YELLOW_COLOR = [202, 191, 24]

    ALPHA_INFLUENCE_AREA_FILL = 50
    ALPHA_INFLUENCE_AREA_STROKE = 120


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
        const tower = new Tower(greenTowerImages, this.x - this.TOWER_OFFSET, this.y - this.TOWER_OFFSET)
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

    isInside(mouse_x, mouse_y) {
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

    _setInfluenceAreaColor(towerType) {
        switch (towerType) {
            case this.GREEN_TOWER:
                stroke(...this.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
                fill(...this.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
                break;

            case this.RED_TOWER:
                stroke(...this.RED_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
                fill(...this.RED_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
                break;

            case this.YELLOW_TOWER:
                stroke(...this.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
                fill(...this.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
                break;
        }
    }

    _getInfluenceAreaFor(towerSelected) {
        switch (towerSelected) {
            case this.GREEN_TOWER:
                return this.GREEN_TOWER_INFLUENCE_AREA

            case this.RED_TOWER:
                return this.RED_TOWER_INFLUENCE_AREA

            case this.YELLOW_TOWER:
                return this.YELLOW_TOWER_INFLUENCE_AREA
        }
    }
    
    drawInfluenceArea(towerSelected) {
        
        let influenceArea = 120
        strokeWeight(2)
        
        if (this.tower) {
            influenceArea = this.tower.getInfluenceArea()
            this._setInfluenceAreaColor(this.tower.getType())

        } else {
            this._setInfluenceAreaColor(towerSelected)
            influenceArea = this._getInfluenceAreaFor(towerSelected)

        }
        circle(this.x + this.TILE_SIZE/2, this.y + this.TILE_SIZE/2, influenceArea)
    }

}

// This is for Jest testing
var module = module || {};
module.exports = OrangeTile;