class Hud {

    GREEN_TOWER = 1
    RED_TOWER = 2
    YELLOW_TOWER = 3

    constructor(hudImages) {
        this.hudNormal = hudImages[0]
        this.hudUpgrading = hudImages[1]
        this.hudUpgradingMax = hudImages[2]

        this.selectedItem = this.GREEN_TOWER
        // this.selectedItem = this.RED_TOWER
        // this.selectedItem = this.YELLOW_TOWER
    }

    _drawSelectedItem() {
        switch (this.selectedItem) {
            case this.GREEN_TOWER:
                noFill()
                strokeWeight(3)
                stroke(255, 204, 0);
                square(57, 36, 37);
                break;

            case this.RED_TOWER:
                noFill()
                strokeWeight(3)
                stroke(255, 204, 0);
                square(139, 36, 37);
                break;

            case this.YELLOW_TOWER:
                noFill()
                strokeWeight(3)
                stroke(255, 204, 0);
                square(224, 36, 37);
                break;
        }
    }

    selectTower(towerType) {
        this.selectedItem = towerType
    }

    draw() {

        image(this.hudNormal, 0, 0)

        this._drawSelectedItem()

    }
}
