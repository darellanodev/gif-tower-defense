class Enemy {

    TILE_SIZE = 50
    VELOCITY = 1 // must be multiple of TILE_SIZE. Set 1 for normal game or 25 for speed test

    LEFT_DIRECTION = 1
    RIGHT_DIRECTION = 2
    UP_DIRECTION = 3
    DOWN_DIRECTION = 4

    constructor(img, orders, startTile, endTile) {
        this.img = img
        this.orders = orders
        this.startTile = startTile
        this.endTile = endTile

        this.reinitEnemy()
    }

    reinitEnemy() {
        console.log('reinit');
        this.currentDirection = startTile.getStartDirection()
        this.moveCount = 0
        this.indexOrder = 0
        this.setInitialPosition()
        this.insidePath = false
        this.endReached = false
    }

    isEndReached() {
        return (this.x === this.endTile.getX() && this.y === this.endTile.getY())
    }

    setInitialPosition() {

        switch (this.currentDirection) {
            case this.LEFT_DIRECTION:
                this.x = startTile.getX() + this.TILE_SIZE
                this.y = startTile.getY()
                break;
        
            case this.RIGHT_DIRECTION:
                this.x = startTile.getX() - this.TILE_SIZE
                this.y = startTile.getY()
                break;
        
            case this.UP_DIRECTION:
                this.x = startTile.getX()
                this.y = startTile.getY() + this.TILE_SIZE
                break;
        
            case this.DOWN_DIRECTION:
                this.x = startTile.getX()
                this.y = startTile.getY() - this.TILE_SIZE
                break;

        }

    }

    update() {
        switch (this.currentDirection) {
            case this.LEFT_DIRECTION:
                this.x = this.x - this.VELOCITY
                break;
        
            case this.RIGHT_DIRECTION:
                this.x = this.x + this.VELOCITY
                break;
        
            case this.UP_DIRECTION:
                this.y = this.y - this.VELOCITY
                break;
        
            case this.DOWN_DIRECTION:
                this.y = this.y + this.VELOCITY
                break;

        }
        
        this.moveCount = this.moveCount + this.VELOCITY

        if (this.moveCount === this.TILE_SIZE && this.endReached ) {
            this.reinitEnemy()
        }

        if (this.moveCount === this.TILE_SIZE) {
            this.moveCount = 0

            if (this.isEndReached()){
                console.log('end reached');
                this.endReached = true
            }

            if (!this.endReached) {
                if (this.insidePath) {
                    this.indexOrder++
                    this.currentDirection = this.orders[this.indexOrder]    
                } else {
                    this.insidePath = true
                }
            }

        }
    }

    draw() {
        image(this.img, this.x, this.y)
    }
}