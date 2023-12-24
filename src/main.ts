import { TowerType } from './types'
import { Const } from './Const'
import { Path } from './Path'
import { PathTile } from './PathTile'
import { StartTile } from './StartTile'
import { EndTile } from './EndTile'
import { TileGenerator } from './TileGenerator'
import { TowerGenerator } from './TowerGenerator'
import { OrangeTile } from './OrangeTile'
import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'
import { Distance } from './Distance'
import { CustomRange } from './CustomRange'
import { Hud } from './Hud'
import { Enemy } from './Enemy'
import { Debug } from './Debug'
import { Random } from './Random'
import { ProgressBar } from './ProgressBar'
import { Wallet } from './Wallet'
import { ImageUtils } from './ImageUtils'
import { InfluenceArea } from './InfluenceArea'
import { EnemyExplosion } from './EnemyExplosion'
import { Image } from 'p5'
import { ParticleSystem } from './ParticleSystem'

let orders: number[]
let createEnemyTime: number
let enemies: Enemy[]
let hud: Hud
let wallet: Wallet
let orangeTiles: OrangeTile[]
let mouseOrangeTileOver: OrangeTile
let wave: number
let waveEnemies: number
let tileImages: Image[]
let greenTowerImages: Image[]
let redTowerImages: Image[]
let yellowTowerImages: Image[]
let startTile: StartTile
let endTile: EndTile
let hudImages: Image[]
let backgroundImage: Image
let enemiesImages: Image[]
let towerGenerator: TowerGenerator
let influenceArea: InfluenceArea
let enemyExplosions: EnemyExplosion[]
let lives: number
let score: number

function preload() {
  greenTowerImages = []
  redTowerImages = []
  yellowTowerImages = []
  enemiesImages = []

  CustomRange.make(0, Const.TOTAL_TOWER_UPGRADES).forEach((v) => {
    greenTowerImages.push(
      loadImage('img/towers/green_tower_upgrade_' + v + '.png'),
    )
    redTowerImages.push(loadImage('img/towers/red_tower_upgrade_' + v + '.png'))
    yellowTowerImages.push(
      loadImage('img/towers/yellow_tower_upgrade_' + v + '.png'),
    )
  })

  CustomRange.make(1, Const.TOTAL_ENEMIES).forEach((v) => {
    enemiesImages.push(loadImage('img/enemies/' + v + '_center.png'))
    enemiesImages.push(loadImage('img/enemies/' + v + '_left.png'))
    enemiesImages.push(loadImage('img/enemies/' + v + '_right.png'))
    enemiesImages.push(loadImage('img/enemies/' + v + '_closed.png'))
  })

  tileImages = [
    loadImage('img/tiles/orange.png'),
    loadImage('img/tiles/black.png'),
    loadImage('img/tiles/end_down.png'),
    loadImage('img/tiles/end_right.png'),
    loadImage('img/tiles/end_left.png'),
    loadImage('img/tiles/end_up.png'),
    loadImage('img/tiles/start_down.png'),
    loadImage('img/tiles/start_right.png'),
    loadImage('img/tiles/start_left.png'),
    loadImage('img/tiles/start_up.png'),
    loadImage('img/tiles/crystal.png'),
  ]

  hudImages = [
    loadImage('img/hud/normal.png'),
    loadImage('img/hud/upgrading.png'),
    loadImage('img/hud/upgrading_max.png'),
  ]

  backgroundImage = loadImage('img/backgrounds/ground.jpg')
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

  const levelMap = `111111111111111x,
                    1000000000000000,
                    1011111111111111,
                    1010000000000001,
                    1010000111111101,
                    1011111100000101,
                    1000000000000101,
                    1111111111111101,
                    0000000000000001,
                    y111111111111111@3,2,-50,450,150`

  createEnemyTime = 0

  towerGenerator = new TowerGenerator(
    greenTowerImages,
    redTowerImages,
    yellowTowerImages,
    Const,
    GreenTower,
    RedTower,
    YellowTower,
    Distance,
    ProgressBar,
  )

  const tileGenerator = new TileGenerator(
    levelMap,
    tileImages,
    Const,
    OrangeTile,
    PathTile,
    StartTile,
    EndTile,
    towerGenerator,
  )
  orangeTiles = tileGenerator.orangeTiles()
  startTile = tileGenerator.startTile()
  endTile = tileGenerator.endTile()
  const pathTiles = tileGenerator.pathTiles()

  const path = new Path(startTile, endTile, pathTiles, Const)
  orders = path.makeOrders()

  wallet = new Wallet(tileGenerator.getInitialMoney(), Const)
  lives = 7
  score = 0
  hud = new Hud(hudImages, wallet.getMoney(), Const, lives, score)

  wave = 1
  waveEnemies = 0
  enemies = []

  enemyExplosions = []

  influenceArea = new InfluenceArea(Const)
}

function keyPressed() {
  switch (keyCode) {
    case Const.KEY_1:
      hud.selectTower(Const.GREEN_TOWER)
      break

    case Const.KEY_2:
      hud.selectTower(Const.RED_TOWER)
      break

    case Const.KEY_3:
      hud.selectTower(Const.YELLOW_TOWER)
      break
  }
}

