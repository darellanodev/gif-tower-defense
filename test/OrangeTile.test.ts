import { TileOrange } from '../src/TileOrange'
import { TowerGreen } from '../src/TowerGreen'
import { Position } from '../src/types'

describe('isInside', () => {
  test('If mouse is inside, return true', () => {
    const img: any = null
    const position: Position = { x: 100, y: 200 }
    const orangeTile = new TileOrange(img, position)

    const result = orangeTile.isInside(120, 220)

    expect(result).toBeTruthy()
  })

  test('If mouse is outside, return false', () => {
    const img: any = null
    const position: Position = { x: 100, y: 200 }
    const orangeTile = new TileOrange(img, position)

    const result = orangeTile.isInside(90, 220)

    expect(result).toBeFalsy()
  })
})

describe('hasTower', () => {
  test('after buy a tower, return true', () => {
    const img: any = null
    const position: Position = { x: 100, y: 100 }
    const orangeTile = new TileOrange(img, position)

    const cost = orangeTile.buyTower(TowerGreen.ID)
    const result = orangeTile.hasTower()

    expect(result).toBeTruthy()
  })
})

describe('sell tower', () => {
  test('after buy a new tower, return selling profit (30)', () => {
    const expected = 30

    const img: any = null
    const position: Position = { x: 100, y: 100 }
    const orangeTile = new TileOrange(img, position)

    const cost = orangeTile.buyTower(TowerGreen.ID)
    const result = orangeTile.sellTower()

    expect(result).toBe(expected)
  })
})
