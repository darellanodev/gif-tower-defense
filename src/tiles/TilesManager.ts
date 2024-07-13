import { TileOrange } from './TileOrange'

export class TilesManager {
  #tileOrangeInstances: TileOrange[] = []

  get getAllOrangeTiles() {
    return this.#tileOrangeInstances
  }

  addOrangeTile(instance: TileOrange) {
    this.#tileOrangeInstances.push(instance)
  }

  updateInstances() {}
}
