import { TileEnd } from './TileEnd'
import { TileOrange } from './TileOrange'
import { TileStart } from './TileStart'

export class TilesManager {
  #tileOrangeInstances: TileOrange[] = []
  #tileStart: TileStart | null = null
  #tileEnd: TileEnd | null = null

  get getAllOrangeTiles() {
    return this.#tileOrangeInstances
  }

  get tileStart(): TileStart | null {
    return this.#tileStart
  }
  get tileEnd(): TileEnd | null {
    return this.#tileEnd
  }

  addOrangeTile(instance: TileOrange) {
    this.#tileOrangeInstances.push(instance)
  }

  set tileStart(tileStart: TileStart) {
    this.#tileStart = tileStart
  }

  set tileEnd(tileEnd: TileEnd) {
    this.#tileEnd = tileEnd
  }
  updateInstances() {}
}
