import p5 from 'p5'
import { Const } from './constants/Const'
import { Path } from './path/Path'
import { TileGenerator } from './tiles/TileGenerator'
import { TileOrange } from './tiles/TileOrange'
import { TowerGreen } from './towers/TowerGreen'
import { TowerRed } from './towers/TowerRed'
import { TowerYellow } from './towers/TowerYellow'
import { Arrays } from './utils/Arrays'
import { Enemy } from './enemies/Enemy'
import { Debug } from './hud/Debug'
import { ExplosionEnemy } from './explosions/ExplosionEnemy'
import { ExplosionMagicFireball } from './explosions/ExplosionMagicFireball'
import { ExplosionMagicIceball } from './explosions/ExplosionMagicIceball'
import { TextProperties } from './hud/TextProperties'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { LevelsData } from './levels/LevelsData'
import { MagicFireball } from './magics/MagicFireball'
import { MagicIceball } from './magics/MagicIceball'
import { MagicUFO } from './magics/MagicUFO'
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
import { EnemyAnimator } from './enemies/EnemyAnimator'
import { PathMovement } from './path/PathMovement'

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

function updateMagics() {
  MagicFireball.updateInstances()
  MagicFireball.removeDeadInstances()

  MagicIceball.updateInstances()
  MagicIceball.removeDeadInstances()

  MagicUFO.updateInstances()
  MagicUFO.removeDeadInstances()
}

function drawMagics() {
  MagicFireball.drawInstances()
  MagicIceball.drawInstances()
  MagicUFO.drawInstances()
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
  )
}

window.setup = () => {
  P5.p5.createCanvas(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT)

  disableContextualMenu()

  levelDataProvider = new LevelsDataProvider(LevelsData.data)

  const levelMap = levelDataProvider.getLevel(1)

  if (levelMap === undefined) {
    throw new Error('Map invalid')
  }

  TowerGreen.setImages(Images.greenTowerImages)
  TowerRed.setImages(Images.redTowerImages)
  TowerYellow.setImages(Images.yellowTowerImages)

  player = new Player()

  const tileGenerator = new TileGenerator(levelMap, Images.tileImages, player)
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
  hudButtonsMagic = new HudButtonsMagics(
    Images.magicUFOButtonImages,
    Images.magicFireballButtonImages,
    Images.magicIceballButtonImages,
  )

  // wallet = new Wallet(Wallet.GAME_TESTING_MODE, tileGenerator.initialMoney)
  wallet = new Wallet(Wallet.GAME_NORMAL_MODE, tileGenerator.initialMoney)
  hudButtonsTowers = new HudButtonsTowers(
    Images.towerGreenButtonImages,
    Images.towerRedButtonImages,
    Images.yellowTowerImages,
    wallet,
  )

  controls = new Controls(hudButtonsMagic, hudButtonsTowers, wallet)

  hudProgressBarBoss = new HudProgressBarBoss()
  hudProgressBarWave = new HudProgressBarWave(player)
  hudOtherIndicators = new HudOtherIndicators(wallet, player)
}

window.keyPressed = () => {
  controls.keyPressed()
}

const handleNewEnemyCreation = () => {
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

        Enemy.instantiateNormalEnemy(
          Enemy.waveEnemies,
          Path.initialEnemiesPosition,
          player.wave,
          player,
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

const handleWinners = () => {
  let gameStatus = Const.GAME_STATUS_PLAYING
  const winnerEnemies = Enemy.instances.filter((enemy) => enemy.winner)
  winnerEnemies.forEach((enemy) => {
    player.decreaseLives()
    if (player.lives <= 0) {
      gameStatus = Const.GAME_STATUS_GAME_OVER
    }
    enemy.resetWinner()
  })
  return gameStatus
}

const handleExplosionEnemys = () => {
  const deadEnemies: Enemy[] = Enemy.instances.filter((enemy) => enemy.dead)
  deadEnemies.forEach((enemy) => {
    ExplosionEnemy.instantiate(enemy.position)

    const $increasedMoney = enemy.endurance * Const.MONEY_MULTIPLICATOR
    wallet.increaseMoney($increasedMoney)
    player.increaseScore($increasedMoney * 2)
  })
}

const updateEnemies = () => {
  handleNewEnemyCreation()
  handleExplosionEnemys()
  Enemy.removeDeadInstances()
  Enemy.updateInstances()

  return handleWinners()
}

window.draw = () => {
  if (gameStatus === Const.GAME_STATUS_PLAYING) {
    gameStatus = updateEnemies()
    controls.mouseTileOrangeOver = getMouseTileOrangeOver()
    instantiateEnemies = hudProgressBarWave.updateWaveProgressBar()
    instantiateBoss = hudProgressBarBoss.updateBossProgressBar()

    if (instantiateBoss) {
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

      Enemy.instantiateBoss(
        Path.initialEnemiesPosition,
        player.wave,
        player,
        enemyBossAnimator,
        pathMovement,
      )
    }

    if (instantiateEnemies) {
      Enemy.allowCreateEnemies = true
    }

    updateMagics()
    Missile.updateInstances()
  }

  P5.p5.background('skyblue')
  P5.p5.rectMode(P5.p5.CORNER)

  P5.p5.image(Images.backgroundImage, 0, HudPanel.HEIGHT)

  Path.startTile.draw()
  Path.endTile.draw()

  TileOrange.instances.forEach((orangeTile) => {
    orangeTile.selectTarget(Enemy.instances)
    orangeTile.drawTile()
  })

  TileOrange.instances.forEach((orangeTile) => {
    orangeTile.updateTower()
    orangeTile.drawTower()
  })

  hudPanel.draw()

  if (controls.mouseTileOrangeOver !== null) {
    if (controls.mouseTileOrangeOver.hasTower()) {
      controls.drawMouseIsOverOrangeTileWithTower(controls.mouseTileOrangeOver)
    } else {
      controls.drawMouseIsOverOrangeTileWithoutTower()
    }
  } else {
    hudPanel.drawNormalHud()
  }
  hudButtonsTowers.draw()
  hudButtonsMagic.draw()
  hudProgressBarWave.draw()
  hudProgressBarBoss.draw()
  hudOtherIndicators.draw()

  Enemy.instances.forEach((enemy) => {
    enemy.draw()
  })

  drawMagics()

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
