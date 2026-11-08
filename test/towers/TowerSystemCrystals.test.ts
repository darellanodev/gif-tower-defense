import { beforeEach, describe, expect } from 'vitest'
import { MODE } from '../../src/constants/mode'
import { TOWER_ID } from '../../src/constants/tower'
import { EnemySystem } from '../../src/enemies/EnemySystem'
import { CrystalSystem } from '../../src/levels/tiles/CrystalSystem'
import { TileCrystal } from '../../src/levels/tiles/TileCrystal'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { Player } from '../../src/player/Player'
import { Wallet } from '../../src/player/Wallet'
import { StateManager } from '../../src/StateManager'
import { TowerSystem } from '../../src/towers/TowerSystem'
import { getTileOrangeCreator } from '../helpers/levelMap'
import { instantiateOrangeTile } from '../helpers/orangeTile'

// A whole flow with real objects: a green tower destroys a crystal and the player can build in its tile
const initialMoney = 100

let tilesManager: TilesManager
let wallet: Wallet
let player: Player
let towerSystem: TowerSystem
let crystalSystem: CrystalSystem
let crystal: TileCrystal

const updateGame = () => {
  towerSystem.updateTowersEnemyTarget()
  towerSystem.update()
  crystalSystem.update()
}

const addTowerTile = (towerId: 1 | 2 | 3) => {
  const orangeTile = instantiateOrangeTile()
  orangeTile.instantiateNewTower(towerId)
  tilesManager.addOrangeTile(orangeTile)
  return orangeTile
}

beforeEach(() => {
  tilesManager = new TilesManager()
  Wallet.clearInstance()
  wallet = Wallet.getInstance(MODE.NORMAL, initialMoney)
  player = Player.getInstance()
  const enemySystem = new EnemySystem(
    player,
    wallet,
    StateManager.getInstance(StateManager.STATE_PLAY_SURVIVAL),
  )
  towerSystem = new TowerSystem(tilesManager, enemySystem)
  crystalSystem = new CrystalSystem(
    tilesManager,
    getTileOrangeCreator(),
    wallet,
    player,
  )
  // the orange tile of the helper is in (100, 200): the crystal is a tile away
  crystal = new TileCrystal(null, { x: 150, y: 200 })
  tilesManager.addCrystal(crystal)
})

describe('a green tower and a crystal', () => {
  test('the crystal is not destroyed with only a few updates', () => {
    addTowerTile(TOWER_ID.GREEN)

    for (let i = 0; i < 10; i++) {
      updateGame()
    }

    expect(tilesManager.getAllCrystals).toHaveLength(1)
  })

  test('the crystal is damaged while the tower is shooting', () => {
    addTowerTile(TOWER_ID.GREEN)

    updateGame()

    expect(crystal.damage).toBeGreaterThan(0)
  })

  test('after enough updates the crystal is destroyed and the player gets the reward', () => {
    addTowerTile(TOWER_ID.GREEN)

    for (let i = 0; i < 600; i++) {
      updateGame()
    }

    expect(wallet.money).toBe(initialMoney + 75)
  })

  test('after destroying the crystal the tile is buildable: there is a new orange tile', () => {
    addTowerTile(TOWER_ID.GREEN)

    for (let i = 0; i < 600; i++) {
      updateGame()
    }

    // the tile with the tower and the new one where the crystal was
    expect(tilesManager.getAllOrangeTiles).toHaveLength(2)
  })

  test('the reward is given only once although the tower keeps updating', () => {
    addTowerTile(TOWER_ID.GREEN)

    for (let i = 0; i < 2000; i++) {
      updateGame()
    }

    expect(wallet.money).toBe(initialMoney + 75)
  })
})

describe('a red tower and a crystal', () => {
  test('the red tower does not damage the crystal', () => {
    addTowerTile(TOWER_ID.RED)

    for (let i = 0; i < 300; i++) {
      updateGame()
    }

    expect(crystal.damage).toBe(0)
  })
})
