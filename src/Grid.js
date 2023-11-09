class Grid {

    FLOOR_SIZE = 50

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
                const character = element[column];
                if (character == '0') {
                    image(this.orangeImage, column + (this.FLOOR_SIZE * column), row + (this.FLOOR_SIZE * row));
                } else if (character == '1') {
                    image(this.blackImage, column + (this.FLOOR_SIZE * column), row + (this.FLOOR_SIZE * row));
                }
            }
        });

    }
}
