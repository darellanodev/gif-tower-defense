import { Player } from '../src/Player'
import { ButtonTower } from '../src/hud/ButtonTower'
import { Hud } from '../src/hud/Hud'
import { TileOrange } from '../src/tiles/TileOrange'
import { Tower } from '../src/towers/Tower'
import { TowerGreen } from '../src/towers/TowerGreen'
import { Position, TowerType } from '../src/utils/types'

const initializeButtonTower = () => {
  const BtnTowerGreenImages: any[] = [null, null, null]
  const BtnTowerRedImages: any[] = [null, null, null]
  const BtnTowerYellowImages: any[] = [null, null, null]
  ButtonTower.setImages(
    BtnTowerGreenImages,
    BtnTowerRedImages,
    BtnTowerYellowImages,
  )
  ButtonTower.initializeButtons()
}

const initializeOrangeTile = () => {
  const img: any = null
  const position: Position = { x: 100, y: 100 }
  return new TileOrange(img, position)
}

const buyGreenTower = (orangeTile: TileOrange) => {
  initializeButtonTower()
  Hud.selectTower(TowerGreen.ID)
  Player.buyTower(orangeTile)
  return orangeTile.getTower()
}

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
    Player.initialMoney = 100
    const orangeTile = initializeOrangeTile()
    const tower = buyGreenTower(orangeTile)

    expect(orangeTile.hasTower()).toBeTruthy()
  })
})

describe('sell tower', () => {
  test('when player has 100 of money after buy a new tower of cost of 50 , return selling profit 30 so player has 80 of money', () => {
    Player.initialMoney = 100
    const orangeTile = initializeOrangeTile()
    const tower = buyGreenTower(orangeTile)

    if (tower) {
      Player.sellTower(tower)
    }

    const expected = 80
    expect(Player.money).toBe(expected)
  })
})
