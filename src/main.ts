import { Position } from './types'
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
import { Image } from 'p5'
import { Resources } from './Resources'
import { LevelsDataProvider } from './LevelsDataProvider'
import { LevelsData } from './LevelsData'
import { MagicFireball } from './MagicFireball'
import { MagicIceball } from './MagicIceball'
import { MagicUFO } from './MagicUFO'
import { Player } from './Player'

let createEnemyTime: number = 0
let mouseTileOrangeOver: TileOrange
let waveEnemies: number = 0
let tileImages: Image[]
let greenTowerImages: Image[]
let redTowerImages: Image[]
let yellowTowerImages: Image[]
let hudImages: Image[]
let hudIconImages: Image[]
let backgroundImage: Image
let enemiesImages: Image[]
let influenceArea: InfluenceArea
let gameStatus: number = 0
let initialEnemiesPosition: Position
let allowCreateEnemies: boolean = true
let levelDataProvider: LevelsDataProvider
let magicFireballImage: Image
let magicIceballImage: Image
let magicUFOImage: Image
let instantiateBoss: boolean = false
let instantiateEnemies: boolean = false

function preload() {
  greenTowerImages = Resources.greenTower()
  redTowerImages = Resources.redTower()
  yellowTowerImages = Resources.yellowTower()
  enemiesImages = Resources.enemies()
  tileImages = Resources.tileImages()
  hudImages = Resources.hudImages()
  hudIconImages = Resources.hudIconImages()
  backgroundImage = Resources.backgroundImage()
  magicFireballImage = Resources.magicFireball()
  magicIceballImage = Resources.magicIceball()
  magicUFOImage = Resources.magicUFO()
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

  TowerGreen.initialize(greenTowerImages)
  TowerRed.initialize(redTowerImages)
  TowerYellow.initialize(yellowTowerImages)

  const tileGenerator = new TileGenerator(levelMap, tileImages)
  TileOrange.instances = tileGenerator.orangeTiles
  Path.startTile = tileGenerator.startTile

  Path.endTile = tileGenerator.endTile
  const pathTiles = tileGenerator.pathTiles

  const path = new Path(Path.startTile, Path.endTile, pathTiles)
  Path.orders = path.makeOrders()
  initialEnemiesPosition = path.getEnemiesInitialPosition()

  Player.money = tileGenerator.initialMoney

  Hud.initialize(hudImages, hudIconImages)

  influenceArea = new InfluenceArea()
}

function keyPressed() {
  Player.keyPressed()
}

function mouseClicked() {
  Player.mouseClicked(
    mouseX,
    mouseY,
    magicIceballImage,
    magicFireballImage,
    magicUFOImage,
    initialEnemiesPosition,
    Path.orders,
    mouseTileOrangeOver,
  )
}

function handleNewEnemyCreation() {
  if (allowCreateEnemies) {
    if (waveEnemies < Enemy.TOTAL_ENEMIES) {
      createEnemyTime++
      if (createEnemyTime === Enemy.CREATION_MAX_TIME) {
        createEnemyTime = 0

        Enemy.instantiateNormalEnemy(
          enemiesImages.slice(...MathUtils.getTwoNumbersFourTimes(waveEnemies)),
          waveEnemies,
          Path.orders,
          initialEnemiesPosition,
          Player.wave,
        )

        waveEnemies++
      }
    } else {
      allowCreateEnemies = false
      waveEnemies = 0
    }
  }
}

function updateEnemies() {
  handleNewEnemyCreation()
  Enemy.handleExplosionEnemys()
  Enemy.removeDeadInstances()
  Enemy.updateInstances()
  gameStatus = Enemy.handleWinners()
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
    updateEnemies()
    mouseTileOrangeOver = getMouseTileOrangeOver()
    instantiateEnemies = Hud.updateWaveProgressBar()
    instantiateBoss = Hud.updateBossProgressBar()

    if (instantiateBoss) {
      Enemy.instantiateBoss(
        enemiesImages.slice(
          ...MathUtils.getTwoNumbersFourTimes(
            Enemy.INDEX_BOSS_IN_ENEMIES_IMAGES,
          ),
        ),
        Path.orders,
        initialEnemiesPosition,
        Player.wave,
      )
    }

    if (instantiateEnemies) {
      allowCreateEnemies = true
    }

    updateMagics()
  }

  background('skyblue')
  rectMode(CORNER)

  image(backgroundImage, 0, Hud.HEIGHT)

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

  const canBuySelectedTower = Player.canBuyNewTower(Hud.getSelectedTower())
  const canBuyTowerGreen = Player.canBuyNewTower(TowerGreen.ID)
  const canBuyTowerRed = Player.canBuyNewTower(TowerRed.ID)
  const canBuyTowerYellow = Player.canBuyNewTower(TowerYellow.ID)

  if (mouseTileOrangeOver !== null) {
    if (mouseTileOrangeOver.hasTower()) {
      const tileTower = mouseTileOrangeOver.getTower()

      Hud.selectHudMode(tileTower)
      if (!tileTower.maxUpgraded) {
        const canUpgrade = Player.haveMoneyToBuy(
          tileTower.type,
          tileTower.upgradeLevel + 1,
        )
        Hud.viewUpgradeCost(tileTower, canUpgrade)
        influenceArea.drawTowerInfluenceArea(tileTower, canUpgrade)
      }

      Hud.viewSellProfit(tileTower)
    } else {
      influenceArea.drawHudTowerInfluenceArea(
        Hud.getSelectedTower(),
        mouseTileOrangeOver.getPosition(),
        canBuySelectedTower,
      )

      Hud.mode = Hud.NORMAL
      Hud.setCanBuy(canBuyTowerGreen, canBuyTowerRed, canBuyTowerYellow)
      Hud.hideUpgradeCost()
      Hud.hideSellProfit()
    }
  } else {
    Hud.mode = Hud.NORMAL
    Hud.setCanBuy(canBuyTowerGreen, canBuyTowerRed, canBuyTowerYellow)
    Hud.hideUpgradeCost()
    Hud.hideSellProfit()
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

  Debug.showMouseCoordinates({ x: mouseX, y: mouseY })
}
