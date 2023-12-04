class Path {

    TILE_SIZE = 50
    MAX_SEARCHES = 5000 // For testing purposes put a low value. For production put this value at 5000

    constructor(startTile, endTile, pathTiles) {
        this.startTile = startTile
        this.endTile = endTile
        this.pathTiles = pathTiles
    }

    getTileInPosition(tx, ty) {

        const pathTile = this.pathTiles.find(pathTile => (tx === pathTile.getX() && ty === pathTile.getY()))

        return pathTile ? pathTile : null

    }

    _searchLeftTile(currentTile) {
        const searchPx = currentTile.getX() - this.TILE_SIZE
        const searchPy = currentTile.getY()
        return this.getTileInPosition(searchPx, searchPy)
    }

    _searchDownTile(currentTile) {
        const searchPx = currentTile.getX()
        const searchPy = currentTile.getY() + this.TILE_SIZE
        return this.getTileInPosition(searchPx, searchPy)
    }

    _searchRightTile(currentTile) {
        const searchPx = currentTile.getX() + this.TILE_SIZE
        const searchPy = currentTile.getY()
        return this.getTileInPosition(searchPx, searchPy)
    }

    _searchUpTile(currentTile) {
        const searchPx = currentTile.getX()
        const searchPy = currentTile.getY() - this.TILE_SIZE
        return this.getTileInPosition(searchPx, searchPy)
    }

    _isLeftEndTile(currentTile) {
        const searchPx = currentTile.getX() - this.TILE_SIZE
        const searchPy = currentTile.getY()

        const endPx = this.endTile.getX()
        const endPy = this.endTile.getY()
        
        if ((searchPx === endPx) && (searchPy === endPy)) {
            return true
        }
        return false
    }
    
    makeOrders() {

        const orders = []
        let currentTile = this.startTile
        let currentDirection = this.startTile.getStartDirection()

        let endReached = false
        let searchCount = 0
        while((searchCount < this.MAX_SEARCHES) && (!endReached)) {
            searchCount++
            if (currentDirection === Const.LEFT_DIRECTION) {
                const isLeftEndTile = this._isLeftEndTile(currentTile)
                
                if (isLeftEndTile) {
                    endReached = true
                    orders.push(Const.LEFT_DIRECTION)
                } else {

                    const searchTile = this._searchLeftTile(currentTile)
                
                    if (searchTile) {
                        orders.push(Const.LEFT_DIRECTION)
                        currentTile = searchTile
                    } else {
                        // It is preferred to go first down and if it is not possible to go up
                        const searchNextTile = this._searchDownTile(currentTile)
                        if (searchNextTile) {
                            currentDirection = Const.DOWN_DIRECTION
                        } else {
                            currentDirection = Const.UP_DIRECTION
                        }
                    }

                }


            }

            if (currentDirection === Const.DOWN_DIRECTION) {
                const searchTile = this._searchDownTile(currentTile)

                if (searchTile) {
                    orders.push(Const.DOWN_DIRECTION)
                    currentTile = searchTile
                } else {
                    // It is preferred to go first to the right and if it is not possible to the left
                    const searchNextTile = this._searchRightTile(currentTile)
                    if (searchNextTile) {
                        currentDirection = Const.RIGHT_DIRECTION
                    } else {
                        currentDirection = Const.LEFT_DIRECTION
                    }
                }
            }

            if (currentDirection === Const.RIGHT_DIRECTION) {
                const searchTile = this._searchRightTile(currentTile)

                if (searchTile) {
                    orders.push(Const.RIGHT_DIRECTION)
                    currentTile = searchTile
                } else {
                    // It is preferred to go first up and if it is not possible to go down
                    const searchNextTile = this._searchUpTile(currentTile)
                    if (searchNextTile) {
                        currentDirection = Const.UP_DIRECTION
                    } else {
                        currentDirection = Const.DOWN_DIRECTION
                    }
                    
                }
            }

            if (currentDirection === Const.UP_DIRECTION) {
                const searchTile = this._searchUpTile(currentTile)

                if (searchTile) {
                    orders.push(Const.UP_DIRECTION)
                    currentTile = searchTile
                } else {
                    // It is preferred to go first left and if it is not possible to go right
                    const searchNextTile = this._searchLeftTile(currentTile)
                    if (searchNextTile) {
                        currentDirection = Const.LEFT_DIRECTION
                    } else {
                        currentDirection = Const.RIGHT_DIRECTION
                    }
                }
            }
        }

        // cant reach the end because we spent all searchCount
        if (searchCount === this.MAX_SEARCHES) {
            return []
        }

        return orders

    }

}

// This is for Jest testing
var module = module || {}
module.exports = Path