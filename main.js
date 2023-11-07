let myGrid;
let myEnemy;

function setup() {
    createCanvas(400, 400);
    myGrid = new Grid(color(173, 216, 230));
    myEnemy = new Enemy(color(24, 123, 152));
}

function draw() {
    background('skyblue');
    rectMode(CORNER);

    myGrid.draw();
    myEnemy.draw();

    // HUD
    textSize(20);
    fill('yellow');
    text('This is a sample text', 50, 50);
}