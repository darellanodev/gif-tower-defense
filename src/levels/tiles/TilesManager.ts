import { TileBlack } from './TileBlack'
import { TileCrystal } from './TileCrystal'
import { TileJumper } from './TileJumper'
import { TileTeleportIn } from './TileTeleportIn'
import { TileTeleportOut } from './TileTeleportOut'
import { TileEnd } from './TileEnd'
import { TileIce } from './TileIce'
import { TileOrange } from './TileOrange'
import { TilePath } from './TilePath'
import { TileStart } from './TileStart'

export class TilesManager {
  #tilesBlack: TileBlack[] = []
  #tilesOrange: TileOrange[] = []
  #tilesPath: TilePath[] = []
  #tilesIce: TileIce[] = []
  #crystals: TileCrystal[] = []
  #tilesJumper: TileJumper[] = []
  #tilesTeleportIn: TileTeleportIn[] = []
  #tilesTeleportOut: TileTeleportOut[] = []
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

  get getAllIceTiles() {
    return this.#tilesIce
  }

  get getAllJumperTiles() {
    return this.#tilesJumper
  }

  get getAllTeleportInTiles() {
    return this.#tilesTeleportIn
  }

  get getAllTeleportOutTiles() {
    return this.#tilesTeleportOut
  }

  get getAllCrystals() {
    return this.#crystals
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

  // ice tiles are also path tiles: enemies walk over them
  addIceTile(instance: TileIce) {
    this.#tilesIce.push(instance)
    this.#tilesPath.push(instance)
  }

  // jumper tiles are also path tiles: enemies walk over them
  addJumperTile(instance: TileJumper) {
    this.#tilesJumper.push(instance)
    this.#tilesPath.push(instance)
  }

  // teleport tiles are also path tiles: enemies walk over them
  addTeleportInTile(instance: TileTeleportIn) {
    this.#tilesTeleportIn.push(instance)
    this.#tilesPath.push(instance)
  }

  addTeleportOutTile(instance: TileTeleportOut) {
    this.#tilesTeleportOut.push(instance)
    this.#tilesPath.push(instance)
  }

  addCrystal(instance: TileCrystal) {
    this.#crystals.push(instance)
  }

  removeCrystal(instance: TileCrystal) {
    this.#crystals = this.#crystals.filter((crystal) => crystal !== instance)
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
    this.#tilesIce.forEach((tileIce) => {
      tileIce.drawTile(scale, startOffsetX, startOffsetY)
    })
    this.#tilesOrange.forEach((tileOrange) => {
      tileOrange.drawTile(scale, startOffsetX, startOffsetY)
    })
    this.#tilesBlack.forEach((tileBlack) => {
      tileBlack.drawTile(scale, startOffsetX, startOffsetY)
    })
    this.#crystals.forEach((crystal) => {
      crystal.drawTile(scale, startOffsetX, startOffsetY)
    })
    this.#tilesJumper.forEach((tileJumper) => {
      tileJumper.drawTile(scale, startOffsetX, startOffsetY)
    })
    this.#tilesTeleportIn.forEach((tile) => {
      tile.drawTile(scale, startOffsetX, startOffsetY)
    })
    this.#tilesTeleportOut.forEach((tile) => {
      tile.drawTile(scale, startOffsetX, startOffsetY)
    })
  }
}
