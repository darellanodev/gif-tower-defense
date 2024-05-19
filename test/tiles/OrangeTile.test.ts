import { Player } from '../../src/player/Player'
import { TileOrange } from '../../src/tiles/TileOrange'
import { Position } from '../../src/types/position'
import { Wallet } from '../../src/player/Wallet'
import { instantiateOrangeTile } from '../helpers/orangeTile'
import { buyGreenTower } from '../helpers/wallet'
import { img } from '../helpers/imagesResources'

describe('isInside', () => {
  test('If mouse is inside, return true', () => {
    const position: Position = { x: 100, y: 200 }
    const player = new Player()
    const orangeTile = new TileOrange(img, position, player)

    const result = orangeTile.isInside(120, 220)

    expect(result).toBeTruthy()
  })

  test('If mouse is outside, return false', () => {
    const position: Position = { x: 100, y: 200 }
    const player = new Player()
    const orangeTile = new TileOrange(img, position, player)

    const result = orangeTile.isInside(90, 220)

    expect(result).toBeFalsy()
  })
})

test('hasTower, after buy a tower, return true', () => {
  const money = 100
  const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)
  const orangeTile = instantiateOrangeTile()
  const tower = buyGreenTower(orangeTile, wallet)

  expect(orangeTile.hasTower()).toBeTruthy()
})

test('sell tower, when player has 100 of money after buy a new tower of cost of 50 , return selling profit 30 so player has 80 of money', () => {
  const money = 100
  const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)
  const orangeTile = instantiateOrangeTile()
  const tower = buyGreenTower(orangeTile, wallet)

  if (tower) {
    wallet.sellTower(tower)
  }

  const expected = 80
  expect(wallet.money).toBe(expected)
})
