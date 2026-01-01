import { HudPanel } from './HudPanel'
import { HudButtonsTowers } from './buttons/HudButtonsTowers'
import { HudButtonsMagics } from './buttons/HudButtonsMagics'
import { HudPlayerIndicators } from './HudPlayerIndicators'
import { HudScreenIndicators } from './HudScreenIndicators'
import { Images } from '../resources/Images'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Player } from '../player/Player'
import { Wallet } from '../player/Wallet'
import { MapDataType } from '../types/mapDataType'
import { Button } from './buttons/Button'
import { Controls } from '../player/Controls'
import { StateManager } from '../StateManager'
import { TileOrange } from '../levels/tiles/TileOrange'
import { ProgressBarTimer } from './progressbar/ProgressBarTimer'
import {
  PROGRESS_BAR_TIMER_BOSS_DELAY,
  PROGRESS_BAR_TIMER_BOSS_POSITION,
  PROGRESS_BAR_TIMER_BOSS_SIZE,
  PROGRESS_BAR_TIMER_WAVE_DELAY,
  PROGRESS_BAR_TIMER_WAVE_POSITION,
  PROGRESS_BAR_TIMER_WAVE_SIZE,
} from '../constants/progressBarTimer'

export class HudSystem {
  #hudPanel: HudPanel
  hudButtonsMagics: HudButtonsMagics
  hudButtonsTowers: HudButtonsTowers
  progressBarTimerBoss: ProgressBarTimer
  progressBarTimerWave: ProgressBarTimer
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

    this.progressBarTimerBoss = this.#createHudProgressBarBoss()
    this.progressBarTimerWave = this.#createHudProgressBarWave()
  }

  #createHudProgressBarBoss() {
    return new ProgressBarTimer(
      PROGRESS_BAR_TIMER_BOSS_POSITION,
      PROGRESS_BAR_TIMER_BOSS_SIZE,
      PROGRESS_BAR_TIMER_BOSS_DELAY,
    )
  }

  #createHudProgressBarWave() {
    return new ProgressBarTimer(
      PROGRESS_BAR_TIMER_WAVE_POSITION,
      PROGRESS_BAR_TIMER_WAVE_SIZE,
      PROGRESS_BAR_TIMER_WAVE_DELAY,
    )
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
    this.progressBarTimerWave.draw()
    this.progressBarTimerBoss.draw()
    this.#hudPlayerIndicators.draw()
    this.#hudScreenIndicators.draw()
  }

  #drawInfluenceAreaOrangeTile(orangeTile: TileOrange | null) {
    if (orangeTile?.hasTower()) {
      this.#controls!.drawInfluenceAreaWhenTowerExists(orangeTile.getTower())
    } else {
      this.#controls!.drawInfluenceAreaWhenTowerNotExists(orangeTile?.position)
    }
  }

  #drawInfluenceArea() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    if (!this.#isMouseOverOrangeTile) {
      return
    }
    this.#drawInfluenceAreaOrangeTile(this.#controls.mouseTileOrangeOver)
  }

  #drawHudOrangeTile(orangeTile: TileOrange | null) {
    if (orangeTile?.hasTower()) {
      this.#controls!.drawHudBackgroundWhenTowerExists(orangeTile.getTower())
    } else {
      this.#controls!.drawHudBackgroundWhenTowerNotExists()
    }
  }

  #drawHudBackgroundImage() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    if (this.#isMouseOverOrangeTile) {
      this.#drawHudOrangeTile(this.#controls.mouseTileOrangeOver)
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
