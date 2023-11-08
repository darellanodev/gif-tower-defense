class Tower {

    TOWER_WIDTH = 50
    TOWER_HEIGHT = 50

    constructor(images) {
        this.images = images
    }

    draw() {
        image(this.images[0], 6, 6)
    }
}