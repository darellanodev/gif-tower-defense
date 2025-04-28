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

export class Controls {
  #mouseTileOrangeOver: TileOrange | null = null
  #hudButtonsTowers: HudButtonsTowers
  #hudButtonsMagics: HudButtonsMagics
  #wallet: Wallet

  #magicFireballInstancesManager: MagicInstancesManager
  #magicIceballInstancesManager: MagicInstancesManager
  #magicUFOInstancesManager: MagicInstancesManager
  #pathStartEnemiesPosition: Position

  constructor(
    hudButtonsMagics: HudButtonsMagics,
    hudButtonsTowers: HudButtonsTowers,
    wallet: Wallet,
    magicFireballInstancesManager: MagicInstancesManager,
    magicIceballInstancesManager: MagicInstancesManager,
    magicUFOInstancesManager: MagicInstancesManager,
    pathStartEnemiesPosition: Position,
  ) {
    this.#hudButtonsMagics = hudButtonsMagics
    this.#hudButtonsTowers = hudButtonsTowers
    this.#wallet = wallet
    this.#magicFireballInstancesManager = magicFireballInstancesManager
    this.#magicIceballInstancesManager = magicIceballInstancesManager
    this.#magicUFOInstancesManager = magicUFOInstancesManager
    this.#pathStartEnemiesPosition = pathStartEnemiesPosition
  }

  keyPressed() {
    switch (P5.p5.keyCode) {
      case Const.KEY_1:
        this.#hudButtonsTowers.selectTower(TowerGreen.ID)
        break
      case Const.KEY_2:
        this.#hudButtonsTowers.selectTower(TowerRed.ID)
        break
      case Const.KEY_3:
        this.#hudButtonsTowers.selectTower(TowerYellow.ID)
        break
    }
  }

  get mouseTileOrangeOver(): TileOrange | null {
    return this.#mouseTileOrangeOver
  }

  set mouseTileOrangeOver(tileOrange: TileOrange | null) {
    this.#mouseTileOrangeOver = tileOrange
  }

  mouseClicked() {
    const mousePosition = { x: P5.p5.mouseX, y: P5.p5.mouseY }

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
