import { beforeEach, describe, expect } from 'vitest'
import { MODE } from '../../src/constants/mode'
import { CrystalSystem } from '../../src/levels/tiles/CrystalSystem'
import { TileCrystal } from '../../src/levels/tiles/TileCrystal'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { Player } from '../../src/player/Player'
import { Wallet } from '../../src/player/Wallet'
import { getTileOrangeCreator } from '../helpers/levelMap'

const initialMoney = 100
const crystalPosition = { x: 150, y: 180 }

let tilesManager: TilesManager
let wallet: Wallet
let player: Player
let crystalSystem: CrystalSystem
let crystal: TileCrystal

beforeEach(() => {
  tilesManager = new TilesManager()
  Wallet.clearInstance()
  wallet = Wallet.getInstance(MODE.NORMAL, initialMoney)
  player = Player.getInstance()
  crystal = new TileCrystal(null, crystalPosition)
  tilesManager.addCrystal(crystal)
  crystalSystem = new CrystalSystem(
    tilesManager,
    getTileOrangeCreator(),
    wallet,
    player,
  )
})

describe('when the crystal is alive', () => {
  test('the crystal is not removed', () => {
    crystalSystem.update()

    expect(tilesManager.getAllCrystals).toStrictEqual([crystal])
  })

  test('no orange tile is created', () => {
    crystalSystem.update()

    expect(tilesManager.getAllOrangeTiles).toHaveLength(0)
  })

  test('the money does not change', () => {
    crystalSystem.update()

    expect(wallet.money).toBe(initialMoney)
  })
})

describe('when the crystal is destroyed', () => {
  beforeEach(() => {
    crystal.addDamage(10000)
  })

  test('the crystal is removed', () => {
    crystalSystem.update()

    expect(tilesManager.getAllCrystals).toHaveLength(0)
  })

  test('the player gets the money of the crystal', () => {
    crystalSystem.update()

    expect(wallet.money).toBe(initialMoney + 75)
  })

  test('the player gets the score of the crystal', () => {
    const scoreBefore = player.score

    crystalSystem.update()

    expect(player.score).toBe(scoreBefore + 75)
  })

  test('an orange tile is created in the same position, so the player can build there', () => {
    crystalSystem.update()

    const orangeTiles = tilesManager.getAllOrangeTiles
    expect(orangeTiles.map((tile) => tile.position)).toStrictEqual([
      crystalPosition,
    ])
  })

  test('the reward is given only once', () => {
    crystalSystem.update()
    crystalSystem.update()

    expect(wallet.money).toBe(initialMoney + 75)
  })
})

describe('when there are several crystals', () => {
  test('only the destroyed crystals are replaced', () => {
    const otherCrystal = new TileCrystal(null, { x: 300, y: 180 })
    tilesManager.addCrystal(otherCrystal)
    crystal.addDamage(10000)

    crystalSystem.update()

    expect(tilesManager.getAllCrystals).toStrictEqual([otherCrystal])
  })
})
