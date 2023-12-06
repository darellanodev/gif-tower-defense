class HealthBar {

    MAX_DAMAGE = 26

    constructor(x, y) {
        this.x = x
        this.y = y
        this.damage = 0
        this.fullOfDamage = false
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setDamage(damage) {
        this.damage = damage
    }

    isFullOfDamage() {
        return this.damage >= this.MAX_DAMAGE
    }

    _drawBackgroundBar(){
        strokeWeight(1)
        fill('green')
        rect(this.x + 10, this.y + 20, 27, 7)
    }

    _drawDamageBar() {
        strokeWeight(0)
        fill('red')
        rect(this.x + 11, this.y + 21, this.damage, 5)
    }

    draw() {
        
        this._drawBackgroundBar()
        if (this.damage > 0) {
            this._drawDamageBar()
        }
    }

}