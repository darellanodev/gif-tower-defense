import { TowerType, Position } from './types'
import { TowerGenerator } from './TowerGenerator'
import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Const } from './Const'

export class OrangeTile {
  #img: Image
  #position: Position
  #towerGenerator: TowerGenerator

  #tower: TowerType = null

  constructor(img: Image, position: Position, towerGenerator: TowerGenerator) {
    this.#img = img
    this.#position = { ...position }
    this.#towerGenerator = towerGenerator
  }

  sellTower() {
    let profit = 0

    if (this.#tower) {
      profit = this.#tower.getSellProfit()
      this.#tower = null
    }
    return profit
  }

  buyTower(towerId: number) {
    if (this.#tower === null) {
      this.#tower = this.#towerGenerator.newTower(towerId, this.#position)
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
    image(this.#img, this.#position.x, this.#position.y)
  }

  drawTower() {
    if (this.#tower) {
      this.#tower.draw()
    }
  }

  getPosition() {
    return this.#position
  }

  selectTarget(enemies: Enemy[]) {
    if (this.#tower) {
      this.#tower.selectTarget(enemies)
    }
  }

  isInside(mouse_x: number, mouse_y: number) {
    let insideX = false
    let insideY = false

    if (
      this.#position.x < mouse_x &&
      this.#position.x + Const.TILE_SIZE > mouse_x
    ) {
      insideX = true
    }
    if (
      this.#position.y < mouse_y &&
      this.#position.y + Const.TILE_SIZE > mouse_y
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
