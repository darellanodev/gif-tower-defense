import { TileBlack } from './TileBlack'
import { TileEnd } from './TileEnd'
import { TileOrange } from './TileOrange'
import { TilePath } from './TilePath'
import { TileStart } from './TileStart'

export class TilesManager {
  #tilesBlack: TileBlack[] = []
  #tilesOrange: TileOrange[] = []
  #tilesPath: TilePath[] = []
  #tileStart: TileStart | null = null
  #tileEnd: TileEnd | null = null

  get getAllOrangeTiles() {
    return this.#tilesOrange
  }
  get getAllBlackTiles() {
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
  addBlackTile(instance: TileBlack) {
    this.#tilesBlack.push(instance)
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

  drawAll(scale = 1, startOffsetX = 0, startOffsetY = 0) {
    if (this.#tileStart === null || this.#tileEnd === null) {
      throw new Error('Error: tileStart or tileEnd is null')
    }

    this.#tileStart.draw(scale, startOffsetX, startOffsetY)
    this.#tileEnd.draw(scale, startOffsetX, startOffsetY)
    this.#tilesOrange.forEach((tileOrange) => {
      tileOrange.drawTile(scale, startOffsetX, startOffsetY)
    })
    this.#tilesBlack.forEach((tileBlack) => {
      tileBlack.drawTile(scale, startOffsetX, startOffsetY)
    })
  }
}
