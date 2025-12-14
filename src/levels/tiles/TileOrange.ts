import { TowerType } from '../../types/towerType'
import { Position } from '../../types/position'
import { Image } from 'p5'
import { Enemy } from '../../enemies/Enemy'
import { TILE_SIZE } from '../../constants/tile'
import { TowerGreen } from '../../towers/TowerGreen'
import { TowerRed } from '../../towers/TowerRed'
import { TowerYellow } from '../../towers/TowerYellow'
import { P5 } from '../../utils/P5'
import { Obj } from '../../Obj'
import { Player } from '../../player/Player'
import { TowerGreenCreator } from '../../towers/TowerGreenCreator'
import { TowerRedCreator } from '../../towers/TowerRedCreator'
import { TowerYellowCreator } from '../../towers/TowerYellowCreator'

export class TileOrange extends Obj {
  #img: Image | null
  #tower: TowerType | null = null
  #player: Player

  #towerGreenCreator: TowerGreenCreator
  #towerRedCreator: TowerRedCreator
  #towerYellowCreator: TowerYellowCreator

  constructor(
    img: Image | null,
    position: Position,
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
  ) {
    super(position)
    this.#img = img
    this.#player = player
    this.#towerGreenCreator = towerGreenCreator
    this.#towerRedCreator = towerRedCreator
    this.#towerYellowCreator = towerYellowCreator
  }

  removeTower() {
    this.#tower = null
  }

  instantiateNewTower(towerId: number) {
    switch (towerId) {
      case TowerGreen.ID:
        this.#tower = this.#towerGreenCreator.create(this.position, this)
        break
      case TowerRed.ID:
        this.#tower = this.#towerRedCreator.create(this.position, this)
        break
      case TowerYellow.ID:
        this.#tower = this.#towerYellowCreator.create(this.position, this)
        break
    }
  }

  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    if (this.#img === null) {
      return
    }
    P5.p5.image(
      this.#img,
      this.position.x / scale + startOffsetX,
      this.position.y / scale + startOffsetY,
      TILE_SIZE / scale,
      TILE_SIZE / scale,
    )
  }

  drawTower() {
    if (this.#tower) {
      this.#tower.draw()
    }
  }

  updateTower() {
    if (this.#tower) {
      this.#tower.update()
    }
  }

  #selectAllExplosionsTarget() {
    if ('selectAllExplosionsTargets' in this.#tower!) {
      this.#tower.selectAllExplosionsTargets()
    }
  }

  selectTarget(enemies: Enemy[]) {
    if (!this.#tower) {
      return
    }
    if (this.#tower.type === TowerYellow.ID) {
      this.#selectAllExplosionsTarget()
      return
    }
    this.#tower.selectTarget(enemies)
  }

  isInside(mouse_x: number, mouse_y: number) {
    let insideX = false
    let insideY = false

    if (this.position.x < mouse_x && this.position.x + TILE_SIZE > mouse_x) {
      insideX = true
    }
    if (this.position.y < mouse_y && this.position.y + TILE_SIZE > mouse_y) {
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

  getTower(): TowerType | null {
    if (this.hasTower()) {
      return this.#tower
    }
    return null
  }
}
