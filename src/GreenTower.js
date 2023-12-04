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
        this.distanceToEnemyTarget = 0
    }

    upgrade() {
        this.upgradeLevel++
    }

    getUpgradeLevel() {
        return this.upgradeLevel
    }

    _drawShotToEnemy() {
        stroke(this.GREEN_COLOR)
        line(-1, -18, 7 - (this.distanceToEnemyTarget/7), -this.distanceToEnemyTarget)
    }

    draw() {

        if (this.enemyTarget) {

            
            let r_dx = this.enemyTarget.getX() - this.x
            let r_dy = this.enemyTarget.getY() - this.y
            let angle = Math.atan2(r_dy, r_dx) + 1.55; 
            
            let cos_a = cos(angle);
            let sin_a = sin(angle);
            
            imageMode(CENTER)
            applyMatrix(cos_a, sin_a, -sin_a, cos_a, this.x + 30, this.y + 30);

            this._drawShotToEnemy()
            image(this.images[this.upgradeLevel], 0, 0)

            resetMatrix();
            imageMode(CORNER)
        } else {
            image(this.images[this.upgradeLevel], this.x, this.y)

        }
        
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

        enemies.forEach(enemy => {
            const distance = Distance.twoPoints(this.x, this.y, enemy.getX(), enemy.getY())
            if (distance < minDistance) {
                minDistance = distance
                enemyTarget = enemy
            }
        })

        if (this._isDistanceIntoInfluenceArea(minDistance)) {
            this.enemyTarget = enemyTarget
            this.distanceToEnemyTarget = minDistance
        } else {
            this.enemyTarget = null
            this.distanceToEnemyTarget = 0
        }

    }

}

// This is for Jest testing
var module = module || {};
module.exports = GreenTower;