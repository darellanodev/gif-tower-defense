import { TileStart } from '../tiles/TileStart'
import { TileEnd } from '../tiles/TileEnd'
import { TilePath } from '../tiles/TilePath'
import { TileIce } from '../tiles/TileIce'
import { TileJumper } from '../tiles/TileJumper'
import { JumpStep } from '../../types/jumpStep'
import { TILE_SIZE } from '../../constants/tile'
import { DIRECTION } from '../../constants/direction'
import { Position } from '../../types/position'
import { AnyTile, WalkableTile } from '../../types/tileType'
import { PATH_MAX_SEARCHES } from '../../constants/orders'
import { ENEMY_ICE_SPEED_FACTOR } from '../../constants/enemy'
import { getNextDirection, WalkableNeighbours } from './PathDirection'
import { PathMovement } from './PathMovement'

export class Path {
  static orders: number[] = []
  static speedFactors: number[] = []
  static jumps: (JumpStep | null)[] = []

  // the movement of an enemy that follows the orders, the speed factors (ice) and the jumps of the level
  static createMovement(startPosition: Position, speed: number) {
    return new PathMovement(
      startPosition,
      Path.orders,
      speed,
      Path.speedFactors,
      Path.jumps,
    )
  }

  #startTile: TileStart
  #endTile: TileEnd
  #pathTiles: TilePath[]
  #orders: number[] = []
  #speedFactors: number[] = []
  #jumps: (JumpStep | null)[] = []
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
  // the orders of a jump are in the air: they have a jump step and the speed factor does not apply
  #addOrder(direction: number, jumpStep: JumpStep | null = null) {
    this.#orders.push(direction)
    this.#jumps.push(jumpStep)
    this.#speedFactors.push(
      jumpStep === null ? this.#getSpeedFactor(this.#currentTile) : 1,
    )
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

  #getNextPosition(position: Position, direction: number): Position {
    const offsets: Record<number, Position> = {
      [DIRECTION.LEFT]: { x: -TILE_SIZE, y: 0 },
      [DIRECTION.RIGHT]: { x: TILE_SIZE, y: 0 },
      [DIRECTION.UP]: { x: 0, y: -TILE_SIZE },
      [DIRECTION.DOWN]: { x: 0, y: TILE_SIZE },
    }
    const offset = offsets[direction]
    return { x: position.x + offset.x, y: position.y + offset.y }
  }

  #getNeighbour(tile: WalkableTile, direction: number): WalkableTile | null {
    return this.#getWalkableTile(
      this.#getNextPosition(tile.position, direction),
    )
  }

  // The enemy jumps straight, in the direction it arrived, over the jump distance. It lands on a walkable tile,
  // otherwise it would be blocked (the legacy game), so no jump is made and false is returned.
  #jump(jumpDistance: number): boolean {
    const direction = this.#lastDirection
    let landingPosition = this.#currentTile.position
    for (let step = 0; step < jumpDistance; step++) {
      landingPosition = this.#getNextPosition(landingPosition, direction)
    }
    const landingTile = this.#getWalkableTile(landingPosition)
    if (landingTile === null) {
      return false
    }

    for (let step = 0; step < jumpDistance; step++) {
      this.#addOrder(direction, { step, length: jumpDistance })
    }
    this.#currentTile = landingTile
    return true
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

      if (this.#currentTile instanceof TileJumper) {
        if (!this.#jump(this.#currentTile.jumpDistance)) {
          break
        }
        continue
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

  get jumps(): (JumpStep | null)[] {
    return this.#jumps
  }
}
