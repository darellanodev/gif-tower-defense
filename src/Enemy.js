class Enemy {

    TILE_SIZE = 50
    VELOCITY = 1 // must be multiple of TILE_SIZE. Set 1 for normal game or 25 for speed test

    CHANGE_EYES_MAX_TIME = 50
    
    EXTEND_CLOSED_EYES_MAX_TIME = 20
    MIN_TIME_TO_CLOSE = 50
    MAX_TIME_TO_CLOSE = 200

    EYES_LEFT = 1
    EYES_RIGHT = 2
    EYES_CENTER = 0
    EYES_CLOSED = 3

    constructor(images, orders, startTile, endTile) {
        this.images = images
        this.orders = orders
        this.startTile = startTile
        this.endTile = endTile

        this.imgIndex = this.EYES_CENTER
        this.imgIndexBeforeEyesClosed = this.EYES_CENTER
        this.eyesSequence = [this.EYES_LEFT, this.EYES_CENTER, this.EYES_RIGHT, this.EYES_CENTER]

        this.reinitEnemy()
    }

    reinitEnemy() {
        this.currentDirection = startTile.getStartDirection()
        this.moveCount = 0
        this.indexOrder = 0
        this.setInitialPosition()
        this.insidePath = false
        this.endReached = false
        this.changeEyesTime = 0
        this.indexEyesSecuence = 0
        this.closeEyesTime = 0
        this.extendClosedEyesTime = 0

        this._setRandomTimeMaxForClosingEyes()
    }

    isEndReached() {
        return (this.x === this.endTile.getX() && this.y === this.endTile.getY())
    }

    setInitialPosition() {

        switch (this.currentDirection) {
            case Const.LEFT_DIRECTION:
                this.x = startTile.getX() + this.TILE_SIZE
                this.y = startTile.getY()
                break
        
            case Const.RIGHT_DIRECTION:
                this.x = startTile.getX() - this.TILE_SIZE
                this.y = startTile.getY()
                break
        
            case Const.UP_DIRECTION:
                this.x = startTile.getX()
                this.y = startTile.getY() + this.TILE_SIZE
                break
        
            case Const.DOWN_DIRECTION:
                this.x = startTile.getX()
                this.y = startTile.getY() - this.TILE_SIZE
                break

        }

    }

    update() {
        switch (this.currentDirection) {
            case Const.LEFT_DIRECTION:
                this.x = this.x - this.VELOCITY
                break
        
            case Const.RIGHT_DIRECTION:
                this.x = this.x + this.VELOCITY
                break
        
            case Const.UP_DIRECTION:
                this.y = this.y - this.VELOCITY
                break
        
            case this.DOWN_DIRECTION:
                this.Const.his.y + this.VELOCITY
                break

        }
        
        this.moveCount = this.moveCount + this.VELOCITY

        if (this.moveCount === this.TILE_SIZE && this.endReached ) {
            this.reinitEnemy()
        }

        if (this.moveCount === this.TILE_SIZE) {
            this.moveCount = 0

            if (this.isEndReached()){
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

    _hasOpenEyes() {
        return this.imgIndex != this.EYES_CLOSED
    }

    _moveEyesInSequence() {
        this.changeEyesTime++

        if (this.changeEyesTime > this.CHANGE_EYES_MAX_TIME) {
            this.changeEyesTime = 0
            this.indexEyesSecuence++
            if (this.indexEyesSecuence == this.eyesSequence.length ) {
                this.indexEyesSecuence = 0
            }

            this.imgIndex = this.eyesSequence[this.indexEyesSecuence]
        }
    }

    _setRandomTimeMaxForClosingEyes() {
        this.randomCloseEyes = Random.integerBetween(this.MIN_TIME_TO_CLOSE, this.MAX_TIME_TO_CLOSE)
    }

    _changeEyes() {

        if (this._hasOpenEyes()) {

            this.closeEyesTime++

            if (this.closeEyesTime > this.randomCloseEyes) {
                this.closeEyesTime = 0
                this._setRandomTimeMaxForClosingEyes()
                this.imgIndexBeforeEyesClosed = this.imgIndex
                this.imgIndex = this.EYES_CLOSED
            }

            this._moveEyesInSequence()
        } else {

            this.extendClosedEyesTime++

            if (this.extendClosedEyesTime > this.EXTEND_CLOSED_EYES_MAX_TIME) {
                this.extendClosedEyesTime = 0
                this.imgIndex = this.imgIndexBeforeEyesClosed
            }
        }
        
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    draw() {

        this._changeEyes()

        image(this.images[this.imgIndex], this.x, this.y)
    }
}