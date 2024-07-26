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
import { HudPanel } from './hud/HudPanel'
import { HudButtonsTowers } from './hud/HudButtonsTowers'
import { HudButtonsMagics } from './hud/HudButtonsMagics'
import { HudProgressBarBoss } from './hud/HudProgressBarBoss'
import { HudProgressBarWave } from './hud/HudProgressBarWave'
import { HudOtherIndicators } from './hud/HudOtherIndicators'
import { Controls } from './player/Controls'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { TowerGreenCreator } from './towers/TowerGreenCreator'
import { TowerRedCreator } from './towers/TowerRedCreator'
import { TowerYellowCreator } from './towers/TowerYellowCreator'
import { ButtonMagic } from './hud/ButtonMagic'
import { ButtonTower } from './hud/ButtonTower'
import { ExplosionMagicFireball } from './explosions/ExplosionMagicFireball'
import { ExplosionMagicIceball } from './explosions/ExplosionMagicIceball'
import { FlyIndicator } from './hud/FlyIndicator'
import { P5 } from './utils/P5'
import { Missile } from './towers/Missile'
import { TextProperties } from './hud/TextProperties'
import { Debug } from './hud/Debug'
import { StateManager } from './StateManager'
import { TilesManager } from './tiles/TilesManager'
import { TileOrangeCreator } from './tiles/TileOrangeCreator'
import { TileStartCreator } from './tiles/TileStartCreator'
import { TileEndCreator } from './tiles/TileEndCreator'
import { TilePathCreator } from './tiles/TilePathCreator'
import { PathStartEnemiesPosition } from './path/PathStartEnemiesPosition'
import { Position } from './types/position'
import { MapDataType } from './types/mapDataType'

export class Game {
  static #instance: Game | null = null

  #enemyCreator: EnemyCreator
  #player: Player
  #magicFireballInstancesManager: MagicInstancesManager
  #magicIceballInstancesManager: MagicInstancesManager
  #magicUFOInstancesManager: MagicInstancesManager
  #enemyInstancesManager: EnemyInstancesManager
  #wallet: Wallet | null = null
  #hudPanel: HudPanel
  #hudButtonsMagics: HudButtonsMagics
  #hudButtonsTowers: HudButtonsTowers | null = null
  #hudProgressBarBoss: HudProgressBarBoss
  #hudProgressBarWave: HudProgressBarWave
  #hudOtherIndicators: HudOtherIndicators | null = null
  #controls: Controls | null = null
  #levelsDataProvider: LevelsDataProvider
  #gameStatus: number = 0
  #instantiateBoss: boolean = false
  #instantiateEnemies: boolean = false
  #stateManager: StateManager
  #tilesManager: TilesManager
  #tileOrangeCreator: TileOrangeCreator
  #tileStartCreator: TileStartCreator | null = null
  #tileEndCreator: TileEndCreator | null = null
  #tilePathCreator: TilePathCreator | null = null
  #pathStartEnemiesPosition: Position = { x: 0, y: 0 }

  static getInstance(
    stateManager: StateManager,
    levelsDataProvider: LevelsDataProvider,
  ) {
    if (Game.#instance === null) {
      Game.#instance = new Game(stateManager, levelsDataProvider)
    }
    return Game.#instance
  }
  constructor(
    stateManager: StateManager,
    levelsDataProvider: LevelsDataProvider,
  ) {
    if (Game.#instance !== null) {
      throw new Error(
        'Game is a singleton class. Use getInstance to get the instance of the Game.',
      )
    }
    this.#levelsDataProvider = levelsDataProvider
    this.#stateManager = stateManager
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
    this.#player = Player.getInstance()

    const towerGreenCreator = TowerGreenCreator.getInstance(
      Images.greenTowerImages,
    )
    const towerRedCreator = TowerRedCreator.getInstance(Images.redTowerImages)
    const towerYellowCreator = TowerYellowCreator.getInstance(
      Images.yellowTowerImages,
      this.#player,
    )

    this.#tilesManager = new TilesManager()

    // create orange tiles
    this.#tileOrangeCreator = TileOrangeCreator.getInstance(
      Images.tileImages,
      this.#player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )

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
    this.#hudButtonsMagics = new HudButtonsMagics()

    this.#hudProgressBarBoss = new HudProgressBarBoss()
    this.#hudProgressBarWave = new HudProgressBarWave(this.#player)
    // assign the singleton instance
    Game.#instance = this
  }

