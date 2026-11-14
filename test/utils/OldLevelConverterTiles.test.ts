import { expect } from 'vitest'
import { Config } from '../../src/Config'
import { OldLevelConverter } from '../../src/utils/OldLevelConverter'

const oldLevelWithIce = `(48,'Blue cacao','unknown321','2020202020202020,ys1s1s1s1s1s1s12,02020202020202s0,22201s1s101s1012,0202s020s2s0s2s0,2s1sss0210121012,0120ss20s1s0s1s0,2s02020202020202,01s1s1s1s1sssssx,2020202020202020@2,2,0,50,150',1299836796,'79.159.13.189',0,52,2),`

const oldLevelWithCrystals = `(55,'with crystals','unknown','0000000000000000,y111111c00000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000@2,2,0,50,150',1297020179,'127.0.0.1',0,288,3),`

const oldLevelWithTeleports = `(56,'with teleports','unknown','0000000000000000,y11p1111q1111111,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000@2,2,0,50,150',1297020180,'127.0.0.1',0,10,3),`

const oldLevelWithJumpers = `(57,'with jumpers','unknown','0000000000000000,y1115111111111x,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000@2,2,0,50,150',1297020181,'127.0.0.1',0,10,3),`

const canBeConverted = (oldLevel: string) =>
  new OldLevelConverter(oldLevel).canBeConverted(Config.availableTiles)

test('an old level with ice tiles can be converted with the configured available tiles', () => {
  expect(canBeConverted(oldLevelWithIce)).toBeTruthy()
})

test('an old level with crystal tiles can be converted with the configured available tiles', () => {
  expect(canBeConverted(oldLevelWithCrystals)).toBeTruthy()
})

test('an old level with teleport tiles can be converted with the configured available tiles', () => {
  expect(canBeConverted(oldLevelWithTeleports)).toBeTruthy()
})

test('an old level with jumper tiles can be converted with the configured available tiles', () => {
  expect(canBeConverted(oldLevelWithJumpers)).toBeTruthy()
})

const levelWith = (rows: string[], dataMap = '2,2,0,50,150') =>
  `(99,'valid','test','${rows.join(',')}@${dataMap}',1297020181,'127.0.0.1',0,10,3),`

const emptyRow = '0000000000000000'
const validRows = [emptyRow, 'y11111111111111x', ...Array(8).fill(emptyRow)]
const withRow = (index: number, row: string) =>
  validRows.map((current, i) => (i === index ? row : current))

describe('hasValidMap', () => {
  const hasValidMap = (rows: string[]) =>
    new OldLevelConverter(levelWith(rows)).hasValidMap()

  test('a map with one x, one y and 10 rows of 16 symbols is valid', () => {
    expect(hasValidMap(validRows)).toBeTruthy()
  })

  test('a map without the tile x is not valid', () => {
    expect(hasValidMap(withRow(1, 'y11111111111111s'))).toBeFalsy()
  })

  test('a map without the tile y is not valid', () => {
    expect(hasValidMap(withRow(1, '111111111111111x'))).toBeFalsy()
  })

  test('a map with two tiles x is not valid', () => {
    expect(hasValidMap(withRow(2, 'x000000000000000'))).toBeFalsy()
  })

  test('a map with less than 10 rows is not valid', () => {
    expect(hasValidMap(validRows.slice(0, 9))).toBeFalsy()
  })

  test('a map with a row of less than 16 symbols is not valid', () => {
    expect(hasValidMap(withRow(3, '000000000000000'))).toBeFalsy()
  })

  test('a map with a teleport in and a teleport out is valid', () => {
    expect(hasValidMap(withRow(2, '0000p0000000q000'))).toBeTruthy()
  })

  test('a map with a teleport in but without teleport out is not valid', () => {
    expect(hasValidMap(withRow(2, '0000p00000000000'))).toBeFalsy()
  })

  test('a map with a teleport out but without teleport in is not valid', () => {
    expect(hasValidMap(withRow(2, '0000q00000000000'))).toBeFalsy()
  })

  test('a map with two pairs of teleports is not valid', () => {
    expect(hasValidMap(withRow(2, '00p0q0000000p0q0'))).toBeFalsy()
  })
})

describe('shouldSkipLevel with invalid maps', () => {
  test('a level with an invalid map is skipped', () => {
    const level = new OldLevelConverter(
      levelWith(withRow(1, '111111111111111x')),
    )

    expect(level.shouldSkipLevel(0, 0)).toBeTruthy()
  })
})
