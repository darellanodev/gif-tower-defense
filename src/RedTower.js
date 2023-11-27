class RedTower {

    UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
    RED_TOWER = 2

    constructor(images, x, y) {
        this.images = images
        this.x = x
        this.y = y
this.upgradeLevel = 0
    }

    upgrade() {
        this.upgradeLevel++
    }

    getUpgradeLevel() {
        return this.upgradeLevel
    }

    draw() {
        image(this.images[this.upgradeLevel], this.x, this.y)
    }

    getInfluenceArea() {               
        return this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
    }
    
    getType() {
        return this.RED_TOWER;
    }

}