import { TowerType, Position } from './types'
import { Const } from './Const'
import { Path } from './Path'
import { TileStart } from './TileStart'
import { TileEnd } from './TileEnd'
import { TileGenerator } from './TileGenerator'
import { TowerGenerator } from './TowerGenerator'
import { TileOrange } from './TileOrange'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { MathUtils } from './MathUtils'
import { Hud } from './Hud'
import { Enemy } from './Enemy'
import { Debug } from './Debug'
import { ProgressBar } from './ProgressBar'
import { Wallet } from './Wallet'
import { Score } from './Score'
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

let orders: number[]
let createEnemyTime: number
let hud: Hud
let wallet: Wallet
let score: Score
let orangeTiles: TileOrange[]
let mouseTileOrangeOver: TileOrange
let wave: number
let waveEnemies: number
let tileImages: Image[]
let greenTowerImages: Image[]
let redTowerImages: Image[]
let yellowTowerImages: Image[]
let startTile: TileStart
let endTile: TileEnd
let hudImages: Image[]
let hudIconImages: Image[]
let backgroundImage: Image
let enemiesImages: Image[]
let towerGenerator: TowerGenerator
let influenceArea: InfluenceArea
let lives: number
let gameStatus: number
let waveProgressBar: ProgressBar
let waveProgressDelay: number
let bossProgressBar: ProgressBar
let bossProgressDelay: number
let initialEnemiesPosition: Position
let allowCreateEnemies: boolean
let levelDataProvider: LevelsDataProvider
let magicFireballImage: Image
let magicIceballImage: Image
let magicUFOImage: Image

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

  createEnemyTime = 0

  towerGenerator = new TowerGenerator(
    greenTowerImages,
    redTowerImages,
    yellowTowerImages,
  )

  const tileGenerator = new TileGenerator(levelMap, tileImages, towerGenerator)
  orangeTiles = tileGenerator.orangeTiles
  startTile = tileGenerator.startTile

  endTile = tileGenerator.endTile
  const pathTiles = tileGenerator.pathTiles

  const path = new Path(startTile, endTile, pathTiles)
  orders = path.makeOrders()
  initialEnemiesPosition = path.getEnemiesInitialPosition()

  Wallet.money = tileGenerator.initialMoney

  Player.lives = 7

  wave = 1
  allowCreateEnemies = true
  waveEnemies = 0

  waveProgressBar = new ProgressBar({ x: 335, y: -19 }, { w: 150, h: 16 })
  bossProgressBar = new ProgressBar({ x: 335, y: -2 }, { w: 150, h: 10 })

  hud = new Hud(
    hudImages,
    hudIconImages,
    waveProgressBar,
    bossProgressBar,
    wave,
  )

  waveProgressDelay = Const.WAVE_PROGRESS_DELAY
  bossProgressDelay = Const.BOSS_PROGRESS_DELAY

  influenceArea = new InfluenceArea()

  gameStatus = Const.GAME_STATUS_PLAYING
}

function keyPressed() {
  switch (keyCode) {
    case Const.KEY_1:
      hud.selectTower(TowerGreen.ID)
      break

    case Const.KEY_2:
      hud.selectTower(TowerRed.ID)
      break

    case Const.KEY_3:
      hud.selectTower(TowerYellow.ID)
      break
  }
}

function canUpgradeTower(tower: TowerType) {
  let canUpgrade = false
  if (tower.upgradeLevel < Const.UPGRADE_MAX_LEVEL) {
    if (Wallet.haveMoneyToBuy(tower.type, tower.upgradeLevel + 1)) {
      canUpgrade = true
    }
  }
  return canUpgrade
}

function canBuyNewTower(hudSelectedTower: number) {
  let canBuy = false
  const zeroUpgradeLevel = 0
  if (Wallet.haveMoneyToBuy(hudSelectedTower, zeroUpgradeLevel)) {
    canBuy = true
  }
  return canBuy
}

function canBuyTower(tower: TowerType) {
  let result = false
  if (tower) {
    result = canUpgradeTower(tower)
  } else {
    result = canBuyNewTower(hud.getSelectedTower())
  }
  return result
}

function handleSellTower() {
  const profit = mouseTileOrangeOver.sellTower()
  Wallet.increase(profit)
}

function handleBuyTower() {
  if (canBuyTower(mouseTileOrangeOver.getTower())) {
    const cost = mouseTileOrangeOver.buyTower(hud.getSelectedTower())
    Wallet.decrease(cost)
  }
}

function mouseClicked() {
  if (hud.isInsideButtonsBar(mouseX, mouseY)) {
    hud.handleButtons(
      mouseX,
      mouseY,
      magicIceballImage,
      magicFireballImage,
      magicUFOImage,
      initialEnemiesPosition,
      orders,
    )
    return
  }

  if (mouseTileOrangeOver !== null) {
    if (mouseButton === RIGHT && mouseTileOrangeOver.hasTower()) {
      if (mouseTileOrangeOver.getTower().notUpgrading) {
        handleSellTower()
      }
    }

    if (mouseButton === LEFT) {
      handleBuyTower()
    }
  }
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
          orders,
          initialEnemiesPosition,
          wave,
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

function updateMouseTileOrangeOver() {
  mouseTileOrangeOver = getMouseTileOrangeOver()
}

function getMouseTileOrangeOver() {
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

      Enemy.instantiateBoss(
        enemiesImages.slice(
          ...MathUtils.getTwoNumbersFourTimes(
            Enemy.INDEX_BOSS_IN_ENEMIES_IMAGES,
          ),
        ),
        orders,
        initialEnemiesPosition,
        wave,
      )
    }
    hud.setBossProgressBar(bossProgressBar)
  }
}

