class Hud {

    constructor(hudImages) {
        this.hudNormal = hudImages[0]
        this.hudUpgrading = hudImages[1]
        this.hudUpgradingMax = hudImages[2]

        this.hudType = Const.HUD_NORMAL

        this.selectedItem = Const.GREEN_TOWER
    }

    _drawLevelTitle() {
        fill(255)
        stroke(0)
        strokeWeight(4)
        text('Serpent by Ocliboy', 130, 18)
    }

    _drawSelectedItem() {

        strokeWeight(3)
        stroke(255, 204, 0);
        noFill()

        switch (this.selectedItem) {
            case Const.GREEN_TOWER:
                square(57, 36, 37);
                break;

            case Const.RED_TOWER:
                square(139, 36, 37);
                break;

            case Const.YELLOW_TOWER:
                square(224, 36, 37);
                break;
        }
    }

    isInsideButtonsBar(px, py) {
        if ((px > 0 && px < 800) && (py > 28 && py < 78)) {
            return true
        }
        return false
    }

    isInsideGreenTowerButton(px, py) {
        if ((px > 0 && px < 98) && (py > 28 && py < 78)) {
            return true
        }
        return false
    }

    isInsideRedTowerButton(px, py) {
        if ((px > 98 && px < 180) && (py > 28 && py < 78)) {
            return true
        }
        return false
    }

    isInsideYellowTowerButton(px, py) {
        if ((px > 180 && px < 263) && (py > 28 && py < 78)) {
            return true
        }
        return false
    }

    selectTower(towerType) {
        this.selectedItem = towerType
    }

    getSelectedTower() {
        return this.selectedItem
    }

    setType(hudType) {
        this.hudType = hudType
    }

    draw() {

        switch (this.hudType) {
            case Const.HUD_NORMAL:
                image(this.hudNormal, 0, 0)

                this._drawSelectedItem()
                this._drawLevelTitle()
                break;

            case Const.HUD_UPGRADING:
                image(this.hudUpgrading, 0, 0)
                break;

            case Const.HUD_UPGRADING_MAX:
                image(this.hudUpgradingMax, 0, 0)
                break;
        }



    }
}
