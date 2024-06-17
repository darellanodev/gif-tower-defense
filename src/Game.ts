import { Enemy } from './enemies/Enemy'
import { EnemyAnimator } from './enemies/EnemyAnimator'
import { EnemyCreator } from './enemies/EnemyCreator'
import { Path } from './path/Path'
import { PathMovement } from './path/PathMovement'
import { Player } from './player/Player'
import { Images } from './resources/Images'
import { Arrays } from './utils/Arrays'
import { MagicInstancesManager } from './magics/MagicInstancesManager'
import { Const } from './constants/Const'
import { EnemyInstancesManager } from './enemies/EnemyInstancesManager'
import { Wallet } from './player/Wallet'
import { ExplosionEnemy } from './explosions/ExplosionEnemy'
import { TileOrange } from './tiles/TileOrange'
import { HudPanel } from './hud/HudPanel'
import { HudButtonsTowers } from './hud/HudButtonsTowers'
import { HudButtonsMagics } from './hud/HudButtonsMagics'
import { HudProgressBarBoss } from './hud/HudProgressBarBoss'
import { HudProgressBarWave } from './hud/HudProgressBarWave'
import { HudOtherIndicators } from './hud/HudOtherIndicators'
import { Controls } from './player/Controls'

export class Game {
  #enemyCreator: EnemyCreator
  #player: Player
  #magicFireballInstancesManager: MagicInstancesManager
  #magicIceballInstancesManager: MagicInstancesManager
  #magicUFOInstancesManager: MagicInstancesManager
  #enemyInstancesManager: EnemyInstancesManager
  #wallet: Wallet
  #hudPanel: HudPanel
  #hudButtonsMagic: HudButtonsMagics
  #hudButtonsTowers: HudButtonsTowers
  #hudProgressBarBoss: HudProgressBarBoss
  #hudProgressBarWave: HudProgressBarWave
  #hudOtherIndicators: HudOtherIndicators
  #controls: Controls
  constructor(
    enemyCreator: EnemyCreator,
    player: Player,
    magicFireballInstancesManager: MagicInstancesManager,
    magicIceballInstancesManager: MagicInstancesManager,
    magicUFOInstancesManager: MagicInstancesManager,
    enemyInstancesManager: EnemyInstancesManager,
    wallet: Wallet,
    hudPanel: HudPanel,
    hudButtonsMagic: HudButtonsMagics,
    hudButtonsTowers: HudButtonsTowers,
    hudProgressBarBoss: HudProgressBarBoss,
    hudProgressBarWave: HudProgressBarWave,
    hudOtherIndicators: HudOtherIndicators,
    controls: Controls,
  ) {
    this.#enemyCreator = enemyCreator
    this.#player = player
    this.#magicFireballInstancesManager = magicFireballInstancesManager
    this.#magicIceballInstancesManager = magicIceballInstancesManager
    this.#magicUFOInstancesManager = magicUFOInstancesManager
    this.#enemyInstancesManager = enemyInstancesManager
    this.#wallet = wallet
    this.#hudPanel = hudPanel
    this.#hudButtonsMagic = hudButtonsMagic
    this.#hudButtonsTowers = hudButtonsTowers
    this.#hudProgressBarBoss = hudProgressBarBoss
    this.#hudProgressBarWave = hudProgressBarWave
    this.#hudOtherIndicators = hudOtherIndicators
    this.#controls = controls
  }
  updateMagics() {
    this.#magicFireballInstancesManager.updateInstances()
    this.#magicFireballInstancesManager.removeDeadInstances()

    this.#magicIceballInstancesManager.updateInstances()
    this.#magicIceballInstancesManager.removeDeadInstances()

    this.#magicUFOInstancesManager.updateInstances()
    this.#magicUFOInstancesManager.removeDeadInstances()
  }

