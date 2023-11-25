const TOTAL_TOWER_UPGRADES = 5
const TOTAL_ENEMIES = 5
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 580
const HUD_HEIGHT = 84
const TILE_SIZE = 50
const LEFT_DIRECTION = 1
const RIGHT_DIRECTION = 2
const UP_DIRECTION = 3
const DOWN_DIRECTION = 4

const CREATE_ENEMY_MAX_TIME = 100

let orders
let createEnemyTime
let enemies
let towers
let hud
let orangeTiles
let mouseOrangeTileOver

function preload() {

    tower1Images = []
    for (let i = 0; i <= TOTAL_TOWER_UPGRADES; i++) {
        tower1Images.push(loadImage('img/tower1/upgrade' + i + '.png'))
    }

    enemiesImages = []
    for (let i = 1; i <= TOTAL_ENEMIES; i++) {
        enemiesImages.push(loadImage('img/enemies/' + i + '_center.png'));
        enemiesImages.push(loadImage('img/enemies/' + i + '_left.png'));
        enemiesImages.push(loadImage('img/enemies/' + i + '_right.png'));
        enemiesImages.push(loadImage('img/enemies/' + i + '_closed.png'));
    }

    tileImages = [
        loadImage('img/floor/orange.png'),
        loadImage('img/floor/gray.png'),
        loadImage('img/floor/end_down.png'),
        loadImage('img/floor/end_right.png'),
        loadImage('img/floor/end_left.png'),
        loadImage('img/floor/end_up.png'),
        loadImage('img/floor/start_down.png'),
        loadImage('img/floor/start_right.png'),
        loadImage('img/floor/start_left.png'),
        loadImage('img/floor/start_up.png'),
        loadImage('img/floor/crystal.png'),
    ]

    backgroundImage = loadImage('img/backgrounds/ground.jpg')
    hudImages = [
        loadImage('img/hud/normal.png'),
        loadImage('img/hud/upgrading.png'),
        loadImage('img/hud/upgrading_max.png'),
    ]

}

function setup() {

    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => {e.preventDefault(); mouseClicked();});
    }
      
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

    towers = [
        new Tower(tower1Images, 72, 154),
        new Tower(tower1Images, 200, 200),
        new Tower(tower1Images, 300, 300),
    ]

    hud = new Hud(hudImages)
}


function getMouseOrangeTileOver() {
    for (const orangeTile of orangeTiles){
        if (orangeTile.isInside(mouseX, mouseY)) {
            return orangeTile
        }
    }
    return null
}

function mouseClicked() {

    if (mouseOrangeTileOver === null) {
        return
    }

    if(mouseButton === RIGHT) {
        mouseOrangeTileOver.sellTower()
    }
    
    if(mouseButton === LEFT) {
        mouseOrangeTileOver.buyTower()
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

    for (const enemy of enemies){
        enemy.update()
    }

}

function updateMouseOrangeTileOver() {
    mouseOrangeTileOver = getMouseOrangeTileOver()
}

function drawEnemies() {
    for (const enemy of enemies){
        enemy.draw()
    }
}


function draw() {

    updateEnemies()
    updateMouseOrangeTileOver()
    
    // draw
    background('skyblue')
    rectMode(CORNER)

    image(backgroundImage, 0, HUD_HEIGHT)

    for (const orangeTile of orangeTiles){
        orangeTile.draw()
    }
    
    drawEnemies()

    startTile.draw()
    endTile.draw()

    hud.draw()
    
    // HUD
    textSize(20)
    fill('yellow')
    text('This is a sample text', 120, 20)

    if (mouseOrangeTileOver !== null) {
        mouseOrangeTileOver.drawInfluenceArea()
    }




}