import { HudPanel } from './hud/HudPanel'
import { HudButtonsTowers } from './hud/buttons/HudButtonsTowers'
import { HudButtonsMagics } from './hud/buttons/HudButtonsMagics'
import { HudProgressBarBoss } from './hud/progressbar/HudProgressBarBoss'
import { HudProgressBarWave } from './hud/progressbar/HudProgressBarWave'
import { HudPlayerIndicators } from './hud/HudPlayerIndicators'
import { HudScreenIndicators } from './hud/HudScreenIndicators'
import { Images } from './resources/Images'
import { Position } from './types/position'
import { Size } from './types/size'
import { Player } from './player/Player'
import { Wallet } from './player/Wallet'
import { MapDataType } from './types/mapDataType'
import { Button } from './hud/buttons/Button'
import { Controls } from './player/Controls'
import { StateManager } from './StateManager'

export class HudSystem {
  #hudPanel: HudPanel
  hudButtonsMagics: HudButtonsMagics
  hudButtonsTowers: HudButtonsTowers
  hudProgressBarBoss: HudProgressBarBoss
  hudProgressBarWave: HudProgressBarWave
  #hudPlayerIndicators: HudPlayerIndicators | null = null
  #hudScreenIndicators: HudScreenIndicators
  #player: Player
  #buttonPause: Button
  #controls: Controls | null
  #stateManager: StateManager
  #wallet: Wallet
  #isGameModeTesting: boolean

  constructor(
    player: Player,
    buttonPause: Button,
    wallet: Wallet,
    stateManager: StateManager,
    isGameModeTesting: boolean,
  ) {
    this.#player = player
    this.#buttonPause = buttonPause
    this.#wallet = wallet
    this.#stateManager = stateManager
    this.#isGameModeTesting = isGameModeTesting

    this.#controls = null

    HudButtonsMagics.initializeButtons()
    HudButtonsTowers.initializeButtons()

    this.#hudPanel = new HudPanel(Images.hudImages)
    this.hudButtonsMagics = new HudButtonsMagics()
    this.hudButtonsTowers = new HudButtonsTowers(this.#wallet)
    this.#hudScreenIndicators = new HudScreenIndicators(
      this.#stateManager,
      isGameModeTesting,
    )

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

    this.#hudPlayerIndicators = new HudPlayerIndicators(
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
      this.#hudPlayerIndicators === null ||
      this.#buttonPause === null
    ) {
      throw new Error(
        'hudButtonsTower or hudPlayerIndicators or hudButtonOthers is null',
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
    this.#hudPlayerIndicators.draw()
    this.#hudScreenIndicators.draw()
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
}
