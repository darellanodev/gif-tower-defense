import p5 from 'p5'
import { Const } from './constants/Const'
import { Path } from './path/Path'
import { TileGenerator } from './tiles/TileGenerator'
import { TileOrange } from './tiles/TileOrange'
import { Enemy } from './enemies/Enemy'
import { Debug } from './hud/Debug'
import { ExplosionEnemy } from './explosions/ExplosionEnemy'
import { ExplosionMagicFireball } from './explosions/ExplosionMagicFireball'
import { ExplosionMagicIceball } from './explosions/ExplosionMagicIceball'
import { TextProperties } from './hud/TextProperties'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { LevelsData } from './levels/LevelsData'
import { Player } from './player/Player'
import { Images } from './resources/Images'
import { Missile } from './towers/Missile'
import { P5 } from './utils/P5'
import { ButtonTower } from './hud/ButtonTower'
import { ButtonMagic } from './hud/ButtonMagic'
import { FlyIndicator } from './hud/FlyIndicator'
import { HudPanel } from './hud/HudPanel'
import { HudButtonsMagics } from './hud/HudButtonsMagics'
import { HudButtonsTowers } from './hud/HudButtonsTowers'
import { HudProgressBarBoss } from './hud/HudProgressBarBoss'
import { HudProgressBarWave } from './hud/HudProgressBarWave'
import { HudOtherIndicators } from './hud/HudOtherIndicators'
import { Wallet } from './player/Wallet'
import { Controls } from './player/Controls'
import { EnemyInstancesManager } from './enemies/EnemyInstancesManager'
import { EnemyCreator } from './enemies/EnemyCreator'
import { MagicInstancesManager } from './magics/MagicInstancesManager'
import { TowerGreenCreator } from './towers/TowerGreenCreator'
import { TowerRedCreator } from './towers/TowerRedCreator'
import { TowerYellowCreator } from './towers/TowerYellowCreator'
import { Game } from './Game'

let _p5: p5
let gameStatus: number = 0
let levelDataProvider: LevelsDataProvider
let instantiateBoss: boolean = false
let instantiateEnemies: boolean = false
let hudPanel: HudPanel
let hudButtonsMagic: HudButtonsMagics
let hudButtonsTowers: HudButtonsTowers
let hudProgressBarBoss: HudProgressBarBoss
let hudProgressBarWave: HudProgressBarWave
let hudOtherIndicators: HudOtherIndicators
let player: Player
let wallet: Wallet
let controls: Controls
let enemyInstancesManager: EnemyInstancesManager
let enemyCreator: EnemyCreator
let magicFireballInstancesManager: MagicInstancesManager
let magicIceballInstancesManager: MagicInstancesManager
let magicUFOInstancesManager: MagicInstancesManager
let game: Game

// ugly hack: remove the extra canvas created
window.addEventListener('load', () => {
  const defaultCanvas1 = document.getElementById('defaultCanvas1')
  if (defaultCanvas1) {
    defaultCanvas1.remove()
  }
})

declare global {
  interface Window {
    setup: () => void
    draw: () => void
    preload: () => void
    keyPressed: () => void
    mouseClicked: () => void
  }
}

window.preload = () => {
  _p5 = new p5((p: p5) => {})
  P5.init(_p5)
  Images.loadAll()
}

function getMouseTileOrangeOver(): TileOrange | null {
  const result = TileOrange.instances.find((orangeTile) =>
    orangeTile.isInside(P5.p5.mouseX, P5.p5.mouseY),
  )

  return result ? result : null
}

function disableContextualMenu() {
  for (let element of <any>document.getElementsByClassName('p5Canvas')) {
    element.addEventListener('contextmenu', (e: any) => {
      e.preventDefault()
      window.mouseClicked()
    })
  }
}

window.mouseClicked = () => {
  controls.mouseClicked(
    P5.p5.mouseX,
    P5.p5.mouseY,
    Images.magicIceballImage,
    Images.magicFireballImage,
    Images.magicUFOImages,
    Path.initialEnemiesPosition,
    Path.orders,
    controls.mouseTileOrangeOver,
    magicFireballInstancesManager,
    magicIceballInstancesManager,
    magicUFOInstancesManager,
  )
}

