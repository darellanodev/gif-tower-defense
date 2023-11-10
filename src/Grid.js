class Grid {

    FLOOR_SIZE = 50
    MARGIN_TOP = 30

    constructor(levelMap, mapImages) {
        this.levelMap = levelMap
        this.orangeImage = mapImages[0]
        this.blackImage = mapImages[1]
    }

    draw() {

        const mapArray = this.levelMap.split(',');
        let row = 0
        mapArray.forEach((element) => {
            row++
            for (let column = 0; column < element.length; column++) {
                const character = element[column]
                const posX = column + (this.FLOOR_SIZE * column)
                const posY = row + (this.FLOOR_SIZE * row) + this.MARGIN_TOP
                if (character == '0') {
                    image(this.orangeImage, posX, posY);
                } else if (character == '1') {
                    // empty
                } else if (character == '2') {
                    image(this.blackImage, posX, posY);
                }
            }
        });

    }
}
