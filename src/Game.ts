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
import { TileCreator } from './tiles/TileCreator'
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
  static #instance: Game | null = null

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

  static getInstance() {
    if (Game.#instance === null) {
      Game.#instance = new Game()
    }
    return Game.#instance
  }
  constructor() {
    if (Game.#instance !== null) {
      throw new Error(
        'Game is a singleton class. Use getInstance to get the instance of the Game.',
      )
    }
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

    this.#player = Player.getInstance()

    const towerGreenCreator = TowerGreenCreator.getInstance(
      Images.greenTowerImages,
    )
    const towerRedCreator = TowerRedCreator.getInstance(Images.redTowerImages)
    const towerYellowCreator = TowerYellowCreator.getInstance(
      Images.yellowTowerImages,
      this.#player,
    )

    const tileCreator = TileCreator.getInstance(
      levelMap,
      Images.tileImages,
      this.#player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )
    TileOrange.instances = tileCreator.orangeTiles
    Path.startTile = tileCreator.startTile

    Path.endTile = tileCreator.endTile
    const pathTiles = tileCreator.pathTiles

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

    // wallet = new Wallet(Wallet.GAME_TESTING_MODE, TileCreator.initialMoney)
    this.#wallet = new Wallet(Wallet.GAME_NORMAL_MODE, tileCreator.initialMoney)
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

  #updateMagics() {
    this.#magicFireballInstancesManager.updateInstances()
    this.#magicFireballInstancesManager.removeDeadInstances()

    this.#magicIceballInstancesManager.updateInstances()
    this.#magicIceballInstancesManager.removeDeadInstances()

    this.#magicUFOInstancesManager.updateInstances()
    this.#magicUFOInstancesManager.removeDeadInstances()
  }

  #drawMagics() {
    this.#magicFireballInstancesManager.drawInstances()
    this.#magicIceballInstancesManager.drawInstances()
    this.#magicUFOInstancesManager.drawInstances()
  }

  #instantiateEnemyBoss() {
    const enemyBossAnimator = this.#createEnemyBossAnimator()
    const pathMovement = this.#createPathMovement(Enemy.BOSS_VELOCITY)

    this.#enemyCreator.createBoss(
      Path.initialEnemiesPosition,
      this.#player.wave,
      enemyBossAnimator,
      pathMovement,
    )
  }

  #handleWinners() {
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

  #handleExplosionEnemys() {
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

  #drawTiles() {
    Path.startTile.draw()
    Path.endTile.draw()

    TileOrange.instances.forEach((orangeTile) => {
      orangeTile.selectTarget(this.#enemyInstancesManager.getAll())
      orangeTile.drawTile()
    })
  }

  #drawTowers() {
    TileOrange.instances.forEach((orangeTile) => {
      orangeTile.updateTower()
      orangeTile.drawTower()
    })
  }

  get #isMouseOverOrangeTile() {
    return this.#controls.mouseTileOrangeOver !== null
  }

  #drawHudBackgroundImage() {
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

  #drawInfluenceArea() {
    if (this.#isMouseOverOrangeTile) {
      const orangeTile = this.#controls.mouseTileOrangeOver
      if (orangeTile?.hasTower()) {
        this.#controls.drawInfluenceAreaWhenTowerExists(orangeTile.getTower())
      } else {
        this.#controls.drawInfluenceAreaWhenTowerNotExists(orangeTile?.position)
      }
    }
  }

  #drawHud() {
    this.#hudPanel.draw()
    this.#drawHudBackgroundImage()
    this.#drawInfluenceArea()
    this.#hudButtonsTowers.draw()
    this.#hudButtonsMagic.draw()
    this.#hudProgressBarWave.draw()
    this.#hudProgressBarBoss.draw()
    this.#hudOtherIndicators.draw()
  }

  #createPathMovement(speed: number) {
    return new PathMovement(Path.initialEnemiesPosition, Path.orders, speed)
  }

  #createEnemyNormalAnimator() {
    return new EnemyAnimator(
      Images.enemiesImages.slice(
        ...Arrays.getTwoNumbersFourTimes(Enemy.waveEnemies),
      ),
    )
  }

  #createEnemyBossAnimator() {
    return new EnemyAnimator(
      Images.enemiesImages.slice(
        ...Arrays.getTwoNumbersFourTimes(
          EnemyAnimator.INDEX_BOSS_IN_ENEMIES_IMAGES,
        ),
      ),
    )
  }

  #createEnemyNormal() {
    const enemyAnimator = this.#createEnemyNormalAnimator()
    const pathMovement = this.#createPathMovement(Enemy.VELOCITY)

    this.#enemyCreator.createNormal(
      Enemy.waveEnemies,
      Path.initialEnemiesPosition,
      this.#player.wave,
      enemyAnimator,
      pathMovement,
    )
  }

  #handleEnemyNormalCreation() {
    if (Enemy.allowCreateEnemies) {
      if (Enemy.waveEnemies < Enemy.TOTAL_ENEMIES) {
        Enemy.createEnemyTime++
        if (Enemy.createEnemyTime === Enemy.CREATION_MAX_TIME) {
          this.#createEnemyNormal()
          Enemy.createEnemyTime = 0
          Enemy.waveEnemies++
        }
      } else {
        this.#disableEnemyNormalCreation()
      }
    }
  }

  #disableEnemyNormalCreation() {
    Enemy.allowCreateEnemies = false
    Enemy.waveEnemies = 0
  }

  #updateEnemies() {
    this.#handleEnemyNormalCreation()
    this.#handleExplosionEnemys()
    this.#enemyInstancesManager.removeDeadInstances()
    this.#enemyInstancesManager.updateInstances()

    return this.#handleWinners()
  }

  #drawExplosions() {
    ExplosionEnemy.removeDeadInstances()
    ExplosionMagicFireball.removeDeadInstances()
    ExplosionMagicIceball.removeDeadInstances()

    ExplosionEnemy.updateInstances()
    ExplosionMagicFireball.updateInstances()
    ExplosionMagicIceball.updateInstances()
  }

  #drawFlyIndicators() {
    FlyIndicator.removeDeadInstances()
    FlyIndicator.updateInstances()

    FlyIndicator.drawInstances()
  }

  #drawBackground() {
    P5.p5.background('skyblue')
    P5.p5.rectMode(P5.p5.CORNER)

    P5.p5.image(Images.backgroundImage, 0, HudPanel.HEIGHT)
  }

  #drawPlayingThings() {
    this.#gameStatus = this.#updateEnemies()
    this.#controls.mouseTileOrangeOver = this.#getMouseTileOrangeOver()
    this.#instantiateEnemies = this.#hudProgressBarWave.updateWaveProgressBar()
    this.#instantiateBoss = this.#hudProgressBarBoss.updateBossProgressBar()

    if (this.#instantiateBoss) {
      this.#instantiateEnemyBoss()
    }

    if (this.#instantiateEnemies) {
      Enemy.allowCreateEnemies = true
    }

    this.#updateMagics()
    Missile.updateInstances()
  }

  #getMouseTileOrangeOver() {
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

  #drawEnemies() {
    this.#enemyInstancesManager.drawInstances()
  }

  #drawGameOverScreen() {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  #drawDebugElements() {
    Debug.showMouseCoordinates({ x: P5.p5.mouseX, y: P5.p5.mouseY })
    Debug.showLabelTestingMode()
  }

  draw() {
    if (this.#gameStatus === Const.GAME_STATUS_PLAYING) {
      this.#drawPlayingThings()
    }

    this.#drawBackground()
    this.#drawTiles()
    this.#drawTowers()
    this.#drawHud()
    this.#drawEnemies()

    this.#drawMagics()
    this.#drawExplosions()
    this.#drawFlyIndicators()

    if (this.#gameStatus === Const.GAME_STATUS_GAME_OVER) {
      this.#drawGameOverScreen()
    }

    Missile.removeDeadInstances()
    Missile.drawInstances()

    if (this.#wallet.isGameInTestingMode()) {
      this.#drawDebugElements()
    }
  }
}
