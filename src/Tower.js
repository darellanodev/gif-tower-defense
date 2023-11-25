class Tower {

    GREEN_TOWER_UPGRADE_0_INFLUENCE_AREA = 120

    GREEN_TOWER = 1
    RED_TOWER = 2
    YELLOW_TOWER = 3

    constructor(images, x, y) {
        this.images = images
        this.x = x
        this.y = y

        this.typeTower = this.GREEN_TOWER
    }

    draw() {
        image(this.images[0], this.x, this.y)
    }

    getInfluenceArea() {

        let influenceArea = this.GREEN_TOWER_UPGRADE_0_INFLUENCE_AREA

        switch (this.typeTower) {
            case this.GREEN_TOWER:
                influenceArea = this.GREEN_TOWER_UPGRADE_0_INFLUENCE_AREA
                break;
        }

        return influenceArea
    }

    getType() {
        return this.typeTower
    }

}