import { TileStart } from '../tiles/TileStart'
import { TileEnd } from '../tiles/TileEnd'
import { TilePath } from '../tiles/TilePath'
import { Const } from '../constants/Const'
import { ConstDirection } from '../constants/ConstDirection'

export class Path {
  static MAX_SEARCHES = 1000 // For testing purposes put a low value. For production put this value at 5000
  static orders: number[] = []

  #startTile: TileStart
  #endTile: TileEnd
  #pathTiles: TilePath[]
  #orders: number[] = []
  #currentTile: TilePath
  #currentDirection: number
  #endReached: boolean = false

  constructor(startTile: TileStart, endTile: TileEnd, pathTiles: TilePath[]) {
    this.#startTile = startTile
    this.#endTile = endTile
    this.#pathTiles = pathTiles

    const startTilePosition = this.#startTile.position

    this.#currentTile = new TilePath({
      x: startTilePosition.x,
      y: startTilePosition.y,
    })

    this.#currentDirection = this.#startTile.getStartDirection()
  }
  get endReached(): boolean {
    return this.#endReached
  }

  getTilePath(tx: number, ty: number): TilePath | null {
    const pathTile = this.#pathTiles.find(
      (pathTile) => tx === pathTile.position.x && ty === pathTile.position.y,
    )

    return pathTile ? pathTile : null
  }

  getTileEnd(tx: number, ty: number): TileEnd | null {
    if (this.#endTile.position.x === tx && this.#endTile.position.y === ty) {
      return this.#endTile
    }
    return null
  }
  #searchLeftTile(currentTile: any): TilePath | TileEnd | null {
    const searchPx = currentTile.position.x - Const.TILE_SIZE
    const searchPy = currentTile.position.y
    const tilePath = this.getTilePath(searchPx, searchPy)
    if (tilePath === null) {
      const endTile = this.getTileEnd(searchPx, searchPy)
      return endTile
    } else {
      return tilePath
    }
  }

  #searchDownTile(currentTile: any) {
    const searchPx = currentTile.position.x
    const searchPy = currentTile.position.y + Const.TILE_SIZE
    const tilePath = this.getTilePath(searchPx, searchPy)
    if (tilePath === null) {
      const endTile = this.getTileEnd(searchPx, searchPy)
      return endTile
    } else {
      return tilePath
    }
  }

  #searchRightTile(currentTile: any) {
    const searchPx = currentTile.position.x + Const.TILE_SIZE
    const searchPy = currentTile.position.y
    const tilePath = this.getTilePath(searchPx, searchPy)
    if (tilePath === null) {
      const endTile = this.getTileEnd(searchPx, searchPy)
      return endTile
    } else {
      return tilePath
    }
  }

  #searchUpTile(currentTile: any) {
    const searchPx = currentTile.position.x
    const searchPy = currentTile.position.y - Const.TILE_SIZE
    const tilePath = this.getTilePath(searchPx, searchPy)
    if (tilePath === null) {
      const endTile = this.getTileEnd(searchPx, searchPy)
      return endTile
    } else {
      return tilePath
    }
  }

  #checkEndTile() {
    const searchPx = this.#currentTile.position.x
    const searchPy = this.#currentTile.position.y

    const endPosition = this.#endTile.position

    const endPx = endPosition.x
    const endPy = endPosition.y

    if (searchPx === endPx && searchPy === endPy) {
      this.#endReached = true
    }
  }

  #processLeftDirection() {
    this.#checkEndTile()

    if (!this.#endReached) {
      const searchTile = this.#searchLeftTile(this.#currentTile)

      if (searchTile !== null) {
        this.#orders.push(ConstDirection.LEFT)
        this.#currentTile = searchTile
      } else {
        // It is preferred to go first down and if it is not possible to go up
        const searchNextTile = this.#searchDownTile(this.#currentTile)
        if (searchNextTile) {
          this.#currentDirection = ConstDirection.DOWN
        } else {
          this.#currentDirection = ConstDirection.UP
        }
      }
    } else {
      this.#orders.push(this.#currentDirection)
    }
  }

  #processDownDirection() {
    this.#checkEndTile()

    if (!this.#endReached) {
      const searchTile = this.#searchDownTile(this.#currentTile)

      if (searchTile !== null) {
        this.#orders.push(ConstDirection.DOWN)
        this.#currentTile = searchTile
      } else {
        // It is preferred to go first to the right and if it is not possible to the left
        const searchNextTile = this.#searchRightTile(this.#currentTile)
        if (searchNextTile) {
          this.#currentDirection = ConstDirection.RIGHT
        } else {
          this.#currentDirection = ConstDirection.LEFT
        }
      }
    } else {
      this.#orders.push(this.#currentDirection)
    }
  }

  #proccessRightDirection() {
    this.#checkEndTile()

    if (!this.#endReached) {
      const searchTile = this.#searchRightTile(this.#currentTile)
      if (searchTile !== null) {
        this.#orders.push(ConstDirection.RIGHT)
        this.#currentTile = searchTile
      } else {
        // It is preferred to go first up and if it is not possible to go down
        const searchNextTile = this.#searchUpTile(this.#currentTile)
        if (searchNextTile) {
          this.#currentDirection = ConstDirection.UP
        } else {
          this.#currentDirection = ConstDirection.DOWN
        }
      }
    } else {
      this.#orders.push(this.#currentDirection)
    }
  }

  #processUpDirection() {
    this.#checkEndTile()

    if (!this.#endReached) {
      const searchTile = this.#searchUpTile(this.#currentTile)

      if (searchTile !== null) {
        this.#orders.push(ConstDirection.UP)
        this.#currentTile = searchTile
      } else {
        // It is preferred to go first left and if it is not possible to go right
        const searchNextTile = this.#searchLeftTile(this.#currentTile)
        if (searchNextTile) {
          this.#currentDirection = ConstDirection.LEFT
        } else {
          this.#currentDirection = ConstDirection.RIGHT
        }
      }
    } else {
      this.#orders.push(this.#currentDirection)
    }
  }

  makeOrders() {
    // the first time it goes in the same direction than this.#currentDirection one tile only, from out of the startTile to the startTile.
    this.#orders.push(this.#currentDirection)

    let searchCount = 0
    while (searchCount < Path.MAX_SEARCHES && !this.#endReached) {
      searchCount++
      if (this.#currentDirection === ConstDirection.LEFT) {
        this.#processLeftDirection()
      }

      if (this.#currentDirection === ConstDirection.DOWN) {
        this.#processDownDirection()
      }

      if (this.#currentDirection === ConstDirection.RIGHT) {
        this.#proccessRightDirection()
      }

      if (this.#currentDirection === ConstDirection.UP) {
        this.#processUpDirection()
      }
    }

    // finally we add the same direction one mor time, from reached endtile to outside
    if (this.#endReached) {
      this.#orders.push(this.#currentDirection)
    }

    return this.#orders
  }
}
