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

let orders: number[]
let createEnemyTime: number
let enemies: Enemy[]
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
let explosionsEnemy: ExplosionEnemy[]
let explosionsMagicFireball: ExplosionMagicFireball[]
let explosionsMagicIceball: ExplosionMagicIceball[]
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
let magicFireballs: MagicFireball[]
let magicFireballsCount: number
let magicIceballImage: Image
let magicIceballs: MagicIceball[]
let magicIceballsCount: number
let magicUFOImage: Image
let magicUFOs: MagicUFO[]
let magicUFOsCount: number

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

  wallet = new Wallet(tileGenerator.initialMoney)
  score = new Score()
  lives = 7

  wave = 1
  allowCreateEnemies = true
  waveEnemies = 0
  enemies = []

  waveProgressBar = new ProgressBar({ x: 335, y: -19 }, 150, 16)
  bossProgressBar = new ProgressBar({ x: 335, y: -2 }, 150, 10)

  hud = new Hud(
    hudImages,
    hudIconImages,
    wallet,
    lives,
    score,
    waveProgressBar,
    bossProgressBar,
    wave,
  )

  waveProgressDelay = Const.WAVE_PROGRESS_DELAY
  bossProgressDelay = Const.BOSS_PROGRESS_DELAY

  explosionsEnemy = []
  explosionsMagicFireball = []
  explosionsMagicIceball = []

  magicFireballs = []
  magicFireballsCount = MagicFireball.FIREBALLS

  magicIceballs = []
  magicIceballsCount = MagicIceball.ICEBALLS

  magicUFOs = []
  magicUFOsCount = MagicUFO.UFOS

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
    if (wallet.haveMoneyToBuy(tower.type, tower.upgradeLevel + 1)) {
      canUpgrade = true
    }
  }
  return canUpgrade
}

