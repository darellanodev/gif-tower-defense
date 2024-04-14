import p5 from 'p5'
import { Const } from './constants/Const'
import { Path } from './enemies/Path'
import { TileGenerator } from './tiles/TileGenerator'
import { TileOrange } from './tiles/TileOrange'
import { TowerGreen } from './towers/TowerGreen'
import { TowerRed } from './towers/TowerRed'
import { TowerYellow } from './towers/TowerYellow'
import { MathUtils } from './utils/MathUtils'
import { Hud } from './hud/Hud'
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
import { Player } from './Player'
import { Images } from './resources/Images'
import { Missile } from './towers/Missile'
import { P5 } from './utils/P5'

let _p5: p5
let gameStatus: number = 0
let levelDataProvider: LevelsDataProvider
let instantiateBoss: boolean = false
let instantiateEnemies: boolean = false

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

function getMouseTileOrangeOver() {
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
  Player.mouseClicked(
    P5.p5.mouseX,
    P5.p5.mouseY,
    Images.magicIceballImage,
    Images.magicFireballImage,
    Images.magicUFOImage,
    Path.initialEnemiesPosition,
    Path.orders,
    Player.mouseTileOrangeOver,
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

  const tileGenerator = new TileGenerator(levelMap, Images.tileImages)
  TileOrange.instances = tileGenerator.orangeTiles
  Path.startTile = tileGenerator.startTile

  Path.endTile = tileGenerator.endTile
  const pathTiles = tileGenerator.pathTiles

  const path = new Path(Path.startTile, Path.endTile, pathTiles)
  Path.orders = path.makeOrders()
  Path.initialEnemiesPosition = path.getEnemiesInitialPosition()

  Player.gameMode = Player.GAME_TESTING_MODE
  Player.initialMoney = tileGenerator.initialMoney

  Hud.setImages(
    Images.hudImages,
    Images.towerGreenButtonImages,
    Images.towerRedButtonImages,
    Images.towerYellowButtonImages,
    Images.magicUFOButtonImages,
    Images.magicFireballButtonImages,
    Images.magicIceballButtonImages,
  )
  Hud.initializeWaveProgressBar()
  Hud.initializeBossProgressBar()
  Hud.initializeButtons()
}

window.keyPressed = () => {
  Player.keyPressed()
}

window.draw = () => {
  if (gameStatus === Const.GAME_STATUS_PLAYING) {
    gameStatus = Enemy.updateEnemies()
    Player.mouseTileOrangeOver = getMouseTileOrangeOver()
    instantiateEnemies = Hud.updateWaveProgressBar()
    instantiateBoss = Hud.updateBossProgressBar()

    if (instantiateBoss) {
      Enemy.instantiateBoss(
        Images.enemiesImages.slice(
          ...MathUtils.getTwoNumbersFourTimes(
            Enemy.INDEX_BOSS_IN_ENEMIES_IMAGES,
          ),
        ),
        Path.orders,
        Path.initialEnemiesPosition,
        Player.wave,
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

  P5.p5.image(Images.backgroundImage, 0, Hud.HEIGHT)

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

  Hud.draw()

  if (Player.mouseTileOrangeOver !== null) {
    if (Player.mouseTileOrangeOver.hasTower()) {
      Hud.drawOrangeTileWithTower()
    } else {
      Hud.drawOrangeTileWithoutTower()
    }
  } else {
    Hud.drawNoOrangeTile()
  }

  Enemy.instances.forEach((enemy) => {
    enemy.draw()
  })

  drawMagics()

  ExplosionEnemy.removeDeadInstances()
  ExplosionMagicFireball.removeDeadInstances()
  ExplosionMagicIceball.removeDeadInstances()

  ExplosionEnemy.updateInstances()
  ExplosionMagicFireball.updateInstances()
  ExplosionMagicIceball.updateInstances()

  if (gameStatus === Const.GAME_STATUS_GAME_OVER) {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  Missile.removeDeadInstances()
  Missile.drawInstances()

  if (Player.isGameInTestingMode()) {
    Debug.showMouseCoordinates({ x: P5.p5.mouseX, y: P5.p5.mouseY })
    Debug.showLabelTestingMode()
  }
}
