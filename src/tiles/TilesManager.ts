import { TileEnd } from './TileEnd'
import { TileOrange } from './TileOrange'
import { TilePath } from './TilePath'
import { TileStart } from './TileStart'

export class TilesManager {
  #tileOrangeInstances: TileOrange[] = []
  #tilePathInstances: TilePath[] = []
  #tileStart: TileStart | null = null
  #tileEnd: TileEnd | null = null

  get getAllOrangeTiles() {
    return this.#tileOrangeInstances
  }
  get getAllPathTiles() {
    return this.#tilePathInstances
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
  addPathTile(instance: TilePath) {
    this.#tilePathInstances.push(instance)
  }

  set tileStart(tileStart: TileStart) {
    this.#tileStart = tileStart
  }

  set tileEnd(tileEnd: TileEnd) {
    this.#tileEnd = tileEnd
  }
  updateInstances() {}
}