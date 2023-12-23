import { OrangeTile } from '../src/OrangeTile'
import { Const } from '../src/Const'
import { GreenTower } from '../src/GreenTower'
import { RedTower } from '../src/RedTower'
import { YellowTower } from '../src/YellowTower'
import { Distance } from '../src/Distance'
import { TowerGenerator } from '../src/TowerGenerator'
import { ProgressBar } from '../src/ProgressBar'

const greenTowerImages: any[] = [null, null, null]
const redTowerImages: any[] = [null, null, null]
const yellowTowerImages: any[] = [null, null, null]

const towerGenerator = new TowerGenerator(
  greenTowerImages,
  redTowerImages,
  yellowTowerImages,
  Const,
  GreenTower,
  RedTower,
  YellowTower,
  Distance,
  ProgressBar,
)

describe('When clic over an orange tile', () => {
  test('If mouse is inside should return true', () => {
    const img: any = null
    const orangeTile = new OrangeTile(img, 100, 200, Const, towerGenerator)

    const result = orangeTile.isInside(120, 220)

    expect(result).toBeTruthy()
  })

  test('If mouse is outside should return false', () => {
    const img: any = null
    const orangeTile = new OrangeTile(img, 100, 200, Const, towerGenerator)

    const result = orangeTile.isInside(90, 220)

    expect(result).toBeFalsy()
  })
})

describe('Other methods of the orange tile', () => {
  test('should return true when has a tower', () => {
    const img: any = null
    const orangeTile = new OrangeTile(img, 100, 100, Const, towerGenerator)

    const cost = orangeTile.buyTower(Const.GREEN_TOWER)
    const result = orangeTile.hasTower()

    expect(result).toBeTruthy()
  })

  test('get profit when sell a tower', () => {
    const expected = 50

    const img: any = null
    const orangeTile = new OrangeTile(img, 100, 100, Const, towerGenerator)

    const cost = orangeTile.buyTower(Const.GREEN_TOWER)
    const result = orangeTile.sellTower()

    expect(result).toBe(expected)
  })
})
