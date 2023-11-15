// This is for Jest testing
if (typeof window === 'undefined') {
    OrangeTile = require('../src/OrangeTile.js');
    PathTile = require('../src/PathTile.js');
    StartTile = require('../src/StartTile.js');
    EndTile = require('../src/EndTile.js');
}


class TileGenerator {

    FLOOR_SIZE = 50
    MARGIN_TOP = 30

    constructor(levelMap, mapImages) {

        if (levelMap === '') {
            throw new Error('Level map string cannot be empty')
        }

        const levelMapParts = levelMap.split('@')

        const levelMapData = levelMapParts[1]
        
        this._setStartImage(levelMapData, mapImages)
        this._setEndImage(levelMapData, mapImages)

        this.levelMap = levelMapParts[0]
        this.orangeImage = mapImages[0]
        this.blackImage = mapImages[1]


    }

    _setStartImage(levelMapData, mapImages) {

        const levelMapDataParts = levelMapData.split(',')
        const startOrientation = levelMapDataParts[0]

        switch (startOrientation) {
                case '1':
                this.startImage = mapImages[6]
                break;

                case '2':
                this.startImage = mapImages[7]
                break;

                case '3':
                this.startImage = mapImages[8]
                break;

                case '4':
                this.startImage = mapImages[9]
                break;
        }

    }

    _setEndImage(levelMapData, mapImages) {

        const levelMapDataParts = levelMapData.split(',')
        const endOrientation = levelMapDataParts[1]

        switch (endOrientation) {
            case '1':
            this.endImage = mapImages[2]
            break;

            case '2':
            this.endImage = mapImages[3]
            break;

            case '3':
            this.endImage = mapImages[4]
            break;

            case '4':
            this.endImage = mapImages[5]
            break;
        }
    }

    _extractTiles(symbol, tileClass, img = null) {

        const resultTiles = []

        const mapArray = this.levelMap.split(',');
        let rowCount = 0
        mapArray.forEach((row) => {
            const trimmedRow = trim(row)
            rowCount++
            for (let column = 0; column < trimmedRow.length; column++) {
                const character = trimmedRow[column]
                const posX = column + (this.FLOOR_SIZE * column)
                const posY = rowCount + (this.FLOOR_SIZE * rowCount) + this.MARGIN_TOP
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

    startTile() {
        return (this._extractTiles('x', StartTile, this.startImage))[0]
    }

    endTile() {
        return (this._extractTiles('y', EndTile, this.endImage))[0]
    }

}

// This is for Jest testing
var module = module || {};
module.exports = TileGenerator;