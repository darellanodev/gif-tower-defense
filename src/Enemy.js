class Enemy {

    ENEMY_WIDTH = 50
    ENEMY_HEIGHT = 50

    constructor(img) {
        this.img = img
    }

    draw() {
        image(this.img, frameCount % width, height / 2)
    }
}