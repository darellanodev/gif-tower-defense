import { TileOrange } from './TileOrange'
import { TileStart } from './TileStart'

export class TilesManager {
  #tileOrangeInstances: TileOrange[] = []
  #tileStart: TileStart | null = null

  get getAllOrangeTiles() {
    return this.#tileOrangeInstances
  }

  get tileStart(): TileStart | null {
    return this.#tileStart
  }

  addOrangeTile(instance: TileOrange) {
    this.#tileOrangeInstances.push(instance)
  }

  set tileStart(tileStart: TileStart) {
    this.#tileStart = tileStart
  }

  updateInstances() {}
}
