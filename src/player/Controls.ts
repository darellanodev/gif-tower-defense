import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'
import { Const } from '../constants/Const'
import { Position } from '../types/position'
import { TileOrange } from '../tiles/TileOrange'
import { P5 } from '../utils/P5'
import { HudButtonsTowers } from '../hud/HudButtonsTowers'
import { HudButtonsMagics } from '../hud/HudButtonsMagics'
import { Wallet } from './Wallet'
import { InfluenceArea } from '../towers/InfluenceArea'
import { MagicInstancesManager } from '../magics/MagicInstancesManager'
import { TowerType } from '../types/towerType'
import { Images } from '../resources/Images'
import { Path } from '../path/Path'
import { StateManager } from '../StateManager'
import { Button } from '../hud/Button'

export class Controls {
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

  #pauseBtnTimeReady: number = 0

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
  }

  keyPressed(keyCode: number) {
    switch (keyCode) {
      case Const.KEY_1:
        this.#hudButtonsTowers.selectTower(TowerGreen.ID)
        break
      case Const.KEY_2:
        this.#hudButtonsTowers.selectTower(TowerRed.ID)
        break
      case Const.KEY_3:
        this.#hudButtonsTowers.selectTower(TowerYellow.ID)
        break
      case Const.KEY_P:
        this.#togglePause()
        break
    }
  }

  #togglePause() {
    if (this.#isPauseAvailable()) {
      if (this.#stateManager.isPaused()) {
        this.#stateManager.setPlay()
        this.#buttonPause.uncheck()
      } else {
        this.#buttonPause.check()
        this.#stateManager.setPause()
        this.#pauseBtnTimeReady = 10
      }
    }
  }

  pauseTimeReady() {
    if (this.#pauseBtnTimeReady > 0) {
      this.#pauseBtnTimeReady--
    }
  }

  #isPauseAvailable() {
    return this.#pauseBtnTimeReady === 0
  }

  get mouseTileOrangeOver(): TileOrange | null {
    return this.#mouseTileOrangeOver
  }

  set mouseTileOrangeOver(tileOrange: TileOrange | null) {
    this.#mouseTileOrangeOver = tileOrange
  }

  mouseClicked() {
    const mousePosition = { x: P5.p5.mouseX, y: P5.p5.mouseY }

    if (this.#stateManager.isPaused()) {
      if (this.#buttonPause.isMouseInside(mousePosition)) {
        this.#togglePause()
      }
      return
    }

    if (this.#hudButtonsTowers.isInsideTowersButtonsBar(mousePosition)) {
      this.#hudButtonsTowers.handleTowerButtons(mousePosition)
    } else if (this.#hudButtonsMagics.isInsideMagicsButtonsBar(mousePosition)) {
      this.#hudButtonsMagics.handleMagicButtons(
        mousePosition,
        Images.magicIceballImage,
        Images.magicFireballImage,
        Images.magicUFOImages,
        this.#pathStartEnemiesPosition,
        Path.orders,
        this.#magicFireballInstancesManager,
        this.#magicIceballInstancesManager,
        this.#magicUFOInstancesManager,
      )
    } else if (this.#buttonPause.isMouseInside(mousePosition)) {
      this.#togglePause()
    } else if (this.mouseTileOrangeOver !== null) {
      this.clickOrangeTile(this.mouseTileOrangeOver)
    }
  }

  clickOrangeTile(mouseTileOrangeOver: TileOrange) {
    const tower = mouseTileOrangeOver.getTower()

    if (P5.p5.mouseButton === P5.p5.RIGHT && tower) {
      this.#wallet.sellTower(tower)
    }

    if (P5.p5.mouseButton === P5.p5.LEFT) {
      if (tower) {
        this.#wallet.upgradeTower(tower)
      } else {
        this.#wallet.buyTower(
          mouseTileOrangeOver,
          this.#hudButtonsTowers.getSelectedTower(),
        )
      }
    }
  }

  drawInfluenceAreaWhenTowerExists(tower: TowerType | null) {
    if (!tower) {
      return
    }
    if (!tower.isMaxUpgraded) {
      const canUpgrade = this.#wallet.haveMoneyToUpgradeTower(
        tower.type,
        tower.upgradeLevel + 1,
      )
      InfluenceArea.drawTowerInfluenceArea(tower, canUpgrade)
    } else {
      InfluenceArea.drawTowerInfluenceArea(tower, false)
    }
  }

  drawInfluenceAreaWhenTowerNotExists(position: Position | undefined) {
    if (!position) {
      return
    }
    const towerSelected = this.#hudButtonsTowers.getSelectedTower()

    InfluenceArea.drawNoTowerInfluenceArea(
      position,
      towerSelected,
      this.#wallet.haveMoneyToBuyNewTower(towerSelected),
    )
  }

  drawHudBackgroundWhenTowerExists(tower: TowerType | null) {
    if (!tower) {
      return
    }
    if (!tower.isMaxUpgraded) {
      const canUpgrade = this.#wallet.haveMoneyToUpgradeTower(
        tower.type,
        tower.upgradeLevel + 1,
      )
      this.#hudButtonsTowers.viewUpgradeCost(tower, canUpgrade)
    }

    this.#hudButtonsTowers.viewSellProfit(tower)
  }

  drawHudBackgroundWhenTowerNotExists() {
    //TODO
  }
}
