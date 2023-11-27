class UpgradeGreenDisplay {

    GREEN_COLOR = [75, 185, 35]

    SIZE_UPGRADE_TILE = 48
    TIME_UPGRADE_0_MAX = 2

    MAX_CAPACITY = 23

    constructor(x, y) {
        this.x = x
        this.y = y
        this.timeUpgrade = 0
        this.capacity = 0
        this.finished = false
    }

    _update() {
        if (this.capacity < this.MAX_CAPACITY) {
            this.timeUpgrade++
            if (this.timeUpgrade > this.TIME_UPGRADE_0_MAX) {
                this.timeUpgrade = 0
                this.capacity++
            }
        } else {
            this.finished = true
        }
        
    }

    isFinished() {
        return this.finished
    }

    draw() {
        
        this._update()        
        
        noStroke()
        fill(this.GREEN_COLOR)
        rect(this.x, this.y, this.SIZE_UPGRADE_TILE)
        
        fill('white')
        rect(this.x + 10, this.y + 20, 27, 10)

        fill(this.GREEN_COLOR)
        rect(this.x + 12, this.y + 22, this.capacity, 6)
    }

}