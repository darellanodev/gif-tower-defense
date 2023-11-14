class TileGenerator {

    FLOOR_SIZE = 50
    MARGIN_TOP = 30

    constructor(levelMap, mapImages) {

        if (levelMap === '') {
            throw new Error('Level map string cannot be empty')
        }

        this.levelMap = levelMap
        this.orangeImage = mapImages[0]
        this.blackImage = mapImages[1]
    }

    orangeTiles() {

        const orangeTiles = []

        const mapArray = this.levelMap.split(',');
        let row = 0
        mapArray.forEach((element) => {
            row++
            for (let column = 0; column < element.length; column++) {
                const character = element[column]
                const posX = column + (this.FLOOR_SIZE * column)
                const posY = row + (this.FLOOR_SIZE * row) + this.MARGIN_TOP
                if (character == '0') {
                    orangeTiles.push(new OrangeTile(this.orangeImage, posX, posY))
                }
            }
        })

        return orangeTiles

    }

}

var module = module || {};
module.exports = TileGenerator;