const TileGenerator = require('../src/TileGenerator.js')

const levelMap = `111111111111111x,
                  1000000000000000,
                  1011111111111111,
                  1010000000000001,
                  1010000111111101,
                  1011111100000101,
                  1000000000000101,
                  1111111111111101,
                  0000000000000001,
                  y111111111111111`

test('TileGenerator throws an exception when an empty string is passed to it', () => {
    expect(() => new TileGenerator('')).toThrowError('Level map string cannot be empty');
});

test('TileGenerator generate orange tiles', () => {

    const mapimages = [null, null, null]
    const tileGenerator = new TileGenerator(levelMap, mapimages)
    
    const result = tileGenerator.orangeTiles()

    expect(result).toHaveLength(71)

}) 

test('TileGenerator generate path tiles', () => {
    
    const mapimages = [null, null, null]
    const tileGenerator = new TileGenerator(levelMap, mapimages)
    
    const result = tileGenerator.pathTiles()

    expect(result).toHaveLength(87)

}) 

test('TileGenerator generate start tile', () => {

    const mapimages = [null, null, null]
    const tileGenerator = new TileGenerator(levelMap, mapimages)

    const result = tileGenerator.startTile()

    expect(result).toBeInstanceOf(Object)
})

test('TileGenerator generate end tile', () => {

    const mapimages = [null, null, null]
    const tileGenerator = new TileGenerator(levelMap, mapimages)

    const result = tileGenerator.endTile()

    expect(result).toBeInstanceOf(Object)
})