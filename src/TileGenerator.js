// This is for Jest testing
if (typeof window === 'undefined') {
    OrangeTile = require('../src/OrangeTile.js');
    PathTile = require('../src/PathTile.js');
}


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

    _extractTiles(symbol, tileClass, img = null) {

        const resultTiles = []

        const mapArray = this.levelMap.split(',');
        let row = 0
        mapArray.forEach((element) => {
            row++
            for (let column = 0; column < element.length; column++) {
                const character = element[column]
                const posX = column + (this.FLOOR_SIZE * column)
                const posY = row + (this.FLOOR_SIZE * row) + this.MARGIN_TOP
                if (character === symbol) {
                    if (img === null) {
                        resultTiles.push(new tileClass(posX, posY))
                    } else {
                        resultTiles.push(new tileClass(img, posX, posY))
                    }
                }
            }
        })

        return resultTiles
    }
   
    orangeTiles() {
        return this._extractTiles('0', OrangeTile, this.orangeImage)
    }
    
    pathTiles() {
        return this._extractTiles('1', PathTile)
    }

}

// This is for Jest testing
var module = module || {};
module.exports = TileGenerator;