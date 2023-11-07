class Enemy {

    ENEMY_WIDTH = 50;
    ENEMY_HEIGHT = 50;

    constructor(fillColor) {
        this.fillColor = fillColor;
    }

    draw() {
        fill(this.fillColor);
        rect(frameCount % width, height / 2, this.ENEMY_WIDTH, this.ENEMY_HEIGHT);
    }
}