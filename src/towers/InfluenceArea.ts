import { Position } from '../types/position'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { ConstColor } from '../constants/ConstColor'
import { Const } from '../constants/Const'
import { P5 } from '../utils/P5'

export class InfluenceArea {
  static #instance: InfluenceArea | null = null
  static ALPHA_FILL = 50
  static ALPHA_STROKE = 120

  static getInstance() {
    if (InfluenceArea.#instance === null) {
      InfluenceArea.#instance = new InfluenceArea()
    }
    return InfluenceArea.#instance
  }

  constructor() {
    if (InfluenceArea.#instance !== null) {
      throw new Error(
        'InfluenceArea is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    InfluenceArea.#instance = this
  }

  #setGrayInfluenceAreaColor() {
    P5.p5.stroke(...ConstColor.GRAY, InfluenceArea.ALPHA_STROKE)
    P5.p5.fill(...ConstColor.GRAY, InfluenceArea.ALPHA_FILL)
  }

  #setInfluenceAreaColor(towerId: number) {
    switch (towerId) {
      case TowerGreen.ID:
        P5.p5.stroke(...ConstColor.GREEN, InfluenceArea.ALPHA_STROKE)
        P5.p5.fill(...ConstColor.GREEN, InfluenceArea.ALPHA_FILL)
        break
      case TowerRed.ID:
        P5.p5.stroke(...ConstColor.RED, InfluenceArea.ALPHA_STROKE)
        P5.p5.fill(...ConstColor.RED, InfluenceArea.ALPHA_FILL)
        break
      case TowerYellow.ID:
        P5.p5.stroke(...ConstColor.YELLOW, InfluenceArea.ALPHA_STROKE)
        P5.p5.fill(...ConstColor.YELLOW, InfluenceArea.ALPHA_FILL)
        break
    }
  }

  #getInfluenceAreaFor(towerSelected: number) {
    const influenceMap = {
      [TowerGreen.ID]: TowerGreen.UPGRADE_INFLUENCE_AREA[0],
      [TowerRed.ID]: TowerRed.UPGRADE_INFLUENCE_AREA[0],
      [TowerYellow.ID]: TowerYellow.UPGRADE_INFLUENCE_AREA[0],
    }
    return influenceMap[towerSelected]
  }

  drawNoTowerInfluenceArea(
    position: Position,
    towerSelected: number,
    haveMoneyToBuySelectedTower: boolean,
  ) {
    this.#getInfluenceAreaColor(haveMoneyToBuySelectedTower, towerSelected)
    this.#drawCircle(
      position.x,
      position.y,
      this.#getInfluenceAreaFor(towerSelected),
    )
  }

  #getInfluenceAreaColor(
    haveMoneyToBuySelectedTower: boolean,
    towerSelected: number,
  ) {
    if (haveMoneyToBuySelectedTower) {
      this.#setInfluenceAreaColor(towerSelected)
    } else {
      this.#setGrayInfluenceAreaColor()
    }
  }

  drawTowerInfluenceArea(tower: any, canUpgrade: boolean) {
    const towerPosition = tower.position

    let x = towerPosition.x
    let y = towerPosition.y

    if (tower.type === TowerGreen.ID || tower.type === TowerRed.ID) {
      x += Const.TOWER_OFFSET
      y += Const.TOWER_OFFSET
    }
    if (canUpgrade) {
      this.#setInfluenceAreaColor(tower.type)
    } else {
      this.#setGrayInfluenceAreaColor()
    }
    this.#drawCircle(x, y, tower.influenceArea)
  }

  #drawCircle(x: number, y: number, diameter: number) {
    P5.p5.strokeWeight(2)
    P5.p5.circle(x + Const.TILE_SIZE / 2, y + Const.TILE_SIZE / 2, diameter)
  }
}
