let myGrid
let myEnemy
let myTower

function preload() {

    imagesTower1 = [
        loadImage('img/tower1/upgrade0.png'),
        loadImage('img/tower1/upgrade1.png'),
        loadImage('img/tower1/upgrade2.png'),
    ]
    
}

function setup() {
    createCanvas(400, 400)
    myGrid = new Grid(color(173, 216, 230))
    myEnemy = new Enemy(color(24, 123, 152))
    myTower = new Tower(imagesTower1)
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