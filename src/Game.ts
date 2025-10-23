import { Path } from './path/Path'
import { Player } from './player/Player'
import { Images } from './resources/Images'
import { MagicInstancesManager } from './magics/MagicInstancesManager'
import { Wallet } from './player/Wallet'
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
import { Size } from './types/size'
import { TileBlackCreator } from './tiles/TileBlackCreator'
import { ButtonPauseCreator } from './hud/ButtonPauseCreator'
import { Button } from './hud/Button'
import { EnemySystem } from './EnemySystem'
import { ExplosionEnemy } from './explosions/ExplosionEnemy'
import { Enemy } from './enemies/Enemy'

export class Game {
  static #instance: Game | null = null

  #enemySystem: EnemySystem
  #player: Player
  #magicFireballInstancesManager: MagicInstancesManager
  #magicIceballInstancesManager: MagicInstancesManager
  #magicUFOInstancesManager: MagicInstancesManager
  #wallet: Wallet | null = null
  #hudPanel: HudPanel
  #hudButtonsMagics: HudButtonsMagics
  #hudButtonsTowers: HudButtonsTowers | null = null
  #hudProgressBarBoss: HudProgressBarBoss
  #hudProgressBarWave: HudProgressBarWave
  #hudOtherIndicators: HudOtherIndicators | null = null
  #controls: Controls | null = null
  #levelsDataProvider: LevelsDataProvider
  #instantiateBoss: boolean = false
  #instantiateEnemies: boolean = false
  #stateManager: StateManager
  #tilesManager: TilesManager
  #tileOrangeCreator: TileOrangeCreator
  #tileBlackCreator: TileBlackCreator
  #tileStartCreator: TileStartCreator | null = null
  #tileEndCreator: TileEndCreator | null = null
  #tilePathCreator: TilePathCreator | null = null
  #buttonPause: Button

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

    this.#player = Player.getInstance()

    this.#enemySystem = new EnemySystem(
      this.#player,
      this.#wallet,
      this.#stateManager,
    )

    this.#magicFireballInstancesManager = new MagicInstancesManager(
      this.#enemySystem.enemyInstancesManager,
    )
    this.#magicIceballInstancesManager = new MagicInstancesManager(
      this.#enemySystem.enemyInstancesManager,
    )
    this.#magicUFOInstancesManager = new MagicInstancesManager(
      this.#enemySystem.enemyInstancesManager,
    )

    const towerGreenCreator = TowerGreenCreator.getInstance(
      Images.greenTowerImages,
    )
    const towerRedCreator = TowerRedCreator.getInstance(Images.redTowerImages)
    const towerYellowCreator = TowerYellowCreator.getInstance(
      Images.yellowTowerImages,
      this.#player,
    )

    this.#tilesManager = new TilesManager()

    // create black tiles
    this.#tileBlackCreator = TileBlackCreator.getInstance(Images.tileImages)

    // create orange tiles
    this.#tileOrangeCreator = TileOrangeCreator.getInstance(
      Images.tileImages,
      this.#player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )

    HudButtonsMagics.initializeButtons()

    HudButtonsTowers.initializeButtons()

    this.#buttonPause = ButtonPauseCreator.initializePauseButton()

    this.#hudPanel = new HudPanel(Images.hudImages)
    this.#hudButtonsMagics = new HudButtonsMagics()

    this.#hudProgressBarBoss = this.#createHudProgressBarBoss()
    this.#hudProgressBarWave = this.#createHudProgressBarWave()
    // assign the singleton instance
    Game.#instance = this
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

  loadLevel(levelId: number) {
    const levelMap = this.#levelsDataProvider.getById(levelId)

    this.#wallet = Wallet.getInstance(Wallet.GAME_TESTING_MODE, levelMap.money)
    // this.#wallet = Wallet.getInstance(
    //   Wallet.GAME_NORMAL_MODE,
    //   levelMap.money,
    // )

    this.#hudButtonsTowers = new HudButtonsTowers(this.#wallet)

    this.#hudOtherIndicators = new HudOtherIndicators(
      this.#wallet,
      this.#player,
      levelMap.title,
      levelMap.author,
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

    if (Path.orders.length === 0) {
      throw new Error('Empty orders')
    }

    const pathStartEnemiesPosition = PathStartEnemiesPosition.getInstance()
    pathStartEnemiesPosition.tileStart = tileStart

    this.#enemySystem.pathStartEnemiesPosition = pathStartEnemiesPosition.get()

    this.#tileOrangeCreator.createAll(levelMap, this.#tilesManager)

    this.#controls = new Controls(
      this.#stateManager,
      this.#hudButtonsMagics,
      this.#hudButtonsTowers,
      this.#buttonPause,
      this.#wallet,
      this.#magicFireballInstancesManager,
      this.#magicIceballInstancesManager,
      this.#magicUFOInstancesManager,
      pathStartEnemiesPosition.get(),
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

    // create black tiles
    this.#tileBlackCreator = TileBlackCreator.getInstance(Images.tileImages)
    this.#tileBlackCreator.createAll(levelMap, this.#tilesManager)
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

  #updateTowersEnemyTarget() {
    this.#tilesManager.getAllOrangeTiles.forEach((orangeTile) => {
      orangeTile.selectTarget(this.#enemySystem.enemyInstancesManager.getAll())
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
    if (
      this.#hudButtonsTowers === null ||
      this.#hudOtherIndicators === null ||
      this.#buttonPause === null
    ) {
      throw new Error(
        'hudButtonsTower or hudOtherIndicators or hudButtonOthers is null',
      )
    }
    this.#hudPanel.draw()
    this.#drawHudBackgroundImage()
    this.#drawInfluenceArea()
    this.#hudButtonsTowers.draw()
    this.#buttonPause.draw()
    this.#hudButtonsMagics.draw()
    this.#hudProgressBarWave.draw()
    this.#hudProgressBarBoss.draw()
    this.#hudOtherIndicators.draw()
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
    this.#enemySystem.updateEnemies()
    this.#controls.mouseTileOrangeOver = this.#getMouseTileOrangeOver()
    this.#instantiateEnemies = this.#hudProgressBarWave.updateWaveProgressBar()
    this.#instantiateBoss = this.#hudProgressBarBoss.updateBossProgressBar()

    if (this.#instantiateBoss) {
      this.#enemySystem.instantiateEnemyBoss()
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

  keyPressed(keyCode: number) {
    if (this.#controls === null) {
      throw new Error('controls is null')
    }
    this.#controls.keyPressed(keyCode)
  }

  #drawEnemies() {
    this.#enemySystem.enemyInstancesManager.drawInstances()
  }

  #drawGameOverScreen() {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  #drawPauseScreen() {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game paused', P5.p5.width / 2, P5.p5.height / 2)
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
    if (this.#controls !== null) {
      this.#controls.pauseTimeReady()
    }
    if (this.#wallet === null) {
      throw new Error('wallet is null')
    }
    if (this.#stateManager.isPlaying()) {
      this.#drawPlayingThings()
    }

    this.#drawBackground()
    this.#tilesManager.drawAll()
    this.#drawTowers()
    this.#drawEnemies()
    this.#drawHud()

    this.#drawMagics()
    this.#drawExplosions()
    this.#drawFlyIndicators()

    if (this.#stateManager.isGameOver()) {
      this.#drawGameOverScreen()
    }

    if (this.#stateManager.isPaused()) {
      this.#drawPauseScreen()
    }

    Missile.removeDeadInstances()
    Missile.drawInstances()

    if (this.#wallet.isGameInTestingMode()) {
      this.#drawDebugElements()
    }
  }
}
