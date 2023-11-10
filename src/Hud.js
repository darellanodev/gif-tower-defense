class Hud {

    constructor(hudImages) {
        this.hudNormal = hudImages[0]
        this.hudUpgrading = hudImages[1]
        this.hudUpgradingMax = hudImages[2]
    }

    draw() {

        image(this.hudNormal, 0, 0)

    }
}
