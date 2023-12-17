let orders: number[]
let createEnemyTime: number
let enemies: any[]
let hud: any
let orangeTiles: any[]
let mouseOrangeTileOver: any
let wave: number
let waveEnemies: number
let money: number
let tileImages: any[]
let greenTowerImages: any[]
let redTowerImages: any[]
let yellowTowerImages: any[]
let startTile: any
let endTile: any
let hudImages: any[]
let backgroundImage: any
let enemiesImages: any[]

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
  const p5CanvasElements = document.querySelectorAll('p5Canvas')

  p5CanvasElements.forEach((element: any) => {
    element.addEventListener('contextmenu', (e: any) => {
      e.preventDefault()
      mouseClicked()
    })
  })
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

  const tileGenerator = new TileGenerator(
    levelMap,
    tileImages,
    greenTowerImages,
    redTowerImages,
    yellowTowerImages,
    Const,
    OrangeTile,
    PathTile,
    StartTile,
    EndTile,
    GreenTower,
    RedTower,
    YellowTower,
    UpgradeDisplay,
    Distance,
  )
  orangeTiles = tileGenerator.orangeTiles()
  startTile = tileGenerator.startTile()
  endTile = tileGenerator.endTile()
  const pathTiles = tileGenerator.pathTiles()

  const path = new Path(startTile, endTile, pathTiles, Const)
  orders = path.makeOrders()

  money = tileGenerator.getInitialMoney()
  hud = new Hud(hudImages, money, Const)

  wave = 1
  waveEnemies = 0
  enemies = []
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

function mouseClicked() {
  if (hud.isInsideButtonsBar(mouseX, mouseY)) {
    if (hud.isInsideGreenTowerButton(mouseX, mouseY)) {
      hud.selectTower(Const.GREEN_TOWER)
    }
    if (hud.isInsideRedTowerButton(mouseX, mouseY)) {
      hud.selectTower(Const.RED_TOWER)
    }
    if (hud.isInsideYellowTowerButton(mouseX, mouseY)) {
      hud.selectTower(Const.YELLOW_TOWER)
    }
    return
  }

  if (mouseOrangeTileOver !== null) {
    if (mouseButton === RIGHT) {
      const profit = mouseOrangeTileOver.sellTower()
      money += profit
      hud.setMoney(money)
    }

    if (mouseButton === LEFT) {
      if (mouseOrangeTileOver.haveMoneyToBuy(hud.getSelectedTower(), money)) {
        const cost = mouseOrangeTileOver.buyTower(hud.getSelectedTower())
        money -= cost
        hud.setMoney(money)
      }
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
      HealthBar,
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

  enemies = enemies.filter((enemy) => enemy.isAlive())

  enemies.forEach((enemy) => {
    enemy.update()
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

  enemies.forEach((enemy) => {
    enemy.draw()
  })

  startTile.draw()
  endTile.draw()

  orangeTiles.forEach((orangeTile) => {
    orangeTile.selectTarget(enemies)
    orangeTile.updateUpgradeDisplay()
    orangeTile.drawTile()
    orangeTile.drawUpgradeDisplay()
  })

  orangeTiles.forEach((orangeTile) => {
    orangeTile.drawTower()
  })

  hud.draw()

  if (mouseOrangeTileOver !== null) {
    mouseOrangeTileOver.drawInfluenceArea(hud.getSelectedTower())
    mouseOrangeTileOver.selectHudType(hud)
  } else {
    hud.setType(Const.HUD_NORMAL)
  }

  Debug.showMouseCoordinates(mouseX, mouseY)
}
