import { HudPanel } from './hud/HudPanel'
import { HudButtonsTowers } from './hud/HudButtonsTowers'
import { HudButtonsMagics } from './hud/HudButtonsMagics'
import { HudProgressBarBoss } from './hud/HudProgressBarBoss'
import { HudProgressBarWave } from './hud/HudProgressBarWave'
import { HudOtherIndicators } from './hud/HudOtherIndicators'
import { Images } from './resources/Images'
import { Position } from './types/position'
import { Size } from './types/size'
import { Player } from './player/Player'
import { Wallet } from './player/Wallet'
import { MapDataType } from './types/mapDataType'
import { Button } from './hud/Button'
import { Controls } from './player/Controls'
import { TextProperties } from './hud/TextProperties'
import { Debug } from './hud/Debug'
import { P5 } from './utils/P5'

export class HudSystem {
  #hudPanel: HudPanel
  hudButtonsMagics: HudButtonsMagics
  hudButtonsTowers: HudButtonsTowers
  hudProgressBarBoss: HudProgressBarBoss
  hudProgressBarWave: HudProgressBarWave
  #hudOtherIndicators: HudOtherIndicators | null = null
  #player: Player
  #buttonPause: Button
  #controls: Controls | null

  constructor(player: Player, buttonPause: Button, wallet: Wallet) {
    this.#player = player
    this.#buttonPause = buttonPause
    this.#controls = null

    HudButtonsMagics.initializeButtons()
    HudButtonsTowers.initializeButtons()

    this.#hudPanel = new HudPanel(Images.hudImages)
    this.hudButtonsMagics = new HudButtonsMagics()
    this.hudButtonsTowers = new HudButtonsTowers(wallet)

    this.hudProgressBarBoss = this.#createHudProgressBarBoss()
    this.hudProgressBarWave = this.#createHudProgressBarWave()
  }

  #createHudProgressBarBoss() {
    const position: Position = { x: 345, y: 17 }
    const size: Size = { w: 150, h: 10 }

    return new HudProgressBarBoss(position, size)
  }

  #createHudProgressBarWave() {
    const position: Position = { x: 345, y: 1 }
    const size: Size = { w: 150, h: 16 }

    return new HudProgressBarWave(position, size, this.#player)
  }

  createHuds(wallet: Wallet, levelMap: MapDataType) {
    this.hudButtonsTowers = new HudButtonsTowers(wallet)

    this.#hudOtherIndicators = new HudOtherIndicators(
      wallet,
      this.#player,
      levelMap.title,
      levelMap.author,
    )
  }

  setControls(controls: Controls) {
    this.#controls = controls
  }

  draw() {
    if (
      this.hudButtonsTowers === null ||
      this.#hudOtherIndicators === null ||
      this.#buttonPause === null
    ) {
      throw new Error(
        'hudButtonsTower or hudOtherIndicators or hudButtonOthers is null',
      )
    }
    this.#hudPanel.draw()
    this.#drawHudBackgroundImage()
    this.#drawInfluenceArea()
    this.hudButtonsTowers.draw()
    this.#buttonPause.draw()
    this.hudButtonsMagics.draw()
    this.hudProgressBarWave.draw()
    this.hudProgressBarBoss.draw()
    this.#hudOtherIndicators.draw()
  }

  #drawInfluenceArea() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    if (this.#isMouseOverOrangeTile) {
      const orangeTile = this.#controls.mouseTileOrangeOver
      if (orangeTile?.hasTower()) {
        this.#controls.drawInfluenceAreaWhenTowerExists(orangeTile.getTower())
      } else {
        this.#controls.drawInfluenceAreaWhenTowerNotExists(orangeTile?.position)
      }
    }
  }

  #drawHudBackgroundImage() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    if (this.#isMouseOverOrangeTile) {
      const orangeTile = this.#controls.mouseTileOrangeOver
      if (orangeTile?.hasTower()) {
        this.#controls.drawHudBackgroundWhenTowerExists(orangeTile.getTower())
      } else {
        this.#controls.drawHudBackgroundWhenTowerNotExists()
      }
    } else {
      this.#hudPanel.drawNormalHud()
    }
  }

  get #isMouseOverOrangeTile() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    return this.#controls.mouseTileOrangeOver !== null
  }

  drawGameOverScreen() {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  drawPauseScreen() {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game paused', P5.p5.width / 2, P5.p5.height / 2)
  }

  drawDebugElements() {
    Debug.showMouseCoordinates(
      { x: P5.p5.mouseX, y: P5.p5.mouseY },
      { x: 260, y: 18 },
    )
    Debug.showLabelTestingMode({ x: 8, y: 100 })
  }
}