  drawMagics() {
    this.#magicFireballInstancesManager.drawInstances()
    this.#magicIceballInstancesManager.drawInstances()
    this.#magicUFOInstancesManager.drawInstances()
  }
  instantiateBoss() {
    const enemyBossAnimator = new EnemyAnimator(
      Images.enemiesImages.slice(
        ...Arrays.getTwoNumbersFourTimes(
          EnemyAnimator.INDEX_BOSS_IN_ENEMIES_IMAGES,
        ),
      ),
    )

    const pathMovement = new PathMovement(
      Path.initialEnemiesPosition,
      Path.orders,
      Enemy.BOSS_VELOCITY,
    )

    this.#enemyCreator.createBoss(
      Path.initialEnemiesPosition,
      this.#player.wave,
      enemyBossAnimator,
      pathMovement,
    )
  }

  handleWinners() {
    let gameStatus = Const.GAME_STATUS_PLAYING
    const winnerEnemies = this.#enemyInstancesManager
      .getAll()
      .filter((enemy) => enemy.winner)
    winnerEnemies.forEach((enemy) => {
      this.#player.decreaseLives()
      if (this.#player.lives <= 0) {
        gameStatus = Const.GAME_STATUS_GAME_OVER
      }
      enemy.resetWinner()
    })
    return gameStatus
  }

  handleExplosionEnemys() {
    const deadEnemies: Enemy[] = this.#enemyInstancesManager
      .getAll()
      .filter((enemy) => enemy.dead)
    deadEnemies.forEach((enemy) => {
      ExplosionEnemy.instantiate(enemy.position)

      const $increasedMoney = enemy.endurance * Const.MONEY_MULTIPLICATOR
      this.#wallet.increaseMoney($increasedMoney)
      this.#player.increaseScore($increasedMoney * 2)
    })
  }

  drawTiles() {
    Path.startTile.draw()
    Path.endTile.draw()

    TileOrange.instances.forEach((orangeTile) => {
      orangeTile.selectTarget(this.#enemyInstancesManager.getAll())
      orangeTile.drawTile()
    })
  }

  drawTowers() {
    TileOrange.instances.forEach((orangeTile) => {
      orangeTile.updateTower()
      orangeTile.drawTower()
    })
  }

  drawHud() {
    this.#hudPanel.draw()

    if (this.#controls.mouseTileOrangeOver !== null) {
      if (this.#controls.mouseTileOrangeOver.hasTower()) {
        this.#controls.drawMouseIsOverOrangeTileWithTower(
          this.#controls.mouseTileOrangeOver,
        )
      } else {
        this.#controls.drawMouseIsOverOrangeTileWithoutTower()
      }
    } else {
      this.#hudPanel.drawNormalHud()
    }
    this.#hudButtonsTowers.draw()
    this.#hudButtonsMagic.draw()
    this.#hudProgressBarWave.draw()
    this.#hudProgressBarBoss.draw()
    this.#hudOtherIndicators.draw()
  }

  handleNewEnemyCreation() {
    if (Enemy.allowCreateEnemies) {
      if (Enemy.waveEnemies < Enemy.TOTAL_ENEMIES) {
        Enemy.createEnemyTime++
        if (Enemy.createEnemyTime === Enemy.CREATION_MAX_TIME) {
          Enemy.createEnemyTime = 0
          const enemyAnimator = new EnemyAnimator(
            Images.enemiesImages.slice(
              ...Arrays.getTwoNumbersFourTimes(Enemy.waveEnemies),
            ),
          )

          const pathMovement = new PathMovement(
            Path.initialEnemiesPosition,
            Path.orders,
            Enemy.VELOCITY,
          )

          this.#enemyCreator.createNormal(
            Enemy.waveEnemies,
            Path.initialEnemiesPosition,
            this.#player.wave,
            enemyAnimator,
            pathMovement,
          )

          Enemy.waveEnemies++
        }
      } else {
        Enemy.allowCreateEnemies = false
        Enemy.waveEnemies = 0
      }
    }
  }
  updateEnemies() {
    this.handleNewEnemyCreation()
    this.handleExplosionEnemys()
    this.#enemyInstancesManager.removeDeadInstances()
    this.#enemyInstancesManager.updateInstances()

    return this.handleWinners()
  }
}
