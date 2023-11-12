class OrangeTile {

    constructor(img, x, y) {
        this.x = x
        this.y = y
        this.img = img
    }

    draw() {
        image(this.img, this.x, this.y)
    }

}
