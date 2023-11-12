const TileGenerator = require('../src/TileGenerator.js')

test('TileGenerator throws an exception when an empty string is passed to it', () => {
    expect(() => new TileGenerator('')).toThrowError('Level map string cannot be empty');
});