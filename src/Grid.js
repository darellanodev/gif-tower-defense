class Grid {

    STROKE_COLOR = 0
    STROKE_WIDTH = 3
    RECT_SIZE = 50
    RECT_MARGIN = 10
    TOTAL_ROWS = 20
    TOTAL_COLUMNS = 20

    constructor(fillColor) {
        this.fillColor = fillColor
    }

    draw() {
        stroke(this.STROKE_COLOR)
        strokeWeight(this.STROKE_WIDTH)
        fill(this.fillColor)
        for (let i = 0; i < this.TOTAL_ROWS; i++) {
            for (let j = 0; j < this.TOTAL_COLUMNS; j++) {
                let x = i * (this.RECT_SIZE + this.STROKE_WIDTH) + this.RECT_MARGIN
                let y = j * (this.RECT_SIZE + this.STROKE_WIDTH) + this.RECT_MARGIN
                rect(x, y, this.RECT_SIZE, this.RECT_SIZE)
            }
        }
    }
}