  loadLevel(levelId: number) {
    const levelMap = this.#levelsDataProvider.getLevel(levelId)

    this.#wallet = Wallet.getInstance(Wallet.GAME_TESTING_MODE, levelMap.money)
    // this.#wallet = Wallet.getInstance(
    //   Wallet.GAME_NORMAL_MODE,
    //   levelMap.money,
    // )

    this.#hudButtonsTowers = new HudButtonsTowers(this.#wallet)

    this.#hudOtherIndicators = new HudOtherIndicators(
      this.#wallet,
      this.#player,
    )

    this.#createTiles(levelMap)

    // create orders
    const tilesPath = this.#tilesManager.getAllPathTiles
    const tileStart = this.#tilesManager.tileStart
    const tileEnd = this.#tilesManager.tileEnd

    if (tileStart === null || tileEnd === null) {
      throw new Error('Map invalid: tileStart or tileEnd is null')
    }

    const path = new Path(tileStart, tileEnd, tilesPath)
    Path.orders = path.makeOrders()

    const pathStartEnemiesPosition =
      PathStartEnemiesPosition.getInstance(tileStart)
    this.#pathStartEnemiesPosition = pathStartEnemiesPosition.get()

    this.#tileOrangeCreator.createAll(levelMap, this.#tilesManager)

    this.#controls = new Controls(
      this.#hudButtonsMagics,
      this.#hudButtonsTowers,
      this.#wallet,
      this.#magicFireballInstancesManager,
      this.#magicIceballInstancesManager,
      this.#magicUFOInstancesManager,
      this.#pathStartEnemiesPosition,
    )
  }
  #createTiles(levelMap: MapDataType) {
    //create start tile
    this.#tileStartCreator = TileStartCreator.getInstance(Images.tileImages)
    this.#tileStartCreator.create(levelMap, this.#tilesManager)

    //create end tile
    this.#tileEndCreator = TileEndCreator.getInstance(Images.tileImages)
    this.#tileEndCreator.create(levelMap, this.#tilesManager)

    // create path tiles
    this.#tilePathCreator = TilePathCreator.getInstance()
    this.#tilePathCreator.createAll(levelMap, this.#tilesManager)
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
      this.#pathStartEnemiesPosition,
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
      if (this.#wallet === null) {
        throw new Error('wallet is null')
      }

      ExplosionEnemy.instantiate(enemy.position)

      const $increasedMoney = enemy.endurance * Const.MONEY_MULTIPLICATOR
      this.#wallet.increaseMoney($increasedMoney)
      this.#player.increaseScore($increasedMoney * 2)
    })
  }

  #updateTowersEnemyTarget() {
    this.#tilesManager.getAllOrangeTiles.forEach((orangeTile) => {
      orangeTile.selectTarget(this.#enemyInstancesManager.getAll())
    })
  }

  #drawTowers() {
    this.#tilesManager.getAllOrangeTiles.forEach((orangeTile) => {
      orangeTile.updateTower()
      orangeTile.drawTower()
    })
  }

  get #isMouseOverOrangeTile() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    return this.#controls.mouseTileOrangeOver !== null
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

  #drawHud() {
    if (this.#hudButtonsTowers === null || this.#hudOtherIndicators === null) {
      throw new Error('hudButtonsTower or hudOtherIndicators is null')
    }
    this.#hudPanel.draw()
    this.#drawHudBackgroundImage()
    this.#drawInfluenceArea()
    this.#hudButtonsTowers.draw()
    this.#hudButtonsMagics.draw()
    this.#hudProgressBarWave.draw()
    this.#hudProgressBarBoss.draw()
    this.#hudOtherIndicators.draw()
  }

  #createPathMovement(speed: number) {
    return new PathMovement(this.#pathStartEnemiesPosition, Path.orders, speed)
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
      this.#pathStartEnemiesPosition,
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
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
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
    const result = this.#tilesManager.getAllOrangeTiles.find((orangeTile) =>
      orangeTile.isInside(P5.p5.mouseX, P5.p5.mouseY),
    )

    return result ? result : null
  }

  mouseClicked() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    this.#controls.mouseClicked()
  }

  keyPressed() {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
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
    Debug.showMouseCoordinates(
      { x: P5.p5.mouseX, y: P5.p5.mouseY },
      { x: 260, y: 18 },
    )
    Debug.showLabelTestingMode({ x: 8, y: 100 })
  }

  update() {
    this.#updateTowersEnemyTarget()
  }

  draw() {
    if (this.#wallet === null) {
      throw new Error('wallet is null')
    }
    if (this.#gameStatus === Const.GAME_STATUS_PLAYING) {
      this.#drawPlayingThings()
    }

    this.#drawBackground()
    this.#tilesManager.drawAll()
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
