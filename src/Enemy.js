class Enemy {

    constructor(img) {
        this.img = img
    }

    draw() {
        image(this.img, frameCount % width, height / 2)
    }
}