function updateMagicFireballs() {
  MagicFireball.instances.forEach((magicFireball) => {
    magicFireball.update()
    checkMagicFireballCollides(magicFireball, Enemy.instances)
  })
  removeDeadFireballs()
}

function checkMagicFireballCollides(
  magicFireball: MagicFireball,
  enemies: Enemy[],
) {
  enemies.forEach((enemy) => {
    if (magicFireball.checkCollision(enemy)) {
      handleMagicFireballCollision(magicFireball, enemy)
    }
  })
}

function handleMagicFireballCollision(
  magicFireball: MagicFireball,
  enemy: Enemy,
) {
  magicFireball.addDamage(enemy)
  magicFireball.setToIgnoreList(enemy)
  ExplosionMagicFireball.instantiate(enemy.position)
}

function removeDeadFireballs() {
  MagicFireball.instances = MagicFireball.instances.filter((fireball) =>
    fireball.isAlive(),
  )
}

function drawMagicFireballs() {
  MagicFireball.instances.forEach((fireball) => {
    fireball.draw()
  })
}

function updateMagicIceballs() {
  MagicIceball.instances.forEach((iceball) => {
    iceball.update()
    checkMagicIceballCollides(iceball, Enemy.instances)
  })
  removeDeadIceballs()
}

function checkMagicIceballCollides(
  magicIceball: MagicIceball,
  enemies: Enemy[],
) {
  enemies.forEach((enemy) => {
    if (magicIceball.checkCollision(enemy)) {
      handleMagicIceballCollision(magicIceball, enemy)
    }
  })
}

function handleMagicIceballCollision(magicIceball: MagicIceball, enemy: Enemy) {
  magicIceball.freeze(enemy)
  magicIceball.setToIgnoreList(enemy)
  ExplosionMagicIceball.instantiate(enemy.position)
}

function removeDeadIceballs() {
  MagicIceball.instances = MagicIceball.instances.filter((iceball) =>
    iceball.isAlive(),
  )
}

function drawMagicIceballs() {
  MagicIceball.instances.forEach((iceball) => {
    iceball.draw()
  })
}

function updateMagicUFOs() {
  MagicUFO.instances.forEach((ufo) => {
    ufo.update()
  })
}

function drawMagicUFOs() {
  MagicUFO.instances.forEach((ufo) => {
    ufo.draw()
  })
}

function draw() {
  if (gameStatus === Const.GAME_STATUS_PLAYING) {
    updateEnemies()
    updateMouseTileOrangeOver()
    updateWaveProgressBar()
    updateBossProgressBar()
    updateMagicFireballs()
    updateMagicIceballs()
    updateMagicUFOs()
  }

  background('skyblue')
  rectMode(CORNER)

  image(backgroundImage, 0, Hud.HEIGHT)

  startTile.draw()
  endTile.draw()

  orangeTiles.forEach((orangeTile) => {
    orangeTile.selectTarget(Enemy.instances)
    orangeTile.drawTile()
  })

  orangeTiles.forEach((orangeTile) => {
    orangeTile.drawTower()
  })

  hud.draw()

  const canBuySelectedTower = canBuyNewTower(hud.getSelectedTower())
  const canBuyTowerGreen = canBuyNewTower(TowerGreen.ID)
  const canBuyTowerRed = canBuyNewTower(TowerRed.ID)
  const canBuyTowerYellow = canBuyNewTower(TowerYellow.ID)

  if (mouseTileOrangeOver !== null) {
    if (mouseTileOrangeOver.hasTower()) {
      const tileTower = mouseTileOrangeOver.getTower()

      hud.selectTowerHudType(tileTower)
      if (!tileTower.maxUpgraded) {
        const canUpgrade = Wallet.haveMoneyToBuy(
          tileTower.type,
          tileTower.upgradeLevel + 1,
        )
        hud.viewUpgradeCost(tileTower, canUpgrade)
        influenceArea.drawTowerInfluenceArea(tileTower, canUpgrade)
      }

      hud.viewSellProfit(tileTower)
    } else {
      influenceArea.drawHudTowerInfluenceArea(
        hud.getSelectedTower(),
        mouseTileOrangeOver.getPosition(),
        canBuySelectedTower,
      )

      hud.setType(Hud.NORMAL)
      hud.setCanBuy(canBuyTowerGreen, canBuyTowerRed, canBuyTowerYellow)
      hud.hideUpgradeCost()
      hud.hideSellProfit()
    }
  } else {
    hud.setType(Hud.NORMAL)
    hud.setCanBuy(canBuyTowerGreen, canBuyTowerRed, canBuyTowerYellow)
    hud.hideUpgradeCost()
    hud.hideSellProfit()
  }

  Enemy.instances.forEach((enemy) => {
    enemy.draw()
  })

  drawMagicFireballs()
  drawMagicIceballs()
  drawMagicUFOs()

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