window.setup = () => {
  P5.p5.createCanvas(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT)

  disableContextualMenu()

  enemyInstancesManager = new EnemyInstancesManager()
  enemyCreator = new EnemyCreator(enemyInstancesManager)

  magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  magicIceballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  magicUFOInstancesManager = new MagicInstancesManager(enemyInstancesManager)

  levelDataProvider = new LevelsDataProvider(LevelsData.data)

  const levelMap = levelDataProvider.getLevel(1)

  if (levelMap === undefined) {
    throw new Error('Map invalid')
  }

  player = new Player()

  const towerGreenCreator = new TowerGreenCreator(Images.greenTowerImages)
  const towerRedCreator = new TowerRedCreator(Images.redTowerImages)
  const towerYellowCreator = new TowerYellowCreator(
    Images.yellowTowerImages,
    player,
  )

  const tileGenerator = new TileGenerator(
    levelMap,
    Images.tileImages,
    player,
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

  hudPanel = new HudPanel(Images.hudImages)
  hudButtonsMagic = new HudButtonsMagics()

  // wallet = new Wallet(Wallet.GAME_TESTING_MODE, tileGenerator.initialMoney)
  wallet = new Wallet(Wallet.GAME_NORMAL_MODE, tileGenerator.initialMoney)
  hudButtonsTowers = new HudButtonsTowers(wallet)

  controls = new Controls(hudButtonsMagic, hudButtonsTowers, wallet)

  hudProgressBarBoss = new HudProgressBarBoss()
  hudProgressBarWave = new HudProgressBarWave(player)
  hudOtherIndicators = new HudOtherIndicators(wallet, player)

  game = new Game(
    enemyCreator,
    player,
    magicIceballInstancesManager,
    magicFireballInstancesManager,
    magicUFOInstancesManager,
    enemyInstancesManager,
    wallet,
    hudPanel,
    hudButtonsMagic,
    hudButtonsTowers,
    hudProgressBarBoss,
    hudProgressBarWave,
    hudOtherIndicators,
    controls,
  )
}

window.keyPressed = () => {
  controls.keyPressed()
}

window.draw = () => {
  if (gameStatus === Const.GAME_STATUS_PLAYING) {
    gameStatus = game.updateEnemies()
    controls.mouseTileOrangeOver = getMouseTileOrangeOver()
    instantiateEnemies = hudProgressBarWave.updateWaveProgressBar()
    instantiateBoss = hudProgressBarBoss.updateBossProgressBar()

    if (instantiateBoss) {
      game.instantiateBoss()
    }

    if (instantiateEnemies) {
      Enemy.allowCreateEnemies = true
    }

    game.updateMagics()
    Missile.updateInstances()
  }

  P5.p5.background('skyblue')
  P5.p5.rectMode(P5.p5.CORNER)

  P5.p5.image(Images.backgroundImage, 0, HudPanel.HEIGHT)

  game.drawTiles()
  game.drawTowers()
  game.drawHud()

  enemyInstancesManager.drawInstances()

  game.drawMagics()

  ExplosionEnemy.removeDeadInstances()
  ExplosionMagicFireball.removeDeadInstances()
  ExplosionMagicIceball.removeDeadInstances()
  FlyIndicator.removeDeadInstances()

  ExplosionEnemy.updateInstances()
  ExplosionMagicFireball.updateInstances()
  ExplosionMagicIceball.updateInstances()
  FlyIndicator.updateInstances()

  if (gameStatus === Const.GAME_STATUS_GAME_OVER) {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  Missile.removeDeadInstances()
  Missile.drawInstances()
  FlyIndicator.drawInstances()

  if (wallet.isGameInTestingMode()) {
    Debug.showMouseCoordinates({ x: P5.p5.mouseX, y: P5.p5.mouseY })
    Debug.showLabelTestingMode()
  }
}
