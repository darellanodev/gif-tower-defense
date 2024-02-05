import { ConstType, TowerType } from './types'
import { TowerGenerator } from './TowerGenerator'
import { Image } from 'p5'
import { Enemy } from './Enemy'

export class OrangeTile {
  img: Image
  x: number
  y: number
  Const: ConstType
  towerGenerator: TowerGenerator

  tower: TowerType

  constructor(
    img: Image,
    x: number,
    y: number,
    Const: ConstType,
    towerGenerator: TowerGenerator,
  ) {
    this.img = img
    this.x = x
    this.y = y
    this.Const = Const
    this.towerGenerator = towerGenerator

    this.tower = null
  }

  sellTower() {
    let profit = 0

    if (this.tower) {
      profit = this.tower.getSellProfit()
      this.tower = null
    }
    return profit
  }

  buyTower(towerId: number) {
    if (this.tower === null) {
      this.tower = this.towerGenerator.newTower(towerId, this.x, this.y)
    } else {
      this.tower.upgrade()
    }
    return this.tower.getCost()
  }

  _upgradeTower() {
    if (this.tower) {
      this.tower.upgrade()
    }
  }

  drawTile() {
    image(this.img, this.x, this.y)
  }

  drawTower() {
    if (this.tower) {
      this.tower.draw()
    }
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  selectTarget(enemies: Enemy[]) {
    if (this.tower) {
      this.tower.selectTarget(enemies)
    }
  }

  isInside(mouse_x: number, mouse_y: number) {
    let insideX = false
    let insideY = false

    if (this.x < mouse_x && this.x + this.Const.TILE_SIZE > mouse_x) {
      insideX = true
    }
    if (this.y < mouse_y && this.y + this.Const.TILE_SIZE > mouse_y) {
      insideY = true
    }

    if (insideX && insideY) {
      return true
    }
    return false
  }

  hasTower() {
    return this.tower !== null
  }

  getTower() {
    if (this.hasTower()) {
      return this.tower
    }
    return null
  }
}
