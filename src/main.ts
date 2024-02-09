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
let hudIconImages: Image[]
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
    hudIconImages,
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

  magicFireballs = []
  magicFireballsCount = Const.MAGIC_FIREBALLS

  magicIceballs = []
  magicIceballsCount = Const.MAGIC_ICEBALLS

  magicUFOs = []
  magicUFOsCount = Const.MAGIC_UFOS

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
  if (hud.isInsideGreenTowerButton(mouseX, mouseY)) {
    hud.selectTower(Const.GREEN_TOWER)
  }
  if (hud.isInsideRedTowerButton(mouseX, mouseY)) {
    hud.selectTower(Const.RED_TOWER)
  }
  if (hud.isInsideYellowTowerButton(mouseX, mouseY)) {
    hud.selectTower(Const.YELLOW_TOWER)
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
  const endurance = wave * 3 + waveEnemy * 2
  const isBoss = false

  enemies.push(
    new Enemy(
      enemiesImages.slice(...ImageUtils.getRangeImagesOfEnemy(waveEnemy)),
      initialEnemiesPosition.x,
      initialEnemiesPosition.y,
      orders,
      endurance,
      isBoss,
      Const,
      Random,
      ProgressBar,
    ),
  )
}

function createNewMagicFireball() {
  if (magicFireballsCount > 0) {
    magicFireballs.push(
      new MagicFireball(
        magicFireballImage,
        initialEnemiesPosition.x,
        initialEnemiesPosition.y,
        orders,
        Const,
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
        initialEnemiesPosition.x,
        initialEnemiesPosition.y,
        orders,
        Const,
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
        initialEnemiesPosition.x,
        initialEnemiesPosition.y,
        orders,
        Const,
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
        ...ImageUtils.getRangeImagesOfEnemy(indexBossInEnemiesImages),
      ),
      initialEnemiesPosition.x,
      initialEnemiesPosition.y,
      orders,
      endurance,
      isBoss,
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

function updateBossProgressBar(wave: number) {
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
  magicFireballs.forEach((fireball) => {
    fireball.update()
  })
}

function drawMagicFireballs() {
  magicFireballs.forEach((fireball) => {
    fireball.draw()
  })
}

function updateMagicIceballs() {
  magicIceballs.forEach((iceball) => {
    iceball.update()
  })
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

function draw() {
  if (gameStatus === Const.GAME_STATUS_PLAYING) {
    updateEnemies(wave)
    updateMouseOrangeTileOver()
    updateWaveProgressBar()
    updateBossProgressBar(wave)
    updateMagicFireballs()
    updateMagicIceballs()
    updateMagicUFOs()
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

  const canBuySelectedTower = canBuyNewTower(hud.getSelectedTower())
  const canBuyGreenTower = canBuyNewTower(Const.GREEN_TOWER)
  const canBuyRedTower = canBuyNewTower(Const.RED_TOWER)
  const canBuyYellowTower = canBuyNewTower(Const.YELLOW_TOWER)

  if (mouseOrangeTileOver !== null) {
    if (mouseOrangeTileOver.hasTower()) {
      const tileTower = mouseOrangeTileOver.getTower()

      hud.selectTowerHudType(tileTower)
      if (!tileTower.isMaxUpgraded()) {
        const canUpgrade = wallet.haveMoneyToBuy(
          tileTower.getType(),
          tileTower.getUpgradeLevel() + 1,
        )
        hud.viewUpgradeCost(tileTower, canUpgrade)
        influenceArea.drawTowerInfluenceArea(tileTower, canUpgrade)
      }

      hud.viewSellProfit(tileTower)
    } else {
      influenceArea.drawHudTowerInfluenceArea(
        hud.getSelectedTower(),
        mouseOrangeTileOver.getX(),
        mouseOrangeTileOver.getY(),
        canBuySelectedTower,
      )

      hud.setType(Const.HUD_NORMAL)
      hud.setCanBuy(canBuyGreenTower, canBuyRedTower, canBuyYellowTower)
      hud.hideUpgradeCost()
      hud.hideSellProfit()
    }
  } else {
    hud.setType(Const.HUD_NORMAL)
    hud.setCanBuy(canBuyGreenTower, canBuyRedTower, canBuyYellowTower)
    hud.hideUpgradeCost()
    hud.hideSellProfit()
  }

  enemies.forEach((enemy) => {
    enemy.draw()
  })

  drawMagicFireballs()
  drawMagicIceballs()
  drawMagicUFOs()

  enemyExplosions.forEach((enemyExplosion) => {
    enemyExplosion.update()
  })

  if (gameStatus === Const.GAME_STATUS_GAME_OVER) {
    TextProperties.setForBigCenteredTitle()
    text('Game over', width / 2, height / 2)
  }

  Debug.showMouseCoordinates(mouseX, mouseY)
}
