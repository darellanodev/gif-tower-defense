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


let enemy1
let enemy2
let enemy3
let enemy4
let enemy5
let towers
let hud
let orangeTiles

function preload() {

    tower1Images = []
    for (let i = 0; i <= TOTAL_TOWER_UPGRADES; i++) {
        tower1Images.push(loadImage('img/tower1/upgrade' + i + '.png'))
    }

    enemy1Images = []
    for (let i = 1; i <= TOTAL_ENEMIES; i++) {
        enemy1Images.push(loadImage('img/enemies/' + i + '_center.png'));
        enemy1Images.push(loadImage('img/enemies/' + i + '_left.png'));
        enemy1Images.push(loadImage('img/enemies/' + i + '_right.png'));
        enemy1Images.push(loadImage('img/enemies/' + i + '_closed.png'));
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

    const tileGenerator = new TileGenerator(levelMap, tileImages)
    orangeTiles = tileGenerator.orangeTiles()
    startTile = tileGenerator.startTile()
    endTile = tileGenerator.endTile()
    const pathTiles = tileGenerator.pathTiles()

    const path = new Path(startTile, endTile, pathTiles)
    const orders = path.makeOrders()

    enemy = new Enemy(enemy1Images[0], orders, startTile, endTile)

    towers = [
        new Tower(tower1Images, 72, 154),
        new Tower(tower1Images, 200, 200),
        new Tower(tower1Images, 300, 300),
    ]

    hud = new Hud(hudImages)
}

function mouseClicked() {
    
    for (const orangeTile of orangeTiles){
        if (orangeTile.isClicked(mouseX, mouseY)) {
            const x = orangeTile.getX()
            const y = orangeTile.getY()
            const tower = new Tower(tower1Images, x, y)
            orangeTile.insertTower(tower)
        }
    }

}


function draw() {

    // all updates first
    enemy.update()

    // draw
    background('skyblue')
    rectMode(CORNER)

    image(backgroundImage, 0, HUD_HEIGHT)

    for (const orangeTile of orangeTiles){
        orangeTile.draw()
    }
    
    enemy.draw()

    startTile.draw()
    endTile.draw()

    hud.draw()
    
    // HUD
    textSize(20)
    fill('yellow')
    text('This is a sample text', 120, 20)
}