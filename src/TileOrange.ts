import { TowerType, Position } from './types'
import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Const } from './Const'
import { Tile } from './Tile'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'

export class TileOrange extends Tile {
  static instances: TileOrange[] = []

  #img: Image
  #tower: TowerType = null

  constructor(img: Image, position: Position) {
    super(position)
    this.#img = img
  }

  sellTower() {
    let profit = 0

    if (this.#tower) {
      profit = this.#tower.sellProfit
      this.#tower = null
    }
    return profit
  }

  buyTower(towerId: number) {
    if (this.#tower === null) {
      switch (towerId) {
        case TowerGreen.ID:
          this.#tower = TowerGreen.instantiate(this.position)
          break
        case TowerRed.ID:
          this.#tower = TowerRed.instantiate(this.position)
          break
        case TowerYellow.ID:
          this.#tower = TowerYellow.instantiate(this.position, this)
          break
      }
    } else {
      this.#tower.upgrade()
    }
    return this.#tower.cost
  }

  _upgradeTower() {
    if (this.#tower) {
      this.#tower.upgrade()
    }
  }

  drawTile() {
    image(this.#img, this.position.x, this.position.y)
  }

  drawTower() {
    if (this.#tower) {
      this.#tower.draw()
    }
  }

  selectTarget(enemies: Enemy[]) {
    if (this.#tower) {
      if (this.#tower.type === TowerYellow.ID) {
        if ('selectAllExplosionsTargets' in this.#tower) {
          this.#tower.selectAllExplosionsTargets()
        }
      }
      this.#tower.selectTarget(enemies)
    }
  }

  isInside(mouse_x: number, mouse_y: number) {
    let insideX = false
    let insideY = false

    if (
      this.position.x < mouse_x &&
      this.position.x + Const.TILE_SIZE > mouse_x
    ) {
      insideX = true
    }
    if (
      this.position.y < mouse_y &&
      this.position.y + Const.TILE_SIZE > mouse_y
    ) {
      insideY = true
    }

    if (insideX && insideY) {
      return true
    }
    return false
  }

  hasTower() {
    return this.#tower !== null
  }

  getTower() {
    if (this.hasTower()) {
      return this.#tower
    }
    return null
  }
}
