const Path = require('../src/Path.js')
const PathTile = require('../src/PathTile.js')
const StartTile = require('../src/StartTile.js')
const EndTile = require('../src/EndTile.js')
const TileGenerator = require('../src/TileGenerator.js')

const LEFT_DIRECTION = 1

const levelMap = `111111111111111x,
                  1000000000000000,
                  1011111111111111,
                  1010000000000001,
                  1010000111111101,
                  1011111100000101,
                  1000000000000101,
                  1111111111111101,
                  0000000000000001,
                  y111111111111111@3,2,-50,450,150`

const mapimages = [null, null, null]
const tileGenerator = new TileGenerator(levelMap, mapimages)
const pathTiles = tileGenerator.pathTiles()
const startTile = tileGenerator.startTile()
const endTile = tileGenerator.endTile()

const path = new Path(startTile, endTile, pathTiles)

describe ('finds a pathtile', () => {
    test('if exists return the pathtile', () => {

        const startTile = new StartTile(null, 300, 300, LEFT_DIRECTION)
        const endTile = new EndTile(null, 0, 300)

        const searchTile = new PathTile(150, 300)

        const pathTiles = [
            new PathTile(100, 300),
            new PathTile(150, 300),
            new PathTile(200, 300),
        ]

        const path = new Path(startTile, endTile, pathTiles)

        const result = path.getTileInPosition(150,300)

        expect(result).toMatchObject(searchTile)



    })
})

describe('When start direction is left', () => {
    test('if there are 15 tiles consecutively to the left, the enemy moves first 15 times to left', () => {

        const expectedOrders = [LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION, LEFT_DIRECTION]
        
        const orders = path.makeOrders()

        let result = true

        if ((orders.length === 0) || (expectedOrders.length > orders.length)){
            result = false
        }

        let i = 0
        for (const order of orders){

            if (order !== expectedOrders[i]){
                result = false
                break
            }
            i++
        }
        
        expect(result).toBeTruthy()
    })

})