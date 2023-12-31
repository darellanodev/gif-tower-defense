import { ConstType } from './types'
import { TextProperties } from './TextProperties'
import { ProgressBar } from './ProgressBar'
import { Image } from 'p5'

export class Hud {
  hudImages: Image[]
  money: number
  Const: ConstType
  hudType: number
  selectedItem: number
  lives: number
  score: number
  TextPropertiesClass: typeof TextProperties
  ProgressBarClass: typeof ProgressBar
  waveProgressBar: ProgressBar
  bossProgressBar: ProgressBar
  wave: number

  constructor(
    hudImages: Image[],
    money: number,
    Const: ConstType,
    lives: number,
    score: number,
    TextPropertiesClass: typeof TextProperties,
    ProgressBarClass: typeof ProgressBar,
    wave: number,
  ) {
    this.hudImages = hudImages
    this.money = money
    this.Const = Const
    this.lives = lives
    this.score = score
    this.TextPropertiesClass = TextPropertiesClass
    this.ProgressBarClass = ProgressBarClass
    this.wave = wave

    this.waveProgressBar = new ProgressBar(335, -19, 150, 16)
    this.bossProgressBar = new ProgressBar(335, -2, 150, 10)

    this.hudType = this.Const.HUD_NORMAL

    this.selectedItem = this.Const.GREEN_TOWER
  }

  isInsideButtonsBar(px: number, py: number) {
    if (px > 0 && px < 800 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideGreenTowerButton(px: number, py: number) {
    if (px > 0 && px < 98 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideRedTowerButton(px: number, py: number) {
    if (px > 98 && px < 180 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideYellowTowerButton(px: number, py: number) {
    if (px > 180 && px < 263 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  selectTower(towerType: number) {
    this.selectedItem = towerType
  }

  getSelectedTower() {
    return this.selectedItem
  }

  setType(hudType: number) {
    this.hudType = hudType
  }

  draw() {
    switch (this.hudType) {
      case this.Const.HUD_NORMAL:
        image(this.hudImages[this.Const.HUD_NORMAL], 0, 0)

        this._drawSelectedItem()
        break

      case this.Const.HUD_UPGRADING:
        image(this.hudImages[this.Const.HUD_UPGRADING], 0, 0)
        break

      case this.Const.HUD_UPGRADING_MAX:
        image(this.hudImages[this.Const.HUD_UPGRADING_MAX], 0, 0)
        break
    }

    this.waveProgressBar.draw()
    this.bossProgressBar.draw()

    this.TextPropertiesClass.setForHudData()
    this._drawMoney()
    this._drawLives()
    this._drawScore()
    this._drawLevelTitle()
    this._drawWave()
  }

  setWave(wave: number) {
    this.wave = wave
  }

  setMoney(money: number) {
    this.money = money
  }

  setLives(lives: number) {
    this.lives = lives
  }

  setWaveProgress(waveProgress: number) {
    this.waveProgressBar.setProgress(waveProgress)
  }

  setBossProgress(bossProgress: number) {
    this.bossProgressBar.setProgress(bossProgress)
  }

  getWaveProgressBar() {
    return this.waveProgressBar
  }

  getBossProgressBar() {
    return this.bossProgressBar
  }

  _drawMoney() {
    text(this.money, 445, 48)
  }

  _drawLives() {
    text(this.lives, 390, 48)
  }

  _drawScore() {
    text(this.score, 397, 73)
  }

  _drawLevelTitle() {
    text('Serpent by Ocliboy', 130, 18)
  }

  _drawWave() {
    text(`wave ${this.wave}`, 403, 13)
  }

  _drawSelectedItem() {
    strokeWeight(3)
    stroke(255, 204, 0)
    noFill()

    switch (this.selectedItem) {
      case this.Const.GREEN_TOWER:
        square(57, 36, 37)
        break

      case this.Const.RED_TOWER:
        square(139, 36, 37)
        break

      case this.Const.YELLOW_TOWER:
        square(224, 36, 37)
        break
    }
  }

  selectTowerHudType(tower: any) {
    if (tower.getUpgradeLevel() < this.Const.UPGRADE_MAX_LEVEL) {
      this.setType(this.Const.HUD_UPGRADING)
    } else {
      this.setType(this.Const.HUD_UPGRADING_MAX)
    }
  }
}
