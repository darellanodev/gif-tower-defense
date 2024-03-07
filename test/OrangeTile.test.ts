import { OrangeTile } from '../src/OrangeTile'
import { GreenTower } from '../src/GreenTower'
import { RedTower } from '../src/RedTower'
import { YellowTower } from '../src/YellowTower'
import { MathUtils } from '../src/MathUtils'
import { TowerGenerator } from '../src/TowerGenerator'
import { ProgressBar } from '../src/ProgressBar'
import { Position } from '../src/types'

const greenTowerImages: any[] = [null, null, null]
const redTowerImages: any[] = [null, null, null]
const yellowTowerImages: any[] = [null, null, null]

const towerGenerator = new TowerGenerator(
  greenTowerImages,
  redTowerImages,
  yellowTowerImages,
  GreenTower,
  RedTower,
  YellowTower,
  MathUtils,
  ProgressBar,
)

describe('When clic over an orange tile', () => {
  test('If mouse is inside should return true', () => {
    const img: any = null
    const position: Position = { x: 100, y: 200 }
    const orangeTile = new OrangeTile(img, position, towerGenerator)

    const result = orangeTile.isInside(120, 220)

    expect(result).toBeTruthy()
  })

  test('If mouse is outside should return false', () => {
    const img: any = null
    const position: Position = { x: 100, y: 200 }
    const orangeTile = new OrangeTile(img, position, towerGenerator)

    const result = orangeTile.isInside(90, 220)

    expect(result).toBeFalsy()
  })
})

describe('Other methods of the orange tile', () => {
  test('should return true when has a tower', () => {
    const img: any = null
    const position: Position = { x: 100, y: 100 }
    const orangeTile = new OrangeTile(img, position, towerGenerator)

    const cost = orangeTile.buyTower(GreenTower.ID)
    const result = orangeTile.hasTower()

    expect(result).toBeTruthy()
  })

  test('get profit when sell a tower', () => {
    const expected = 30

    const img: any = null
    const position: Position = { x: 100, y: 100 }
    const orangeTile = new OrangeTile(img, position, towerGenerator)

    const cost = orangeTile.buyTower(GreenTower.ID)
    const result = orangeTile.sellTower()

    expect(result).toBe(expected)
  })
})
