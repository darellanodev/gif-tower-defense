import { Position } from '../types/position'
import { RGBType } from '../types/rgb'
import { Const } from '../constants/Const'
import { ProgressBar } from '../hud/progressbar/ProgressBar'
import { Enemy } from '../enemies/Enemy'
import { P5 } from '../utils/P5'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Obj } from '../Obj'
import { Size } from '../types/size'
import { Distance } from '../utils/Distance'

export class Tower extends Obj {
  static OFFSET_X: number = 3
  static OFFSET_Y: number = 4
  static UPGRADE_INCREMENT: number = 1
  static INSTANT_UPGRADING: boolean = false // for testing purposes is set to true
  static UPGRADE_MAX_LEVEL = 5

  upgrading: boolean = false
  upgradeLevel: number = 0
  progressBar: ProgressBar
  upgradeProgress: number = 0
  delayUpgradeProgress: number = 0
  tileOrange: TileOrange

  enemyTarget: Enemy | null = null
  distanceToEnemyTarget: number = 0
  _distance: Distance

  constructor(position: Position, tileOrange: TileOrange) {
    super(position)
    this.progressBar = this.#createTowerProgressBar()
    this.tileOrange = tileOrange

    this._distance = new Distance()
  }

  #createTowerProgressBar() {
    const position: Position = {
      x: this.position.x + Const.TOWER_OFFSET + 10,
      y: this.position.y + Const.TOWER_OFFSET + 20,
    }
    const size: Size = { w: 27, h: 7 }

    return new ProgressBar(position, size)
  }

  upgrade() {
    this.upgrading = true
    this.upgradeLevel++
  }

  get notUpgrading() {
    return !this.upgrading
  }

  get sellProfit() {
    // this method is overridden by child classes
    return 0
  }

  get isMaxUpgraded() {
    return this.upgradeLevel === Tower.UPGRADE_MAX_LEVEL
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number): number {
    // To implement in child export classes
    return 0
  }

  get cost(): number {
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel)
  }

  get nextLevelUpgradeCost() {
    if (this.isMaxUpgraded) {
      return this.getCostWhenUpgradeLevelIs(Tower.UPGRADE_MAX_LEVEL - 1)
    }
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel + 1)
  }

  isDistanceIntoInfluenceArea(minDistance: number): boolean | null {
    // to implement in child export classes
    return null
  }

  #getEnemyDistance(enemy: Enemy) {
    return this._distance.calculate(
      { x: this.position.x, y: this.position.y },
      {
        x: enemy.position.x,
        y: enemy.position.y,
      },
    )
  }

  selectTarget(enemies: Enemy[]) {
    let minDistance = 99999
    let enemyTarget = null

    for (const enemy of enemies) {
      if (enemy.isAbducted) {
        continue
      }
      const distance = this.#getEnemyDistance(enemy)
      if (distance < minDistance) {
        minDistance = distance
        enemyTarget = enemy
      }
    }
    this.#setEnemyTargetDependingInfluenceArea(enemyTarget, minDistance)
  }

  #setEnemyTargetDependingInfluenceArea(enemyTarget: any, minDistance: number) {
    if (this.isDistanceIntoInfluenceArea(minDistance)) {
      this.enemyTarget = enemyTarget
      this.distanceToEnemyTarget = minDistance
      return
    }
    this.enemyTarget = null
    this.distanceToEnemyTarget = 0
  }

  get upgradeIncrement() {
    return Tower.UPGRADE_INCREMENT / (this.upgradeLevel + 1)
  }

  #reInitUpgrading() {
    this.upgrading = false
    this.progressBar.reInitProgress()
  }

  update() {
    if (!this.upgrading) {
      return
    }
    if (Tower.INSTANT_UPGRADING) {
      this.#reInitUpgrading()
      return
    }
    this.#reInitUpgradeProgressBarWhenIsFull()
  }

  #reInitUpgradeProgressBarWhenIsFull() {
    if (this.progressBar.isFullOfProgress()) {
      this.#reInitUpgrading()
      return
    }
    this.progressBar.increaseProgress(this.upgradeIncrement)
  }

  get type() {
    // this method is overridden by child classes
    return 0
  }

  _drawUpgradeBackground(color: RGBType, offset: number) {
    P5.p5.strokeWeight(1)
    P5.p5.stroke('black')
    P5.p5.fill(color)
    P5.p5.rect(
      this.position.x + offset,
      this.position.y + offset,
      Const.TILE_SIZE,
      Const.TILE_SIZE,
    )
  }
}