function canUpgradeTower(tower: TowerType) {
  let canUpgrade = false
  if (tower.getUpgradeLevel() < Const.UPGRADE_MAX_LEVEL) {
    if (wallet.haveMoneyToBuy(tower.getType(), tower.getUpgradeLevel() + 1)) {
      canUpgrade = true
    }
  }
  return canUpgrade
}

function canBuyNewTower() {
  let canBuy = false
  const zeroUpgradeLevel = 0
  if (wallet.haveMoneyToBuy(hud.getSelectedTower(), zeroUpgradeLevel)) {
    canBuy = true
  }
  return canBuy
}

function canBuyTower(tower: TowerType) {
  let result = false
  if (tower) {
    result = canUpgradeTower(tower)
  } else {
    result = canBuyNewTower()
  }
  return result
}

function handleHudButtons() {
  if (hud.isInsideGreenTowerButton(mouseX, mouseY)) {
    hud.selectTower(Const.GREEN_TOWER)
  }
  if (hud.isInsideRedTowerButton(mouseX, mouseY)) {
    hud.selectTower(Const.RED_TOWER)
  }
  if (hud.isInsideYellowTowerButton(mouseX, mouseY)) {
    hud.selectTower(Const.YELLOW_TOWER)
  }
}

function handleSellTower() {
  const profit = mouseOrangeTileOver.sellTower()
  wallet.increase(profit)
  hud.setMoney(wallet.getMoney())
}

function handleBuyTower() {
  if (canBuyTower(mouseOrangeTileOver.getTower())) {
    const cost = mouseOrangeTileOver.buyTower(hud.getSelectedTower())
    wallet.decrease(cost)
    hud.setMoney(wallet.getMoney())
  }
}

function mouseClicked() {
  if (hud.isInsideButtonsBar(mouseX, mouseY)) {
    handleHudButtons()
    return
  }

  if (mouseOrangeTileOver !== null) {
    if (mouseButton === RIGHT && mouseOrangeTileOver.hasTower()) {
      if (mouseOrangeTileOver.getTower().isNotUpgrading()) {
        handleSellTower()
      }
    }

    if (mouseButton === LEFT) {
      handleBuyTower()
    }
  }
}

function createNewEnemy(waveEnemy: number) {
  enemies.push(
    new Enemy(
      enemiesImages.slice(...ImageUtils.getRangeImagesOfEnemy(waveEnemy)),
      orders,
      startTile,
      endTile,
      Const,
      Random,
      ProgressBar,
    ),
  )
}

function updateEnemies() {
  if (waveEnemies < Const.TOTAL_ENEMIES) {
    createEnemyTime++
    if (createEnemyTime === Const.CREATE_ENEMY_MAX_TIME) {
      createEnemyTime = 0
      createNewEnemy(waveEnemies)
      waveEnemies++
    }
  }
  // explosions
  const deadEnemies: Enemy[] = enemies.filter((enemy) => enemy.isDead())
  deadEnemies.forEach((enemy) => {
    enemyExplosions.push(
      new EnemyExplosion(enemy.getX(), enemy.getY(), Const, ParticleSystem),
    )
  })
  enemyExplosions = enemyExplosions.filter((enemyExplosion) =>
    enemyExplosion.isActive(),
  )

  // remove dead enemies
  enemies = enemies.filter((enemy) => enemy.isAlive())

  enemies.forEach((enemy) => {
    enemy.update()
  })

  // winner enemies decrease player lives
  const winnerEnemies = enemies.filter((enemy) => enemy.isWinner())
  winnerEnemies.forEach((enemy) => {
    lives--
    hud.setLives(lives)
    enemy.resetWinner()
  })
}

function updateMouseOrangeTileOver() {
  mouseOrangeTileOver = getMouseOrangeTileOver()
}

function getMouseOrangeTileOver() {
  const result = orangeTiles.find((orangeTile) =>
    orangeTile.isInside(mouseX, mouseY),
  )

  return result ? result : null
}

function draw() {
  updateEnemies()
  updateMouseOrangeTileOver()

  background('skyblue')
  rectMode(CORNER)

  image(backgroundImage, 0, Const.HUD_HEIGHT)

  startTile.draw()
  endTile.draw()

  orangeTiles.forEach((orangeTile) => {
    orangeTile.selectTarget(enemies)
    orangeTile.drawTile()
  })

  orangeTiles.forEach((orangeTile) => {
    orangeTile.drawTower()
  })

  hud.draw()

  if (mouseOrangeTileOver !== null) {
    if (mouseOrangeTileOver.hasTower()) {
      influenceArea.drawTowerInfluenceArea(mouseOrangeTileOver.getTower())
      hud.selectTowerHudType(mouseOrangeTileOver.getTower())
    } else {
      influenceArea.drawHudTowerInfluenceArea(
        hud.getSelectedTower(),
        mouseOrangeTileOver.getX(),
        mouseOrangeTileOver.getY(),
      )
      hud.setType(Const.HUD_NORMAL)
    }
  } else {
    hud.setType(Const.HUD_NORMAL)
  }

  enemies.forEach((enemy) => {
    enemy.draw()
  })

  enemyExplosions.forEach((enemyExplosion) => {
    enemyExplosion.update()
  })

  Debug.showMouseCoordinates(mouseX, mouseY)
}
