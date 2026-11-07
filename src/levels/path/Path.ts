import { TileStart } from '../tiles/TileStart'
import { TileEnd } from '../tiles/TileEnd'
import { TilePath } from '../tiles/TilePath'
import { TileIce } from '../tiles/TileIce'
import { TILE_SIZE } from '../../constants/tile'
import { DIRECTION } from '../../constants/direction'
import { Position } from '../../types/position'
import { AnyTile, WalkableTile } from '../../types/tileType'
import { PATH_MAX_SEARCHES } from '../../constants/orders'
import { ENEMY_ICE_SPEED_FACTOR } from '../../constants/enemy'
import { getNextDirection, WalkableNeighbours } from './PathDirection'

export class Path {
  static orders: number[] = []
  static speedFactors: number[] = []

  #startTile: TileStart
  #endTile: TileEnd
  #pathTiles: TilePath[]
  #orders: number[] = []
  #speedFactors: number[] = []
  #currentTile: WalkableTile
  // direction of the last order (the one used to arrive to the current tile)
  #lastDirection: number
  #hasReachedEnd: boolean = false

  constructor(startTile: TileStart, endTile: TileEnd, pathTiles: TilePath[]) {
    this.#startTile = startTile
    this.#endTile = endTile
    this.#pathTiles = pathTiles

    this.#currentTile = this.#startTile
    this.#lastDirection = this.#startTile.getStartDirection()
  }

  // every order has a speed factor: the one of the tile the enemy is leaving
  #addOrder(direction: number) {
    this.#orders.push(direction)
    this.#speedFactors.push(this.#getSpeedFactor(this.#currentTile))
  }

  #getSpeedFactor(tile: AnyTile) {
    return tile instanceof TileIce ? ENEMY_ICE_SPEED_FACTOR : 1
  }

  get endReached(): boolean {
    return this.#hasReachedEnd
  }

  getTilePath(tx: number, ty: number): TilePath | null {
    const pathTile = this.#pathTiles.find(
      (pathTile) => tx === pathTile.position.x && ty === pathTile.position.y,
    )

    return pathTile ? pathTile : null
  }

  #isTileEnd(tx: number, ty: number): boolean {
    return this.#endTile.position.x === tx && this.#endTile.position.y === ty
  }

  #isTileStart(tx: number, ty: number): boolean {
    return (
      this.#startTile.position.x === tx && this.#startTile.position.y === ty
    )
  }

  getTileEnd(tx: number, ty: number): TileEnd | null {
    if (this.#isTileEnd(tx, ty)) {
      return this.#endTile
    }
    return null
  }

  // the start and the end tiles are also walkable, like in the legacy game
  #getWalkableTile(pos: Position): WalkableTile | null {
    const tilePath = this.getTilePath(pos.x, pos.y)
    if (tilePath !== null) {
      return tilePath
    }
    if (this.#isTileEnd(pos.x, pos.y)) {
      return this.#endTile
    }
    if (this.#isTileStart(pos.x, pos.y)) {
      return this.#startTile
    }
    return null
  }

  #getNeighbourPosition(tile: WalkableTile, direction: number): Position {
    const offsets: Record<number, Position> = {
      [DIRECTION.LEFT]: { x: -TILE_SIZE, y: 0 },
      [DIRECTION.RIGHT]: { x: TILE_SIZE, y: 0 },
      [DIRECTION.UP]: { x: 0, y: -TILE_SIZE },
      [DIRECTION.DOWN]: { x: 0, y: TILE_SIZE },
    }
    const offset = offsets[direction]
    return { x: tile.position.x + offset.x, y: tile.position.y + offset.y }
  }

  #getNeighbour(tile: WalkableTile, direction: number): WalkableTile | null {
    return this.#getWalkableTile(this.#getNeighbourPosition(tile, direction))
  }

  #getWalkableNeighbours(tile: WalkableTile): WalkableNeighbours {
    return {
      left: this.#getNeighbour(tile, DIRECTION.LEFT) !== null,
      right: this.#getNeighbour(tile, DIRECTION.RIGHT) !== null,
      up: this.#getNeighbour(tile, DIRECTION.UP) !== null,
      down: this.#getNeighbour(tile, DIRECTION.DOWN) !== null,
    }
  }

  #moveTo(direction: number) {
    const neighbour = this.#getNeighbour(this.#currentTile, direction)
    if (neighbour === null) {
      throw new Error('the neighbour tile should be walkable')
    }
    this.#addOrder(direction)
    this.#currentTile = neighbour
    this.#lastDirection = direction
  }

  makeOrders() {
    // the first time it goes in the start direction one tile only, from out of the startTile to the startTile.
    this.#addOrder(this.#lastDirection)

    let direction: number | null = this.#lastDirection
    let searchCount = 0
    while (searchCount < PATH_MAX_SEARCHES && !this.#hasReachedEnd) {
      searchCount++
      this.#hasReachedEnd = this.#isTileEnd(
        this.#currentTile.position.x,
        this.#currentTile.position.y,
      )
      if (this.#hasReachedEnd) {
        break
      }

      direction = getNextDirection(
        direction,
        this.#getWalkableNeighbours(this.#currentTile),
      )
      // when there is no direction (dead end) the enemy waits, and the next time it can go back
      if (direction !== null) {
        this.#moveTo(direction)
      }
    }

    // finally we add the same direction two more times, from reached endtile to outside
    if (this.#hasReachedEnd) {
      this.#addOrder(this.#lastDirection)
      this.#addOrder(this.#lastDirection)
    }
  }

  get orders(): number[] {
    return this.#orders
  }

  get speedFactors(): number[] {
    return this.#speedFactors
  }
}
