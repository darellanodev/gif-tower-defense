import { TileStart } from '../tiles/TileStart'
import { TileEnd } from '../tiles/TileEnd'
import { TilePath } from '../tiles/TilePath'
import { Const } from '../constants/Const'
import { ConstDirection } from '../constants/ConstDirection'
import { Position } from '../types/position'

export class Path {
  static MAX_SEARCHES = 5000 // For testing purposes put a low value. For production put this value at 5000
  static orders: number[] = []
  static startTile: TileStart
  static endTile: TileEnd
  static initialEnemiesPosition: Position

  #startTile: TileStart
  #endTile: TileEnd
  #pathTiles: TilePath[]

  constructor(startTile: TileStart, endTile: TileEnd, pathTiles: TilePath[]) {
    this.#startTile = startTile
    this.#endTile = endTile
    this.#pathTiles = pathTiles
  }

  getEnemiesInitialPosition() {
    let finalX = 0
    let finalY = 0

    if (this.#startTile.getStartDirection() === ConstDirection.LEFT) {
      const finalPosition = this.#startTile.position
      finalX = finalPosition.x + Const.TILE_SIZE
      finalY = finalPosition.y
    }

    return { x: finalX, y: finalY }
  }

  getTileInPosition(tx: number, ty: number) {
    const pathTile = this.#pathTiles.find(
      (pathTile) => tx === pathTile.position.x && ty === pathTile.position.y,
    )

    return pathTile ? pathTile : null
  }

  #searchLeftTile(currentTile: any) {
    const searchPx = currentTile.position.x - Const.TILE_SIZE
    const searchPy = currentTile.position.y
    return this.getTileInPosition(searchPx, searchPy)
  }

  #searchDownTile(currentTile: any) {
    const searchPx = currentTile.position.x
    const searchPy = currentTile.position.y + Const.TILE_SIZE
    return this.getTileInPosition(searchPx, searchPy)
  }

  #searchRightTile(currentTile: any) {
    const searchPx = currentTile.position.x + Const.TILE_SIZE
    const searchPy = currentTile.position.y
    return this.getTileInPosition(searchPx, searchPy)
  }

  #searchUpTile(currentTile: any) {
    const searchPx = currentTile.position.x
    const searchPy = currentTile.position.y - Const.TILE_SIZE
    return this.getTileInPosition(searchPx, searchPy)
  }

  _isLeftTileEnd(currentTile: any) {
    const searchPx = currentTile.position.x - Const.TILE_SIZE
    const searchPy = currentTile.position.y

    const endPosition = this.#endTile.position

    const endPx = endPosition.x
    const endPy = endPosition.y

    if (searchPx === endPx && searchPy === endPy) {
      return true
    }
    return false
  }

  makeOrders() {
    const orders = []

    const startTilePosition = this.#startTile.position

    let currentTile: TilePath = new TilePath({
      x: startTilePosition.x,
      y: startTilePosition.y,
    })
    let currentDirection = this.#startTile.getStartDirection()

    // the first time it goes in the same direction than currentDirection one tile only, from out of the startTile to the startTile.
    orders.push(currentDirection)

    let endReached = false
    let searchCount = 0
    while (searchCount < Path.MAX_SEARCHES && !endReached) {
      searchCount++
      if (currentDirection === ConstDirection.LEFT) {
        const isLeftTileEnd = this._isLeftTileEnd(currentTile)

        if (isLeftTileEnd) {
          endReached = true
          orders.push(ConstDirection.LEFT)
        } else {
          const searchTile = this.#searchLeftTile(currentTile)

          if (searchTile) {
            orders.push(ConstDirection.LEFT)
            currentTile = searchTile
          } else {
            // It is preferred to go first down and if it is not possible to go up
            const searchNextTile = this.#searchDownTile(currentTile)
            if (searchNextTile) {
              currentDirection = ConstDirection.DOWN
            } else {
              currentDirection = ConstDirection.UP
            }
          }
        }
      }

      if (currentDirection === ConstDirection.DOWN) {
        const searchTile = this.#searchDownTile(currentTile)

        if (searchTile) {
          orders.push(ConstDirection.DOWN)
          currentTile = searchTile
        } else {
          // It is preferred to go first to the right and if it is not possible to the left
          const searchNextTile = this.#searchRightTile(currentTile)
          if (searchNextTile) {
            currentDirection = ConstDirection.RIGHT
          } else {
            currentDirection = ConstDirection.LEFT
          }
        }
      }

      if (currentDirection === ConstDirection.RIGHT) {
        const searchTile = this.#searchRightTile(currentTile)

        if (searchTile) {
          orders.push(ConstDirection.RIGHT)
          currentTile = searchTile
        } else {
          // It is preferred to go first up and if it is not possible to go down
          const searchNextTile = this.#searchUpTile(currentTile)
          if (searchNextTile) {
            currentDirection = ConstDirection.UP
          } else {
            currentDirection = ConstDirection.DOWN
          }
        }
      }

      if (currentDirection === ConstDirection.UP) {
        const searchTile = this.#searchUpTile(currentTile)

        if (searchTile) {
          orders.push(ConstDirection.UP)
          currentTile = searchTile
        } else {
          // It is preferred to go first left and if it is not possible to go right
          const searchNextTile = this.#searchLeftTile(currentTile)
          if (searchNextTile) {
            currentDirection = ConstDirection.LEFT
          } else {
            currentDirection = ConstDirection.RIGHT
          }
        }
      }
    }

    // finally we add the same direction one mor time, from reached endtile to outside
    if (endReached) {
      orders.push(currentDirection)
    }

    // cant reach the end because we spent all searchCount
    if (searchCount === Path.MAX_SEARCHES) {
      return []
    }

    return orders
  }
}
