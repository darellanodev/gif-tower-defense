import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'
import { Const } from '../constants/Const'
import { Image } from 'p5'
import { Position } from '../types/position'
import { TileOrange } from '../tiles/TileOrange'
import { P5 } from '../utils/P5'
import { HudButtonsTowers } from '../hud/HudButtonsTowers'
import { HudButtonsMagics } from '../hud/HudButtonsMagics'
import { Wallet } from './Wallet'
import { InfluenceArea } from '../towers/InfluenceArea'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicFireballInstancesManager } from '../magics/MagicFireballInstancesManager'

export class Controls {
  #mouseTileOrangeOver: TileOrange | null = null
  #hudButtonsTowers: HudButtonsTowers
  #hudButtonsMagics: HudButtonsMagics
  #wallet: Wallet

  constructor(
    hudButtonsMagics: HudButtonsMagics,
    hudButtonsTowers: HudButtonsTowers,
    wallet: Wallet,
  ) {
    this.#hudButtonsMagics = hudButtonsMagics
    this.#hudButtonsTowers = hudButtonsTowers
    this.#wallet = wallet
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

  mouseClicked(
    mouseX: number,
    mouseY: number,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    orders: number[],
    mouseTileOrangeOver: TileOrange | null,
    enemyInstancesManager: EnemyInstancesManager,
    magicFireballInstancesManager: MagicFireballInstancesManager,
  ) {
    const mousePosition: Position = { x: mouseX, y: mouseY }

    if (this.#hudButtonsTowers.isInsideTowersButtonsBar(mousePosition)) {
      this.#hudButtonsTowers.handleTowerButtons(mousePosition)
    }
    if (this.#hudButtonsMagics.isInsideMagicsButtonsBar(mousePosition)) {
      this.#hudButtonsMagics.handleMagicButtons(
        mousePosition,
        magicIceballImage,
        magicFireballImage,
        magicUFOImages,
        initialEnemiesPosition,
        orders,
        enemyInstancesManager,
        magicFireballInstancesManager,
      )
      return
    }

    if (mouseTileOrangeOver !== null) {
      this.clicOrangeTile(mouseTileOrangeOver)
    }
  }

  clicOrangeTile(mouseTileOrangeOver: TileOrange) {
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

  drawMouseIsOverOrangeTileWithTower(mouseTileOrangeOver: TileOrange | null) {
    const playerMouseTileOrangeOver = mouseTileOrangeOver

    if (!playerMouseTileOrangeOver) {
      return
    }

    const tower = playerMouseTileOrangeOver.getTower()

    if (!tower) {
      return
    }

    if (!tower.isMaxUpgraded) {
      const canUpgrade = this.#wallet.haveMoneyToUpgradeTower(
        tower.type,
        tower.upgradeLevel + 1,
      )
      this.#hudButtonsTowers.viewUpgradeCost(tower, canUpgrade)
      InfluenceArea.drawTowerInfluenceArea(tower, canUpgrade)
    } else {
      InfluenceArea.drawTowerInfluenceArea(tower, false)
    }

    this.#hudButtonsTowers.viewSellProfit(tower)
  }

  drawMouseIsOverOrangeTileWithoutTower() {
    if (this.mouseTileOrangeOver) {
      const towerSelected = this.#hudButtonsTowers.getSelectedTower()

      InfluenceArea.drawNoTowerInfluenceArea(
        this.mouseTileOrangeOver.position,
        towerSelected,
        this.#wallet.haveMoneyToBuyNewTower(towerSelected),
      )
    }
  }
}
