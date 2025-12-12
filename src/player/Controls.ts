import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'
import { Const } from '../constants/Const'
import { Position } from '../types/position'
import { TileOrange } from '../levels/tiles/TileOrange'
import { P5 } from '../utils/P5'
import { HudButtonsTowers } from '../hud/buttons/HudButtonsTowers'
import { HudButtonsMagics } from '../hud/buttons/HudButtonsMagics'
import { Wallet } from './Wallet'
import { InfluenceArea } from '../towers/InfluenceArea'
import { MagicInstancesManager } from '../magics/MagicInstancesManager'
import { TowerType } from '../types/towerType'
import { Images } from '../resources/Images'
import { Path } from '../levels/path/Path'
import { StateManager } from '../StateManager'
import { Button } from '../hud/buttons/Button'

export class Controls {
  static KEY_1 = 49
  static KEY_2 = 50
  static KEY_3 = 51
  static KEY_P = 80

  #stateManager: StateManager
  #mouseTileOrangeOver: TileOrange | null = null
  #hudButtonsTowers: HudButtonsTowers
  #hudButtonsMagics: HudButtonsMagics
  #buttonPause: Button
  #wallet: Wallet

  #magicFireballInstancesManager: MagicInstancesManager
  #magicIceballInstancesManager: MagicInstancesManager
  #magicUFOInstancesManager: MagicInstancesManager
  #pathStartEnemiesPosition: Position
  #influenceArea: InfluenceArea

  constructor(
    stateManager: StateManager,
    hudButtonsMagics: HudButtonsMagics,
    hudButtonsTowers: HudButtonsTowers,
    buttonPause: Button,
    wallet: Wallet,
    magicFireballInstancesManager: MagicInstancesManager,
    magicIceballInstancesManager: MagicInstancesManager,
    magicUFOInstancesManager: MagicInstancesManager,
    pathStartEnemiesPosition: Position,
    influenceArea: InfluenceArea,
  ) {
    this.#stateManager = stateManager
    this.#hudButtonsMagics = hudButtonsMagics
    this.#hudButtonsTowers = hudButtonsTowers
    this.#buttonPause = buttonPause
    this.#wallet = wallet
    this.#magicFireballInstancesManager = magicFireballInstancesManager
    this.#magicIceballInstancesManager = magicIceballInstancesManager
    this.#magicUFOInstancesManager = magicUFOInstancesManager
    this.#pathStartEnemiesPosition = pathStartEnemiesPosition
    this.#influenceArea = influenceArea
  }

  keyPressed(keyCode: number) {
    switch (keyCode) {
      case Controls.KEY_1:
        this.#hudButtonsTowers.selectTower(TowerGreen.ID)
        break
      case Controls.KEY_2:
        this.#hudButtonsTowers.selectTower(TowerRed.ID)
        break
      case Controls.KEY_3:
        this.#hudButtonsTowers.selectTower(TowerYellow.ID)
        break
      case Controls.KEY_P:
        this.#togglePause()
        break
    }
  }

  #togglePause() {
    if (this.#stateManager.isPaused()) {
      this.#stateManager.setPlay()
      this.#buttonPause.uncheck()
      return
    }
    this.#buttonPause.check()
    this.#stateManager.setPause()
  }

  get mouseTileOrangeOver(): TileOrange | null {
    return this.#mouseTileOrangeOver
  }

  set mouseTileOrangeOver(tileOrange: TileOrange | null) {
    this.#mouseTileOrangeOver = tileOrange
  }

  #handlePauseButton() {
    if (this.#buttonPause.isMouseInside(this.#getMousePosition())) {
      this.#togglePause()
    }
  }

  #getMousePosition() {
    return { x: P5.p5.mouseX, y: P5.p5.mouseY }
  }

  #handleTowersButtons() {
    if (
      this.#hudButtonsTowers.isInsideTowersButtonsBar(this.#getMousePosition())
    ) {
      this.#hudButtonsTowers.handleTowerButtons(this.#getMousePosition())
    }
  }

  #handleOrangeTileButton() {
    if (this.mouseTileOrangeOver !== null) {
      this.clickOrangeTile(this.mouseTileOrangeOver)
    }
  }

  #handleMagicsButtons() {
    if (
      this.#hudButtonsMagics.isInsideMagicsButtonsBar(this.#getMousePosition())
    ) {
      this.#hudButtonsMagics.handleMagicButtons(
        this.#getMousePosition(),
        Images.magicIceballImage,
        Images.magicFireballImage,
        Images.magicUFOImages,
        this.#pathStartEnemiesPosition,
        Path.orders,
        this.#magicFireballInstancesManager,
        this.#magicIceballInstancesManager,
        this.#magicUFOInstancesManager,
      )
    }
  }

  mouseClicked() {
    if (this.#stateManager.isPaused()) {
      this.#handlePauseButton()
      return
    }

    this.#handlePauseButton()
    this.#handleTowersButtons()
    this.#handleOrangeTileButton()
    this.#handleMagicsButtons()
  }

  #sellTowerIfRightClickOnTower(tower: TowerType | null) {
    if (P5.p5.mouseButton === P5.p5.RIGHT && tower) {
      this.#wallet.sellTower(tower)
    }
  }

  clickOrangeTile(mouseTileOrangeOver: TileOrange) {
    const tower = mouseTileOrangeOver.getTower()

    this.#sellTowerIfRightClickOnTower(tower)

    if (P5.p5.mouseButton !== P5.p5.LEFT) {
      return
    }

    if (tower) {
      this.#wallet.upgradeTower(tower)
      return
    }

    this.#wallet.buyTower(
      mouseTileOrangeOver,
      this.#hudButtonsTowers.getSelectedTower(),
    )
  }

  drawInfluenceAreaWhenTowerExists(tower: TowerType | null) {
    if (!tower) {
      return
    }
    if (tower.isMaxUpgraded) {
      this.#influenceArea.drawTowerInfluenceArea(tower, false)
      return
    }
    const canUpgrade = this.#wallet.haveMoneyToUpgradeTower(
      tower.type,
      tower.upgradeLevel + 1,
    )
    this.#influenceArea.drawTowerInfluenceArea(tower, canUpgrade)
  }

  drawInfluenceAreaWhenTowerNotExists(position: Position | undefined) {
    if (!position) {
      return
    }
    const towerSelected = this.#hudButtonsTowers.getSelectedTower()

    this.#influenceArea.drawNoTowerInfluenceArea(
      position,
      towerSelected,
      this.#wallet.haveMoneyToBuyNewTower(towerSelected),
    )
  }

  drawHudBackgroundWhenTowerExists(tower: TowerType | null) {
    if (!tower) {
      return
    }

    this.#hudButtonsTowers.viewSellProfit(tower)

    if (tower.isMaxUpgraded) {
      return
    }

    const canUpgrade = this.#wallet.haveMoneyToUpgradeTower(
      tower.type,
      tower.upgradeLevel + 1,
    )
    this.#hudButtonsTowers.viewUpgradeCost(tower, canUpgrade)
  }

  drawHudBackgroundWhenTowerNotExists() {
    //TODO
  }
}
