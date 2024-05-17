import { Player } from '../src/player/Player'
import { ButtonTower } from '../src/hud/ButtonTower'
import { TileOrange } from '../src/tiles/TileOrange'
import { TowerGreen } from '../src/towers/TowerGreen'
import { Position } from '../src/utils/types'
import { Wallet } from '../src/player/Wallet'

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
  const player = new Player()
  return new TileOrange(img, position, player)
}

const buyGreenTower = (orangeTile: TileOrange, wallet: Wallet) => {
  initializeButtonTower()
  wallet.buyTower(orangeTile, TowerGreen.ID)
  return orangeTile.getTower()
}

describe('isInside', () => {
  test('If mouse is inside, return true', () => {
    const img: any = null
    const position: Position = { x: 100, y: 200 }
    const player = new Player()
    const orangeTile = new TileOrange(img, position, player)

    const result = orangeTile.isInside(120, 220)

    expect(result).toBeTruthy()
  })

  test('If mouse is outside, return false', () => {
    const img: any = null
    const position: Position = { x: 100, y: 200 }
    const player = new Player()
    const orangeTile = new TileOrange(img, position, player)

    const result = orangeTile.isInside(90, 220)

    expect(result).toBeFalsy()
  })
})

describe('hasTower', () => {
  test('after buy a tower, return true', () => {
    const money = 100
    const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)
    const orangeTile = initializeOrangeTile()
    const tower = buyGreenTower(orangeTile, wallet)

    expect(orangeTile.hasTower()).toBeTruthy()
  })
})

describe('sell tower', () => {
  test('when player has 100 of money after buy a new tower of cost of 50 , return selling profit 30 so player has 80 of money', () => {
    const money = 100
    const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)
    const orangeTile = initializeOrangeTile()
    const tower = buyGreenTower(orangeTile, wallet)

    if (tower) {
      wallet.sellTower(tower)
    }

    const expected = 80
    expect(wallet.money).toBe(expected)
  })
})
