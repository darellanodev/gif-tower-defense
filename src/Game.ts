import { Path } from './levels/path/Path'
import { Player } from './player/Player'
import { Images } from './resources/Images'
import { Wallet } from './player/Wallet'
import { Controls } from './player/Controls'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { ExplosionMagicFireball } from './explosions/ExplosionMagicFireball'
import { ExplosionMagicIceball } from './explosions/ExplosionMagicIceball'
import { FlyIndicator } from './hud/FlyIndicator'
import { P5 } from './utils/P5'
import { Missile } from './towers/Missile'
import { StateManager } from './StateManager'
import { TilesManager } from './levels/tiles/TilesManager'
import { PathStartEnemiesPosition } from './levels/path/PathStartEnemiesPosition'
import { ButtonPauseCreator } from './hud/buttons/ButtonPauseCreator'
import { Button } from './hud/buttons/Button'
import { EnemySystem } from './enemies/EnemySystem'
import { HudSystem } from './hud/HudSystem'
import { ExplosionEnemy } from './explosions/ExplosionEnemy'
import { Enemy } from './enemies/Enemy'
import { HudPanel } from './hud/HudPanel'
import { TileSystem } from './levels/tiles/TileSystem'
import { MagicSystem } from './magics/MagicSystem'
import { TowerSystem } from './towers/TowerSystem'
import { ConstColor } from './constants/ConstColor'
import { MapDataType } from './types/mapDataType'
import { ConstGameMode } from './constants/ConstGameMode'

export class Game {
  static #instance: Game | null = null

  #enemySystem!: EnemySystem
  #hudSystem!: HudSystem
  #tileSystem!: TileSystem
  #magicSystem!: MagicSystem
  #towerSystem!: TowerSystem
  #player: Player
  #wallet: Wallet | null = null
  #controls: Controls | null = null
  #levelsDataProvider: LevelsDataProvider
  #instantiateBoss: boolean = false
  #instantiateEnemies: boolean = false
  #stateManager: StateManager
  #tilesManager: TilesManager
  #buttonPause: Button
  #gameMode: number

  static getInstance(
    gameMode: number,
    stateManager: StateManager,
    levelsDataProvider: LevelsDataProvider,
  ) {
    if (Game.#instance === null) {
      Game.#instance = new Game(gameMode, stateManager, levelsDataProvider)
    }
    return Game.#instance
  }

  constructor(
    gameMode: number,
    stateManager: StateManager,
    levelsDataProvider: LevelsDataProvider,
  ) {
    if (Game.#instance !== null) {
      throw new Error(
        'Game is a singleton class. Use getInstance to get the instance of the Game.',
      )
    }
    this.#gameMode = gameMode
    this.#levelsDataProvider = levelsDataProvider
    this.#stateManager = stateManager
    this.#player = Player.getInstance()
    this.#tilesManager = new TilesManager()
    this.#buttonPause = ButtonPauseCreator.initializePauseButton()

    // assign the singleton instance
    Game.#instance = this
  }

