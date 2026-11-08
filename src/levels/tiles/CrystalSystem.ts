import { Player } from '../../player/Player'
import { Wallet } from '../../player/Wallet'
import { TileCrystal } from './TileCrystal'
import { TileOrangeCreator } from './creators/TileOrangeCreator'
import { TilesManager } from './TilesManager'

// Handles the crystals destroyed by the towers: the player gets the reward and the tile becomes buildable
export class CrystalSystem {
  #tilesManager: TilesManager
  #tileOrangeCreator: TileOrangeCreator
  #wallet: Wallet
  #player: Player

  constructor(
    tilesManager: TilesManager,
    tileOrangeCreator: TileOrangeCreator,
    wallet: Wallet,
    player: Player,
  ) {
    this.#tilesManager = tilesManager
    this.#tileOrangeCreator = tileOrangeCreator
    this.#wallet = wallet
    this.#player = player
  }

  update() {
    this.#tilesManager.getAllCrystals
      .filter((crystal) => crystal.isDead)
      .forEach((crystal) => this.#destroyCrystal(crystal))
  }

  #destroyCrystal(crystal: TileCrystal) {
    this.#wallet.increaseMoney(crystal.reward)
    this.#player.increaseScore(crystal.score)
    this.#tilesManager.removeCrystal(crystal)
    this.#tileOrangeCreator.createAt(this.#tilesManager, crystal.position)
  }
}
