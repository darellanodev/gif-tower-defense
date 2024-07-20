import { TileEnd } from './TileEnd'
import { TileOrange } from './TileOrange'
import { TilePath } from './TilePath'
import { TileStart } from './TileStart'

export class TilesManager {
  #tilesOrange: TileOrange[] = []
  #tilesPath: TilePath[] = []
  #tileStart: TileStart | null = null
  #tileEnd: TileEnd | null = null

  get getAllOrangeTiles() {
    return this.#tilesOrange
  }
  get getAllPathTiles() {
    return this.#tilesPath
  }

  get tileStart(): TileStart | null {
    return this.#tileStart
  }
  get tileEnd(): TileEnd | null {
    return this.#tileEnd
  }

  addOrangeTile(instance: TileOrange) {
    this.#tilesOrange.push(instance)
  }
  addPathTile(instance: TilePath) {
    this.#tilesPath.push(instance)
  }

  set tileStart(tileStart: TileStart) {
    this.#tileStart = tileStart
  }

  set tileEnd(tileEnd: TileEnd) {
    this.#tileEnd = tileEnd
  }

  drawAll() {
    if (this.#tileStart === null || this.#tileEnd === null) {
      throw new Error('Error: tileStart or tileEnd is null')
    }
    this.#tileStart.draw()
    this.#tileEnd.draw()
    this.#tilesOrange.forEach((tileOrange) => {
      tileOrange.drawTile()
    })
  }
}
