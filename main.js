const TOTAL_TOWER_UPGRADES = 5
const TOTAL_ENEMIES = 5
const CANVAS_WIDTH = 815
const CANVAS_HEIGHT = 650
const HUD_HEIGHT = 84


let enemy
let towers
let hud
let orangeTiles

function preload() {

    tower1Images = []
    for (let i = 0; i <= TOTAL_TOWER_UPGRADES; i++) {
        tower1Images.push(loadImage('img/tower1/upgrade' + i + '.png'))
    }

    enemiesImages = []
    for (let i = 1; i <= TOTAL_ENEMIES; i++) {
        enemiesImages.push(loadImage('img/enemy/' + i + '.gif'))
    }

    tileImages = [
        loadImage('img/floor/orange.png'),
        loadImage('img/floor/gray.png'),
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

    const levelMap = '111111111111111x,1000000000000000,1011111111111111,1010000000000001,1010000111111101,1011111100000101,1000000000000101,1111111111111101,0000000000000001,y111111111111111'

    const tileGenerator = new TileGenerator(levelMap, tileImages)
    orangeTiles = tileGenerator.orangeTiles()

    enemy = new Enemy(enemiesImages[0])

    towers = [
        new Tower(tower1Images, 72, 154),
        new Tower(tower1Images, 200, 200),
        new Tower(tower1Images, 300, 300),
    ]

    hud = new Hud(hudImages)
}

function mouseClicked() {
    
    const tower = new Tower(tower1Images, mouseX, mouseY)
    towers.push(tower)

}

function draw() {
    background('skyblue')
    rectMode(CORNER)

    image(backgroundImage, 0, HUD_HEIGHT)

    for (const orangeTile of orangeTiles){
        orangeTile.draw(tileImages[0])
    }
    
    enemy.draw()

    for (const tower of towers) {
        tower.draw()
    }

    hud.draw()
    


    // HUD
    textSize(20)
    fill('yellow')
    text('This is a sample text', 120, 20)
}