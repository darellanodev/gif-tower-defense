class YellowTower {

    UPGRADE_0_INFLUENCE_AREA = 290
    YELLOW_TOWER = 3

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
        return this.YELLOW_TOWER;
    }

}