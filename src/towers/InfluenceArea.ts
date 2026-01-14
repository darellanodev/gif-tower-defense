import { Position } from '../types/position'
import { COLOR, INFLUENCE_AREA_ALPHA } from '../constants/color'
import { TILE_SIZE } from '../constants/tile'
import { P5 } from '../utils/P5'
import {
  TOWER_CREATION_OFFSET,
  TOWER_GREEN_UPGRADE,
  TOWER_ID,
  TOWER_RED_UPGRADE,
  TOWER_YELLOW_UPGRADE,
} from '../constants/tower'

export class InfluenceArea {
  static #instance: InfluenceArea | null = null

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
    P5.p5.stroke(...COLOR.GRAY, INFLUENCE_AREA_ALPHA.STROKE)
    P5.p5.fill(...COLOR.GRAY, INFLUENCE_AREA_ALPHA.FILL)
  }

  #setInfluenceAreaColor(towerId: number) {
    switch (towerId) {
      case TOWER_ID.GREEN:
        P5.p5.stroke(...COLOR.GREEN, INFLUENCE_AREA_ALPHA.STROKE)
        P5.p5.fill(...COLOR.GREEN, INFLUENCE_AREA_ALPHA.FILL)
        break
      case TOWER_ID.RED:
        P5.p5.stroke(...COLOR.RED, INFLUENCE_AREA_ALPHA.STROKE)
        P5.p5.fill(...COLOR.RED, INFLUENCE_AREA_ALPHA.FILL)
        break
      case TOWER_ID.YELLOW:
        P5.p5.stroke(...COLOR.YELLOW, INFLUENCE_AREA_ALPHA.STROKE)
        P5.p5.fill(...COLOR.YELLOW, INFLUENCE_AREA_ALPHA.FILL)
        break
    }
  }

  #getInfluenceAreaFor(towerSelected: number) {
    const influenceMap = {
      [TOWER_ID.GREEN]: TOWER_GREEN_UPGRADE.INFLUENCE_AREA[0],
      [TOWER_ID.RED]: TOWER_RED_UPGRADE.INFLUENCE_AREA[0],
      [TOWER_ID.YELLOW]: TOWER_YELLOW_UPGRADE.INFLUENCE_AREA[0],
    }
    return influenceMap[towerSelected]
  }

  drawNoTowerInfluenceArea(
    position: Position,
    towerSelected: number,
    haveMoneyToBuySelectedTower: boolean,
  ) {
    this.#getMoneyInfluenceAreaColor(haveMoneyToBuySelectedTower, towerSelected)
    this.#drawCircle(position, this.#getInfluenceAreaFor(towerSelected))
  }

  #getMoneyInfluenceAreaColor(
    haveMoneyToBuySelectedTower: boolean,
    towerSelected: number,
  ) {
    if (haveMoneyToBuySelectedTower) {
      this.#setInfluenceAreaColor(towerSelected)
      return
    }
    this.#setGrayInfluenceAreaColor()
  }

  drawTowerInfluenceArea(tower: any, canUpgrade: boolean) {
    this.#getUpgradeInfluenceAreaColor(tower, canUpgrade)
    this.#drawCircle(this.#getInfluenceAreaPosition(tower), tower.influenceArea)
  }

  #getInfluenceAreaPosition(tower: any) {
    return {
      x: tower.position.x + TOWER_CREATION_OFFSET.X,
      y: tower.position.y + TOWER_CREATION_OFFSET.Y,
    }
  }

  #getUpgradeInfluenceAreaColor(tower: any, canUpgrade: boolean) {
    if (canUpgrade) {
      this.#setInfluenceAreaColor(tower.type)
      return
    }
    this.#setGrayInfluenceAreaColor()
  }

  #drawCircle(position: Position, diameter: number) {
    P5.p5.strokeWeight(2)
    P5.p5.circle(
      position.x + TILE_SIZE / 2,
      position.y + TILE_SIZE / 2,
      diameter,
    )
  }
}