function canBuyNewTower(hudSelectedTower: number) {
  let canBuy = false
  const zeroUpgradeLevel = 0
  if (wallet.haveMoneyToBuy(hudSelectedTower, zeroUpgradeLevel)) {
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

function handleHudButtons() {
  if (hud.isInsideTowerGreenButton(mouseX, mouseY)) {
    hud.selectTower(TowerGreen.ID)
  }
  if (hud.isInsideTowerRedButton(mouseX, mouseY)) {
    hud.selectTower(TowerRed.ID)
  }
  if (hud.isInsideTowerYellowButton(mouseX, mouseY)) {
    hud.selectTower(TowerYellow.ID)
  }
  if (hud.isInsideMagicFireball(mouseX, mouseY)) {
    createNewMagicFireball()
  }
  if (hud.isInsideMagicIceball(mouseX, mouseY)) {
    createNewMagicIceball()
  }
  if (hud.isInsideMagicUFO(mouseX, mouseY)) {
    createNewMagicUFO()
  }
}

function handleSellTower() {
  const profit = mouseTileOrangeOver.sellTower()
  wallet.increase(profit)
}

function handleBuyTower() {
  if (canBuyTower(mouseTileOrangeOver.getTower())) {
    const cost = mouseTileOrangeOver.buyTower(hud.getSelectedTower())
    wallet.decrease(cost)
  }
}

function mouseClicked() {
  if (hud.isInsideButtonsBar(mouseX, mouseY)) {
    handleHudButtons()
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

function createNewEnemy(waveEnemy: number, wave: number) {
  const endurance = wave * 3 + waveEnemy * 2
  const isBoss = false

  enemies.push(
    new Enemy(
      enemiesImages.slice(...MathUtils.getTwoNumbersFourTimes(waveEnemy)),
      initialEnemiesPosition,
      orders,
      endurance,
      isBoss,
    ),
  )
}

function createNewMagicFireball() {
  if (magicFireballsCount > 0) {
    magicFireballs.push(
      new MagicFireball(
        magicFireballImage,
        { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
        orders,
      ),
    )
    magicFireballsCount--
    hud.setMagicFireballs(magicFireballsCount)
  }
}

function createNewMagicIceball() {
  if (magicIceballsCount > 0) {
    magicIceballs.push(
      new MagicIceball(
        magicIceballImage,
        { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
        orders,
      ),
    )
    magicIceballsCount--
    hud.setMagicIceballs(magicIceballsCount)
  }
}

function createNewMagicUFO() {
  if (magicUFOsCount > 0) {
    magicUFOs.push(
      new MagicUFO(
        magicUFOImage,
        { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
        orders,
      ),
    )
    magicUFOsCount--
    hud.setMagicUFOs(magicUFOsCount)
  }
}

function createNewBoss(wave: number) {
  const endurance = wave * 25
  const indexBossInEnemiesImages = 5
  const isBoss = true
  enemies.push(
    new Enemy(
      enemiesImages.slice(
        ...MathUtils.getTwoNumbersFourTimes(indexBossInEnemiesImages),
      ),
      initialEnemiesPosition,
      orders,
      endurance,
      isBoss,
    ),
  )
}

function handleExplosionEnemys() {
  const deadEnemies: Enemy[] = enemies.filter((enemy) => enemy.dead)
  deadEnemies.forEach((enemy) => {
    explosionsEnemy.push(
      new ExplosionEnemy({ x: enemy.position.x, y: enemy.position.y }),
    )
    //increase money and score
    const $increasedMoney = enemy.endurance * Const.MONEY_MULTIPLICATOR

    wallet.increase($increasedMoney)
    score.increase($increasedMoney * 2)
  })
}

function handleNewEnemyCreation() {
  if (allowCreateEnemies) {
    if (waveEnemies < Enemy.TOTAL_ENEMIES) {
      createEnemyTime++
      if (createEnemyTime === Enemy.CREATION_MAX_TIME) {
        createEnemyTime = 0
        createNewEnemy(waveEnemies, wave)
        waveEnemies++
      }
    } else {
      allowCreateEnemies = false
      waveEnemies = 0
    }
  }
}

function removeDeadEnemies() {
  enemies = enemies.filter((enemy) => enemy.alive)
}

function handleWinnerEnemies() {
  const winnerEnemies = enemies.filter((enemy) => enemy.winner)
  winnerEnemies.forEach((enemy) => {
    lives--
    if (lives <= 0) {
      gameStatus = Const.GAME_STATUS_GAME_OVER
    }
    hud.setLives(lives)
    enemy.resetWinner()
  })
}

function updateEnemies() {
  handleNewEnemyCreation()
  handleExplosionEnemys()
  removeDeadEnemies()

  // update enemies
  enemies.forEach((enemy) => {
    enemy.update()
  })

  handleWinnerEnemies()
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
      createNewBoss(wave)
    }
    hud.setBossProgressBar(bossProgressBar)
  }
}

function updateMagicFireballs() {
  magicFireballs.forEach((magicFireball) => {
    magicFireball.update()
    checkMagicFireballCollides(magicFireball, enemies)
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
  newMagicFireballExplosion(enemy.position.x, enemy.position.y)
}

function newMagicFireballExplosion(posX: number, posY: number) {
  explosionsMagicFireball.push(new ExplosionMagicFireball({ x: posX, y: posY }))
}

function removeDeadFireballs() {
  magicFireballs = magicFireballs.filter((fireball) => fireball.isAlive())
}

function drawMagicFireballs() {
  magicFireballs.forEach((fireball) => {
    fireball.draw()
  })
}

function updateMagicIceballs() {
  magicIceballs.forEach((iceball) => {
    iceball.update()
    checkMagicIceballCollides(iceball, enemies)
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
  newMagicIceballExplosion(enemy.position.x, enemy.position.y)
}

function newMagicIceballExplosion(posX: number, posY: number) {
  explosionsMagicIceball.push(new ExplosionMagicIceball({ x: posX, y: posY }))
}

function removeDeadIceballs() {
  magicIceballs = magicIceballs.filter((iceball) => iceball.isAlive())
}

function drawMagicIceballs() {
  magicIceballs.forEach((iceball) => {
    iceball.draw()
  })
}

function updateMagicUFOs() {
  magicUFOs.forEach((ufo) => {
    ufo.update()
  })
}

function drawMagicUFOs() {
  magicUFOs.forEach((ufo) => {
    ufo.draw()
  })
}

function removeDeadExplosions() {
  explosionsEnemy = explosionsEnemy.filter((e) => e.isActive())
  explosionsMagicFireball = explosionsMagicFireball.filter((e) => e.isActive())
  explosionsMagicIceball = explosionsMagicIceball.filter((e) => e.isActive())
}

function updateExplosions() {
  explosionsEnemy.forEach((e) => {
    e.update()
  })
  explosionsMagicFireball.forEach((e) => {
    e.update()
  })
  explosionsMagicIceball.forEach((e) => {
    e.update()
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
    orangeTile.selectTarget(enemies)
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
        const canUpgrade = wallet.haveMoneyToBuy(
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

  enemies.forEach((enemy) => {
    enemy.draw()
  })

  drawMagicFireballs()
  drawMagicIceballs()
  drawMagicUFOs()

  removeDeadExplosions()
  updateExplosions()

  if (gameStatus === Const.GAME_STATUS_GAME_OVER) {
    TextProperties.setForBigCenteredTitle()
    text('Game over', width / 2, height / 2)
  }

  Debug.showMouseCoordinates({ x: mouseX, y: mouseY })
}
