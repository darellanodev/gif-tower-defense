import { Const } from './Const'
import { Path } from './Path'
import { TileGenerator } from './TileGenerator'
import { TileOrange } from './TileOrange'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { MathUtils } from './MathUtils'
import { Hud } from './Hud'
import { Enemy } from './Enemy'
import { Debug } from './Debug'
import { InfluenceArea } from './InfluenceArea'
import { ExplosionEnemy } from './ExplosionEnemy'
import { ExplosionMagicFireball } from './ExplosionMagicFireball'
import { ExplosionMagicIceball } from './ExplosionMagicIceball'
import { TextProperties } from './TextProperties'
import { LevelsDataProvider } from './LevelsDataProvider'
import { LevelsData } from './LevelsData'
import { MagicFireball } from './MagicFireball'
import { MagicIceball } from './MagicIceball'
import { MagicUFO } from './MagicUFO'
import { Player } from './Player'
import { Images } from './Images'
import { Missile } from './Missile'

let gameStatus: number = 0
let levelDataProvider: LevelsDataProvider
let instantiateBoss: boolean = false
let instantiateEnemies: boolean = false

function preload() {
  Images.loadAll()
}

function disableContextualMenu() {
  for (let element of <any>document.getElementsByClassName('p5Canvas')) {
    element.addEventListener('contextmenu', (e: any) => {
      e.preventDefault()
      mouseClicked()
    })
  }
}

function setup() {
  disableContextualMenu()

  createCanvas(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT)

  levelDataProvider = new LevelsDataProvider(LevelsData.data)

  const levelMap = levelDataProvider.getLevel(1)

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

  Player.money = tileGenerator.initialMoney
  Player.money = 100000

  Hud.setImages(Images.hudImages, Images.hudIconImages)
  Hud.initializeWaveProgressBar()
  Hud.initializeBossProgressBar()
}

function keyPressed() {
  Player.keyPressed()
}

function mouseClicked() {
  Player.mouseClicked(
    mouseX,
    mouseY,
    Images.magicIceballImage,
    Images.magicFireballImage,
    Images.magicUFOImage,
    Path.initialEnemiesPosition,
    Path.orders,
    Player.mouseTileOrangeOver,
  )
}

function getMouseTileOrangeOver() {
  const result = TileOrange.instances.find((orangeTile) =>
    orangeTile.isInside(mouseX, mouseY),
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

function draw() {
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

  background('skyblue')
  rectMode(CORNER)

  image(Images.backgroundImage, 0, Hud.HEIGHT)

  Path.startTile.draw()
  Path.endTile.draw()

  TileOrange.instances.forEach((orangeTile) => {
    orangeTile.selectTarget(Enemy.instances)
    orangeTile.drawTile()
  })

  TileOrange.instances.forEach((orangeTile) => {
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
    text('Game over', width / 2, height / 2)
  }

  Missile.removeDeadInstances()
  Missile.drawInstances()

  Debug.showMouseCoordinates({ x: mouseX, y: mouseY })
}
