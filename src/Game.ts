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
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { LevelsData } from './levels/LevelsData'
import { TowerGreenCreator } from './towers/TowerGreenCreator'
import { TowerRedCreator } from './towers/TowerRedCreator'
import { TowerYellowCreator } from './towers/TowerYellowCreator'
import { TileGenerator } from './tiles/TileGenerator'
import { ButtonMagic } from './hud/ButtonMagic'
import { ButtonTower } from './hud/ButtonTower'
import { ExplosionMagicFireball } from './explosions/ExplosionMagicFireball'
import { ExplosionMagicIceball } from './explosions/ExplosionMagicIceball'
import { FlyIndicator } from './hud/FlyIndicator'
import { P5 } from './utils/P5'
import { Missile } from './towers/Missile'
import { TextProperties } from './hud/TextProperties'
import { Debug } from './hud/Debug'

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
  #levelDataProvider: LevelsDataProvider
  #gameStatus: number = 0
  #instantiateBoss: boolean = false
  #instantiateEnemies: boolean = false

  constructor() {
    this.#enemyInstancesManager = new EnemyInstancesManager()
    this.#enemyCreator = new EnemyCreator(this.#enemyInstancesManager)

    this.#magicFireballInstancesManager = new MagicInstancesManager(
      this.#enemyInstancesManager,
    )
    this.#magicIceballInstancesManager = new MagicInstancesManager(
      this.#enemyInstancesManager,
    )
    this.#magicUFOInstancesManager = new MagicInstancesManager(
      this.#enemyInstancesManager,
    )

    this.#levelDataProvider = new LevelsDataProvider(LevelsData.data)

    const levelMap = this.#levelDataProvider.getLevel(1)

    if (levelMap === undefined) {
      throw new Error('Map invalid')
    }

    this.#player = new Player()

    const towerGreenCreator = new TowerGreenCreator(Images.greenTowerImages)
    const towerRedCreator = new TowerRedCreator(Images.redTowerImages)
    const towerYellowCreator = new TowerYellowCreator(
      Images.yellowTowerImages,
      this.#player,
    )

    const tileGenerator = new TileGenerator(
      levelMap,
      Images.tileImages,
      this.#player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )
    TileOrange.instances = tileGenerator.orangeTiles
    Path.startTile = tileGenerator.startTile

    Path.endTile = tileGenerator.endTile
    const pathTiles = tileGenerator.pathTiles

    const path = new Path(Path.startTile, Path.endTile, pathTiles)
    Path.orders = path.makeOrders()
    Path.initialEnemiesPosition = path.getEnemiesInitialPosition()

    ButtonMagic.setImages(
      Images.magicUFOButtonImages,
      Images.magicFireballButtonImages,
      Images.magicIceballButtonImages,
    )
    ButtonMagic.initializeButtons()

    ButtonTower.setImages(
      Images.towerGreenButtonImages,
      Images.towerRedButtonImages,
      Images.towerYellowButtonImages,
    )
    ButtonTower.initializeButtons()

    this.#hudPanel = new HudPanel(Images.hudImages)
    this.#hudButtonsMagic = new HudButtonsMagics()

    // wallet = new Wallet(Wallet.GAME_TESTING_MODE, tileGenerator.initialMoney)
    this.#wallet = new Wallet(
      Wallet.GAME_NORMAL_MODE,
      tileGenerator.initialMoney,
    )
    this.#hudButtonsTowers = new HudButtonsTowers(this.#wallet)

    this.#controls = new Controls(
      this.#hudButtonsMagic,
      this.#hudButtonsTowers,
      this.#wallet,
    )

    this.#hudProgressBarBoss = new HudProgressBarBoss()
    this.#hudProgressBarWave = new HudProgressBarWave(this.#player)
    this.#hudOtherIndicators = new HudOtherIndicators(
      this.#wallet,
      this.#player,
    )
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

  drawExplosions() {
    ExplosionEnemy.removeDeadInstances()
    ExplosionMagicFireball.removeDeadInstances()
    ExplosionMagicIceball.removeDeadInstances()

    ExplosionEnemy.updateInstances()
    ExplosionMagicFireball.updateInstances()
    ExplosionMagicIceball.updateInstances()
  }

  drawFlyIndicators() {
    FlyIndicator.removeDeadInstances()
    FlyIndicator.updateInstances()

    FlyIndicator.drawInstances()
  }

  drawBackground() {
    P5.p5.background('skyblue')
    P5.p5.rectMode(P5.p5.CORNER)

    P5.p5.image(Images.backgroundImage, 0, HudPanel.HEIGHT)
  }

  drawPlayingThings() {
    this.#gameStatus = this.updateEnemies()
    this.#controls.mouseTileOrangeOver = this.getMouseTileOrangeOver()
    this.#instantiateEnemies = this.#hudProgressBarWave.updateWaveProgressBar()
    this.#instantiateBoss = this.#hudProgressBarBoss.updateBossProgressBar()

    if (this.#instantiateBoss) {
      this.instantiateBoss()
    }

    if (this.#instantiateEnemies) {
      Enemy.allowCreateEnemies = true
    }

    this.updateMagics()
    Missile.updateInstances()
  }

  getMouseTileOrangeOver() {
    const result = TileOrange.instances.find((orangeTile) =>
      orangeTile.isInside(P5.p5.mouseX, P5.p5.mouseY),
    )

    return result ? result : null
  }

  mouseClicked() {
    this.#controls.mouseClicked(
      P5.p5.mouseX,
      P5.p5.mouseY,
      Images.magicIceballImage,
      Images.magicFireballImage,
      Images.magicUFOImages,
      Path.initialEnemiesPosition,
      Path.orders,
      this.#controls.mouseTileOrangeOver,
      this.#magicFireballInstancesManager,
      this.#magicIceballInstancesManager,
      this.#magicUFOInstancesManager,
    )
  }

  keyPressed() {
    this.#controls.keyPressed()
  }

  drawEnemies() {
    this.#enemyInstancesManager.drawInstances()
  }

  drawGameOverScreen() {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  drawDebugElements() {
    Debug.showMouseCoordinates({ x: P5.p5.mouseX, y: P5.p5.mouseY })
    Debug.showLabelTestingMode()
  }

  draw() {
    if (this.#gameStatus === Const.GAME_STATUS_PLAYING) {
      this.drawPlayingThings()
    }

    this.drawBackground()
    this.drawTiles()
    this.drawTowers()
    this.drawHud()
    this.drawEnemies()

    this.drawMagics()
    this.drawExplosions()
    this.drawFlyIndicators()

    if (this.#gameStatus === Const.GAME_STATUS_GAME_OVER) {
      this.drawGameOverScreen()
    }

    Missile.removeDeadInstances()
    Missile.drawInstances()

    if (this.#wallet.isGameInTestingMode()) {
      this.drawDebugElements()
    }
  }
}