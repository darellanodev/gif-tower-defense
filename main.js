let myGrid
let myEnemy
let myTower

const TOTAL_TOWER_UPGRADES = 5
const TOTAL_ENEMIES = 5

function preload() {

    tower1Images = [];
    for (let i = 0; i <= TOTAL_TOWER_UPGRADES; i++) {
        tower1Images.push(loadImage('img/tower1/upgrade' + i + '.png'));
    }

    enemiesImages = [];
    for (let i = 1; i <= TOTAL_ENEMIES; i++) {
        enemiesImages.push(loadImage('img/enemy/' + i + '.gif'));
    }
    
}

function setup() {
    createCanvas(400, 400)
    myGrid = new Grid(color(173, 216, 230))
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