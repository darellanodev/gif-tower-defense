// This is for Jest testing
if (typeof window === 'undefined') {

    Const = require('../src/Const.js');
    GreenTower = require('../src/GreenTower.js');
    greenTowerImages = []
    redTowerImages = []
    yellowTowerImages = []
}

class OrangeTile {

    TOWER_OFFSET = 5

    UPGRADE_MAX_LEVEL = 5

    GREEN_TOWER_INFLUENCE_AREA = 150
    RED_TOWER_INFLUENCE_AREA = 240
    YELLOW_TOWER_INFLUENCE_AREA = 290

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
        this.upgradeDisplay = null
    }

    sellTower() {
        this.tower = null
    }

    _showUpgradeDisplay(towerType) {
        if (this.upgradeDisplay === null) {
            this.upgradeDisplay = new UpgradeDisplay(this.x, this.y, this.tower.getColor())
        }
    }

    _buyTower(towerType){
        let tower = null

        switch (towerType) {
            case Const.GREEN_TOWER:
                tower = new GreenTower(greenTowerImages, this.x - this.TOWER_OFFSET, this.y - this.TOWER_OFFSET)
                break;
            case Const.RED_TOWER:
                tower = new RedTower(redTowerImages, this.x - this.TOWER_OFFSET, this.y - this.TOWER_OFFSET)
                break;
            case Const.YELLOW_TOWER:
                tower = new YellowTower(yellowTowerImages, this.x, this.y)
                break;
        
            default:
                break;
        }

        this.tower = tower
    }

    putTower(towerType) {

        if (this.tower === null) {
            this._buyTower(towerType)
        } else {
            if (this.tower.getUpgradeLevel() < Const.UPGRADE_MAX_LEVEL){
                this._showUpgradeDisplay(towerType)
            }
        }
    }

    updateUpgradeDisplay() {

        if (this.upgradeDisplay) {
            if (this.upgradeDisplay.isFinished()) {
                this.upgradeDisplay = null
                this._upgradeTower()
            }
        }
    }

    _upgradeTower() {
        if (this.tower) {
            this.tower.upgrade()
        }
    }
        
    drawTile() {
        image(this.img, this.x, this.y)
    }

    drawUpgradeDisplay() {
        if (this.upgradeDisplay) {
            this.upgradeDisplay.draw()    
        }
    }

    drawTower() {
        if (this.tower && this.upgradeDisplay === null) {
            this.tower.draw()
        }
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    selectTarget(enemies) {
        if (this.tower) {
            this.tower.selectTarget(enemies)
        }
    }

    isInside(mouse_x, mouse_y) {
        let insideX = false
        let insideY = false
        
        if ((this.x < mouse_x) && ((this.x + Const.TILE_SIZE) > mouse_x)) {
            insideX = true
        }
        if ((this.y < mouse_y) && ((this.y + Const.TILE_SIZE) > mouse_y)) {
            insideY = true
        }

        if (insideX && insideY) {
            return true
        }
        return false
    }

    _setInfluenceAreaColor(towerType) {
        switch (towerType) {
            case Const.GREEN_TOWER:
                stroke(...this.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
                fill(...this.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
                break;

            case Const.RED_TOWER:
                stroke(...this.RED_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
                fill(...this.RED_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
                break;

            case Const.YELLOW_TOWER:
                stroke(...this.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
                fill(...this.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
                break;
        }
    }

    hasTower() {
        return this.tower !== null
    }

    _getInfluenceAreaFor(towerSelected) {
        switch (towerSelected) {
            case Const.GREEN_TOWER:
                return this.GREEN_TOWER_INFLUENCE_AREA

            case Const.RED_TOWER:
                return this.RED_TOWER_INFLUENCE_AREA

            case Const.YELLOW_TOWER:
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
        circle(this.x + Const.TILE_SIZE/2, this.y + Const.TILE_SIZE/2, influenceArea)
    }

    
    selectHudType() {
        if (this.hasTower()) {
            
            if (this.tower.getUpgradeLevel() < Const.UPGRADE_MAX_LEVEL){
                hud.setType(Const.HUD_UPGRADING)
            } else {
                hud.setType(Const.HUD_UPGRADING_MAX)
            }

        } else {
            hud.setType(Const.HUD_NORMAL)
        }
    }

}

// This is for Jest testing
var module = module || {}
module.exports = OrangeTile