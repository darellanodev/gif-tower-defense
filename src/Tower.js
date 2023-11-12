class Tower {

    constructor(images, x, y) {
        this.images = images
        this.x = x
        this.y = y
    }

    draw() {
        image(this.images[0], this.x, this.y)
    }
}