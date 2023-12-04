const TOTAL_TOWER_UPGRADES = 6
const TOTAL_ENEMIES = 5
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 580
const HUD_HEIGHT = 84
const TILE_SIZE = 50
const LEFT_DIRECTION = 1
const RIGHT_DIRECTION = 2
const UP_DIRECTION = 3
const DOWN_DIRECTION = 4
const KEY_1 = 49
const KEY_2 = 50
const KEY_3 = 51
const GREEN_TOWER = 1
const RED_TOWER = 2
const YELLOW_TOWER = 3

const HUD_NORMAL = 1
const HUD_UPGRADING = 2
const HUD_UPGRADING_MAX = 3

const CREATE_ENEMY_MAX_TIME = 100

let orders
let createEnemyTime
let enemies
let hud
let orangeTiles
let mouseOrangeTileOver

function preload() {

    greenTowerImages = []
    redTowerImages = []
    yellowTowerImages = []
    enemiesImages = []

    Range.make(0, TOTAL_TOWER_UPGRADES - 1).forEach((v) => {
        greenTowerImages.push(loadImage('img/towers/green_tower_upgrade_' + v + '.png'))
        redTowerImages.push(loadImage('img/towers/red_tower_upgrade_' + v + '.png'))
        yellowTowerImages.push(loadImage('img/towers/yellow_tower_upgrade_' + v + '.png'))
    })

    Range.make(1, TOTAL_ENEMIES).forEach((v) => {
        enemiesImages.push(loadImage('img/enemies/' + v + '_center.png'));
        enemiesImages.push(loadImage('img/enemies/' + v + '_left.png'));
        enemiesImages.push(loadImage('img/enemies/' + v + '_right.png'));
        enemiesImages.push(loadImage('img/enemies/' + v + '_closed.png'));
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
    const p5CanvasElements = document.getElementsByClassName("p5Canvas")

    p5CanvasElements.forEach( element => {
        element.addEventListener("contextmenu", (e) => {e.preventDefault(); mouseClicked();});
    })
}

function setup() {

    disableContextualMenu()
      
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

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

    const tileGenerator = new TileGenerator(levelMap, tileImages)
    orangeTiles = tileGenerator.orangeTiles()
    startTile = tileGenerator.startTile()
    endTile = tileGenerator.endTile()
    const pathTiles = tileGenerator.pathTiles()

    const path = new Path(startTile, endTile, pathTiles)
    orders = path.makeOrders()

    enemies = [
        new Enemy(enemiesImages.slice(0, 4), orders, startTile, endTile),
    ]

    hud = new Hud(hudImages)
}


function keyPressed() {
    
    switch (keyCode) {
        case KEY_1:
            hud.selectTower(GREEN_TOWER)
            break;

        case KEY_2:
            hud.selectTower(RED_TOWER)
            break;

        case KEY_3:
            hud.selectTower(YELLOW_TOWER)
            break;
    }
  }

function mouseClicked() {

    if (hud.isInsideButtonsBar(mouseX, mouseY)) {
        
        if (hud.isInsideGreenTowerButton(mouseX, mouseY)){
            hud.selectTower(GREEN_TOWER)
        }
        if (hud.isInsideRedTowerButton(mouseX, mouseY)){
            hud.selectTower(RED_TOWER)
        }
        if (hud.isInsideYellowTowerButton(mouseX, mouseY)){
            hud.selectTower(YELLOW_TOWER)
        }
        return
    }
    
    if (mouseOrangeTileOver !== null) {
        if(mouseButton === RIGHT) {
            mouseOrangeTileOver.sellTower()
        }
    
        if(mouseButton === LEFT) {
            mouseOrangeTileOver.putTower(hud.getSelectedTower())
        }
    }

}

function createNewEnemy() {

    switch (enemies.length) {
        case 1:
            enemies.push(new Enemy(enemiesImages.slice(4, 8), orders, startTile, endTile))
            break;
        case 2:
            enemies.push(new Enemy(enemiesImages.slice(8, 12), orders, startTile, endTile))
            break;
        case 3:
            enemies.push(new Enemy(enemiesImages.slice(12, 16), orders, startTile, endTile))
            break;
        case 4:
            enemies.push(new Enemy(enemiesImages.slice(16, 20), orders, startTile, endTile))
            break;
    }

}

function updateEnemies() {

    if (enemies.length < TOTAL_ENEMIES) {
        createEnemyTime++
        if (createEnemyTime === CREATE_ENEMY_MAX_TIME) {
            createEnemyTime = 0
            createNewEnemy()
        }
    }

    enemies.forEach( enemy => {
        enemy.update()
    })

}

function updateMouseOrangeTileOver() {
    mouseOrangeTileOver = getMouseOrangeTileOver()
}

function getMouseOrangeTileOver() {

    const result = orangeTiles.find(orangeTile => orangeTile.isInside(mouseX, mouseY))

    return result ? result : null

}

function draw() {

    updateEnemies()
    updateMouseOrangeTileOver()
    
    background('skyblue')
    rectMode(CORNER)

    image(backgroundImage, 0, HUD_HEIGHT)

    enemies.forEach(enemy => {
        enemy.draw()
    })

    startTile.draw()
    endTile.draw()

    orangeTiles.forEach(orangeTile => {
        orangeTile.selectTarget(enemies)
        orangeTile.updateUpgradeDisplay()
        orangeTile.drawTile()
        orangeTile.drawUpgradeDisplay()
    })

    orangeTiles.forEach(orangeTile => {
        orangeTile.drawTower()
    })

    hud.draw()

    if (mouseOrangeTileOver !== null) {
        mouseOrangeTileOver.drawInfluenceArea(hud.getSelectedTower())
        if (mouseOrangeTileOver.hasTower()) {
            hud.setType(HUD_UPGRADING)
        } else {
            hud.setType(HUD_NORMAL)
        }
    }

    Debug.showMouseCoordinates(mouseX,mouseY)

}