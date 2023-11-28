class GreenTower {

    UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
    GREEN_TOWER = 1
    GREEN_COLOR = [75, 185, 35]

    constructor(images, x, y) {
        this.images = images
        this.x = x
        this.y = y
        this.upgradeLevel = 0
        this.enemyTarget = null
    }

    upgrade() {
        this.upgradeLevel++
    }

    getUpgradeLevel() {
        return this.upgradeLevel
    }

    _drawShotToEnemy() {
        if (this.enemyTarget) {
            stroke(this.GREEN_COLOR)
            line(this.x + 25, this.y + 25, this.enemyTarget.getX() + 25, this.enemyTarget.getY() + 25);
        }
    }

    draw() {
        image(this.images[this.upgradeLevel], this.x, this.y)
        this._drawShotToEnemy()
    }

    getInfluenceArea() {               
        return this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
    }

    getType() {
        return this.GREEN_TOWER
    }

    getColor() {
        return this.GREEN_COLOR
    }

    _isDistanceIntoInfluenceArea(distance) {
        return distance <= this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
    }

    selectTarget(enemies) {
        let minDistance = 99999
        let enemyTarget = null
        for (const enemy of enemies) {
            const distance = Distance.twoPoints(this.x, this.y, enemy.getX(), enemy.getY())
            if (distance < minDistance) {
                minDistance = distance
                enemyTarget = enemy
            }
        }

        if (this._isDistanceIntoInfluenceArea(minDistance)) {
            this.enemyTarget = enemyTarget
        } else {
            this.enemyTarget = null
        }

    }

}