  #validateSystems() {
    if (
      !this.#enemySystem ||
      !this.#hudSystem ||
      !this.#tileSystem ||
      !this.#magicSystem ||
      !this.#towerSystem
    ) {
      throw new Error('Some systems are not initialized correctly')
    }
  }

  isGameModeTesting(): boolean {
    return this.#gameMode === ConstGameMode.TESTING
  }

  #initializeWallet(levelMap: MapDataType) {
    const gameMode = this.isGameModeTesting()
      ? ConstGameMode.TESTING
      : ConstGameMode.NORMAL
    this.#wallet = Wallet.getInstance(gameMode, levelMap.money)
  }

  #initializeEnemySystem() {
    this.#enemySystem = new EnemySystem(
      this.#player,
      this.#wallet,
      this.#stateManager,
    )
  }

  #initializeMagicSystem() {
    this.#magicSystem = new MagicSystem(this.#enemySystem)
  }

  #initializeHudSystem() {
    this.#hudSystem = new HudSystem(
      this.#player,
      this.#buttonPause,
      this.#wallet!,
      this.#stateManager,
      this.isGameModeTesting(),
    )
  }

  #initializeTileSystem() {
    this.#tileSystem = new TileSystem(this.#player, this.#tilesManager)
  }

  #initializeTowerSystem() {
    this.#towerSystem = new TowerSystem(this.#tilesManager, this.#enemySystem)
  }

  #makePathOrders() {
    const path = new Path(
      this.#tilesManager.tileStart!,
      this.#tilesManager.tileEnd!,
      this.#tilesManager.getAllPathTiles,
    )
    path.makeOrders()
    Path.orders = path.orders
  }
  #initializeEnemiesStartPosition() {
    const pathStartEnemiesPosition = PathStartEnemiesPosition.getInstance()
    pathStartEnemiesPosition.tileStart = this.#tilesManager.tileStart!

    this.#enemySystem.pathStartEnemiesPosition = pathStartEnemiesPosition.get()
  }

  #initializeAllSystems() {
    // the order is important
    this.#initializeEnemySystem()
    this.#initializeMagicSystem()
    this.#initializeHudSystem()
    this.#initializeTileSystem()
    this.#initializeTowerSystem()
  }

  #initializeControls() {
    this.#controls = new Controls(
      this.#stateManager,
      this.#hudSystem.hudButtonsMagics,
      this.#hudSystem.hudButtonsTowers,
      this.#buttonPause,
      this.#wallet!,
      this.#magicSystem.magicFireballInstancesManager,
      this.#magicSystem.magicIceballInstancesManager,
      this.#magicSystem.magicUFOInstancesManager,
      this.#enemySystem.pathStartEnemiesPosition,
    )
  }

  #configureHudSystem(levelMap: MapDataType) {
    this.#hudSystem.createHuds(this.#wallet!, levelMap)
    this.#hudSystem.setControls(this.#controls!)
  }

  loadLevel(levelId: number) {
    const levelMap = this.#levelsDataProvider.getById(levelId)
    // the order is important
    this.#initializeWallet(levelMap)
    this.#initializeAllSystems()

    this.#tileSystem.createTiles(levelMap)
    this.#makePathOrders()
    this.#initializeEnemiesStartPosition()

    this.#initializeControls()
    this.#configureHudSystem(levelMap)
    this.#validateSystems()
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
    P5.p5.background(ConstColor.BACKGROUND)
    P5.p5.rectMode(P5.p5.CORNER)

    P5.p5.image(Images.backgroundImage, 0, HudPanel.HEIGHT)
  }

  #updateEnemies() {
    this.#hudSystem!.hudProgressBarWave.updateWaveProgressBar()
    this.#instantiateEnemies = false
    if (this.#hudSystem!.hudProgressBarWave.isFullOfProgress()) {
      this.#hudSystem!.hudProgressBarWave.reInitProgress()
      this.#player.increaseWave()
      this.#instantiateEnemies = true
    }

    if (this.#instantiateEnemies) {
      Enemy.allowCreateEnemies = true
    }
  }

  #updateBoss() {
    this.#hudSystem!.hudProgressBarBoss.updateBossProgressBar()
    this.#instantiateBoss = false
    if (this.#hudSystem!.hudProgressBarBoss.isFullOfProgress()) {
      this.#hudSystem!.hudProgressBarBoss.reInitProgress()
      this.#instantiateBoss = true
    }

    if (this.#instantiateBoss) {
      this.#enemySystem!.instantiateEnemyBoss()
    }
  }

  update() {
    this.#enemySystem!.update()
    this.#controls!.mouseTileOrangeOver = this.#getMouseTileOrangeOver()

    this.#updateEnemies()
    this.#updateBoss()

    this.#magicSystem!.update()
    Missile.updateInstances()

    this.#towerSystem!.updateTowersEnemyTarget()
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

  draw() {
    this.#drawBackground()
    this.#tilesManager.drawAll()

    this.#towerSystem!.draw()
    this.#enemySystem!.draw()
    this.#hudSystem!.draw()
    this.#magicSystem!.draw()

    this.#drawExplosions()
    this.#drawFlyIndicators()

    Missile.removeDeadInstances()
    Missile.drawInstances()
  }
}
