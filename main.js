let myGrid
let myEnemy
let myTower

const TOTAL_TOWER_UPGRADES = 5
const TOTAL_ENEMIES = 5

function preload() {

    tower1Images = []
    for (let i = 0; i <= TOTAL_TOWER_UPGRADES; i++) {
        tower1Images.push(loadImage('img/tower1/upgrade' + i + '.png'))
    }

    enemiesImages = []
    for (let i = 1; i <= TOTAL_ENEMIES; i++) {
        enemiesImages.push(loadImage('img/enemy/' + i + '.gif'))
    }

    floorImages = [
        loadImage('img/floor/orange.png'),
        loadImage('img/floor/gray.png'),
    ]

    
}

function setup() {
    createCanvas(900, 700)

    const levelMap = '111111111111111x,1000000000000000,1011111111111111,1010000000000001,1010000111111101,1011111100000101,1000000000000101,1111111111111101,0000000000000001,y111111111111111'

    myGrid = new Grid(levelMap, floorImages)
    myEnemy = new Enemy(enemiesImages[0])
    myTower = new Tower(tower1Images)


}

function draw() {
    background('skyblue')
    rectMode(CORNER)

    myGrid.draw()
    myEnemy.draw()
    myTower.draw()

    // HUD
    textSize(20)
    fill('yellow')
    text('This is a sample text', 50, 50)
}