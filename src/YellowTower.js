class YellowTower {

    UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]

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

    getCostWhenUpgradeLevelIs(selectedUpgradeLevel) {
        if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
            return Const.COST_UPGRADE_YELLOW_TOWER[Const.UPGRADE_MAX_LEVEL]
        }
        return Const.COST_UPGRADE_YELLOW_TOWER[selectedUpgradeLevel]
    }

    getCost() {
        return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
    }
    
    getType() {
        return Const.YELLOW_TOWER
    }

    getColor() {
        return Const.YELLOW_COLOR
    }

    selectTarget(enemies) {
        //TODO
    }

}