class Tower {

    UPGRADE_0_INFLUENCE_AREA = 120

    constructor(images, x, y) {
        this.images = images
        this.x = x
        this.y = y
        this.influenceArea = this.UPGRADE_0_INFLUENCE_AREA
    }

    draw() {
        image(this.images[0], this.x, this.y)
    }

    getInfluenceArea() {
        return this.influenceArea
    }

}