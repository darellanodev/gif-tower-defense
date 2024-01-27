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
import { Hud } from './Hud'
import { Enemy } from './Enemy'
import { Debug } from './Debug'
import { Random } from './Random'
import { ProgressBar } from './ProgressBar'
import { Wallet } from './Wallet'
import { Score } from './Score'
import { ImageUtils } from './ImageUtils'
import { InfluenceArea } from './InfluenceArea'
import { EnemyExplosion } from './EnemyExplosion'
import { TextProperties } from './TextProperties'
import { Image } from 'p5'
import { ParticleSystem } from './ParticleSystem'
import { Resources } from './Resources'

let orders: number[]
let createEnemyTime: number
let enemies: Enemy[]
let hud: Hud
let wallet: Wallet
let score: Score
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
let gameStatus: number
let waveProgressBar: ProgressBar
let waveProgressDelay: number
let bossProgressBar: ProgressBar
let bossProgressDelay: number
let initialEnemiesPosition: { x: number; y: number }
let allowCreateEnemies: boolean

function preload() {
  greenTowerImages = Resources.greenTower()
  redTowerImages = Resources.redTower()
  yellowTowerImages = Resources.yellowTower()
  enemiesImages = Resources.enemies()
  tileImages = Resources.tileImages()
  hudImages = Resources.hudImages()
  backgroundImage = Resources.backgroundImage()
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
  initialEnemiesPosition = path.getEnemiesInitialPosition()

  wallet = new Wallet(tileGenerator.getInitialMoney(), Const)
  score = new Score()
  lives = 7

  wave = 1
  allowCreateEnemies = true
  waveEnemies = 0
  enemies = []

  waveProgressBar = new ProgressBar(335, -19, 150, 16)
  bossProgressBar = new ProgressBar(335, -2, 150, 10)

  hud = new Hud(
    hudImages,
    wallet,
    Const,
    lives,
    score,
    TextProperties,
    waveProgressBar,
    bossProgressBar,
    wave,
  )

  waveProgressDelay = Const.WAVE_PROGRESS_DELAY
  bossProgressDelay = Const.BOSS_PROGRESS_DELAY

  enemyExplosions = []

  influenceArea = new InfluenceArea(Const)

  gameStatus = Const.GAME_STATUS_PLAYING
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
}

function handleBuyTower() {
  if (canBuyTower(mouseOrangeTileOver.getTower())) {
    const cost = mouseOrangeTileOver.buyTower(hud.getSelectedTower())
    wallet.decrease(cost)
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

function createNewEnemy(waveEnemy: number, wave: number) {
  const endurance = wave * 2 + waveEnemy * 2

  enemies.push(
    new Enemy(
      enemiesImages.slice(...ImageUtils.getRangeImagesOfEnemy(waveEnemy)),
      initialEnemiesPosition.x,
      initialEnemiesPosition.y,
      orders,
      endurance,
      Const,
      Random,
      ProgressBar,
    ),
  )
}

function updateEnemies(wave: number) {
  if (allowCreateEnemies) {
    if (waveEnemies < Const.TOTAL_ENEMIES) {
      createEnemyTime++
      if (createEnemyTime === Const.CREATE_ENEMY_MAX_TIME) {
        createEnemyTime = 0
        createNewEnemy(waveEnemies, wave)
        waveEnemies++
      }
    } else {
      allowCreateEnemies = false
      waveEnemies = 0
    }
  }
  // explosions
  const deadEnemies: Enemy[] = enemies.filter((enemy) => enemy.isDead())
  deadEnemies.forEach((enemy) => {
    enemyExplosions.push(
      new EnemyExplosion(enemy.getX(), enemy.getY(), Const, ParticleSystem),
    )
    //increase money and score
    const $increasedMoney =
      enemy.getInitialEndurance() * Const.MONEY_MULTIPLICATOR

    wallet.increase($increasedMoney)
    score.increase($increasedMoney * 2)
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
    if (lives <= 0) {
      gameStatus = Const.GAME_STATUS_GAME_OVER
    }
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

function updateWaveProgressBar() {
  if (waveProgressDelay > 0) {
    waveProgressDelay--
  } else {
    waveProgressDelay = Const.WAVE_PROGRESS_DELAY
    waveProgressBar.increaseProgress()

    if (waveProgressBar.isFullOfProgress()) {
      // next wave
      waveProgressBar.setProgress(0)
      wave++
      hud.setWave(wave)
      allowCreateEnemies = true
    }
    hud.setWaveProgressBar(waveProgressBar)
  }
}

function updateBossProgressBar() {
  if (bossProgressDelay > 0) {
    bossProgressDelay--
  } else {
    bossProgressDelay = Const.BOSS_PROGRESS_DELAY
    bossProgressBar.increaseProgress()

    if (bossProgressBar.isFullOfProgress()) {
      // next boss
      bossProgressBar.setProgress(0)
    }
    hud.setBossProgressBar(bossProgressBar)
  }
}

function draw() {
  if (gameStatus === Const.GAME_STATUS_PLAYING) {
    updateEnemies(wave)
    updateMouseOrangeTileOver()
    updateWaveProgressBar()
    updateBossProgressBar()
  }

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

  if (gameStatus === Const.GAME_STATUS_GAME_OVER) {
    TextProperties.setForBigCenteredTitle()
    text('Game over', width / 2, height / 2)
  }

  Debug.showMouseCoordinates(mouseX, mouseY)
}
