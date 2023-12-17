import { OrangeTile } from '../src/OrangeTile'
import { Const } from '../src/Const'
import { GreenTower } from '../src/GreenTower'
import { RedTower } from '../src/RedTower'
import { YellowTower } from '../src/YellowTower'
import { UpgradeDisplay } from '../src/UpgradeDisplay'
import { Distance } from '../src/Distance'

const greenTowerImages: any[] = [null, null, null]
const redTowerImages: any[] = [null, null, null]
const yellowTowerImages: any[] = [null, null, null]

describe('When clic over an orange tile', () => {
  test('If mouse is inside should return true', () => {
    const img: any = null
    const orangeTile = new OrangeTile(
      img,
      100,
      200,
      greenTowerImages,
      redTowerImages,
      yellowTowerImages,
      Const,
      GreenTower,
      RedTower,
      YellowTower,
      UpgradeDisplay,
      Distance,
    )

    const result = orangeTile.isInside(120, 220)

    expect(result).toBeTruthy()
  })

  test('If mouse is outside should return false', () => {
    const img: any = null
    const orangeTile = new OrangeTile(
      img,
      100,
      200,
      greenTowerImages,
      redTowerImages,
      yellowTowerImages,
      Const,
      GreenTower,
      RedTower,
      YellowTower,
      UpgradeDisplay,
      Distance,
    )

    const result = orangeTile.isInside(90, 220)

    expect(result).toBeFalsy()
  })
})

describe('Other methods of the orange tile', () => {
  test('should return true when has a tower', () => {
    const img: any = null
    const orangeTile = new OrangeTile(
      img,
      100,
      100,
      greenTowerImages,
      redTowerImages,
      yellowTowerImages,
      Const,
      GreenTower,
      RedTower,
      YellowTower,
      UpgradeDisplay,
      Distance,
    )

    const cost = orangeTile.buyTower(Const.GREEN_TOWER)
    const result = orangeTile.hasTower()

    expect(result).toBeTruthy()
  })
  test('have money to buy a green tower', () => {
    const img: any = null
    const orangeTile = new OrangeTile(
      img,
      100,
      100,
      greenTowerImages,
      redTowerImages,
      yellowTowerImages,
      Const,
      GreenTower,
      RedTower,
      YellowTower,
      UpgradeDisplay,
      Distance,
    )

    const result = orangeTile.haveMoneyToBuy(Const.GREEN_TOWER, 60)

    expect(result).toBeTruthy()
  })
  test('have no money to buy a green tower', () => {
    const img: any = null
    const orangeTile = new OrangeTile(
      img,
      100,
      100,
      greenTowerImages,
      redTowerImages,
      yellowTowerImages,
      Const,
      GreenTower,
      RedTower,
      YellowTower,
      UpgradeDisplay,
      Distance,
    )

    const result = orangeTile.haveMoneyToBuy(Const.GREEN_TOWER, 30)

    expect(result).toBeFalsy()
  })
  test('get profit when sell a tower', () => {
    const expected = 50

    const img: any = null
    const orangeTile = new OrangeTile(
      img,
      100,
      100,
      greenTowerImages,
      redTowerImages,
      yellowTowerImages,
      Const,
      GreenTower,
      RedTower,
      YellowTower,
      UpgradeDisplay,
      Distance,
    )

    const cost = orangeTile.buyTower(Const.GREEN_TOWER)
    const result = orangeTile.sellTower()

    expect(result).toBe(expected)
  })
})
