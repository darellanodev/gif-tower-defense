class RedTower {

    UPGRADE_0_INFLUENCE_AREA = 120
    RED_TOWER = 2

    constructor(images, x, y) {
        this.images = images
        this.x = x
        this.y = y
    }

    draw() {
        image(this.images[0], this.x, this.y)
    }

    getInfluenceArea() {               
        return this.UPGRADE_0_INFLUENCE_AREA
    }
    
    getType() {
        return this.RED_TOWER;
    }

}