import { describe, expect } from 'vitest'
import { Player } from '../../src/player/Player'
import { TileOrange } from '../../src/levels/tiles/TileOrange'
import { Position } from '../../src/types/position'
import { Wallet } from '../../src/player/Wallet'
import { instantiateOrangeTile } from '../helpers/orangeTile'
import { buyGreenTower } from '../helpers/wallet'
import { img } from '../helpers/imagesResources'
import { images } from '../helpers/imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'

describe('isInside', () => {
  test('If mouse is inside, return true', () => {
    const position: Position = { x: 100, y: 200 }
    const player = Player.getInstance()
    const towerGreenCreator = TowerGreenCreator.getInstance(images)
    const towerRedCreator = TowerRedCreator.getInstance(images)
    const towerYellowCreator = TowerYellowCreator.getInstance(images, player)
    const orangeTile = new TileOrange(
      img,
      position,
      player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )

    const result = orangeTile.isInside(120, 220)

    expect(result).toBeTruthy()
  })

  test('If mouse is outside, return false', () => {
    const position: Position = { x: 100, y: 200 }
    const player = Player.getInstance()
    const towerGreenCreator = TowerGreenCreator.getInstance(images)
    const towerRedCreator = TowerRedCreator.getInstance(images)
    const towerYellowCreator = TowerYellowCreator.getInstance(images, player)
    const orangeTile = new TileOrange(
      img,
      position,
      player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )

    const result = orangeTile.isInside(90, 220)

    expect(result).toBeFalsy()
  })
})

test('hasTower, after buy a tower, return true', () => {
  Wallet.clearInstance()
  const money = 100
  const wallet = Wallet.getInstance(Wallet.GAME_NORMAL_MODE, money)
  const orangeTile = instantiateOrangeTile()
  const tower = buyGreenTower(orangeTile, wallet)

  expect(orangeTile.hasTower()).toBeTruthy()
})

test('sell tower, when player has 100 of money after buy a new tower of cost of 50 , return selling profit 30 so player has 80 of money', () => {
  Wallet.clearInstance()
  const money = 100
  const wallet = Wallet.getInstance(Wallet.GAME_NORMAL_MODE, money)
  const orangeTile = instantiateOrangeTile()
  const tower = buyGreenTower(orangeTile, wallet)

  if (tower) {
    wallet.sellTower(tower)
  }

  const expected = 80
  expect(wallet.money).toBe(expected)
})
