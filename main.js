let myGrid
let myEnemy
let myTower

function preload() {

    imagesTower1 = [
        loadImage('img/tower1/upgrade0.png'),
        loadImage('img/tower1/upgrade1.png'),
        loadImage('img/tower1/upgrade2.png'),
        loadImage('img/tower1/upgrade3.png'),
        loadImage('img/tower1/upgrade4.png'),
        loadImage('img/tower1/upgrade5.png'),
    ]

    imagesEnemies = [
        loadImage('img/enemy/1.gif'),
        loadImage('img/enemy/2.gif'),
        loadImage('img/enemy/3.gif'),
        loadImage('img/enemy/4.gif'),
        loadImage('img/enemy/5.gif'),
    ]
    
}

function setup() {
    createCanvas(400, 400)
    myGrid = new Grid(color(173, 216, 230))
    myEnemy = new Enemy(imagesEnemies[0])
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