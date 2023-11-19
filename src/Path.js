const PathTile = require("./PathTile");

class Path {

    LEFT_DIRECTION = 1
    RIGHT_DIRECTION = 2
    UP_DIRECTION = 3
    DOWN_DIRECTION = 4
    TILE_SIZE = 50
    MAX_SEARCHES = 5000 // For testing purposes put a low value. For production put this value at 5000

    constructor(startTile, endTile, pathTiles) {
        this.startTile = startTile
        this.endTile = endTile
        this.pathTiles = pathTiles
    }

    getTileInPosition(tx, ty) {

        for (const pathTile of this.pathTiles){
            if (tx === pathTile.getX() && ty === pathTile.getY()){
                return pathTile
            }
        }

        return null
    }

    _searchLeftTile(currentTile) {
        const searchPx = currentTile.getX() - this.TILE_SIZE
        const searchPy = currentTile.getY()
        return this.getTileInPosition(searchPx, searchPy)
    }

    
    makeOrders() {

        const orders = []
        let currentTile = this.startTile
        let currentDirection = this.startTile.getStartDirection()

        let searchCount = 0
        while(searchCount < this.MAX_SEARCHES) {
            searchCount++
            if (currentDirection === this.LEFT_DIRECTION) {
                const searchTile = this._searchLeftTile(currentTile)
                
                if (searchTile) {
                    orders.push(this.LEFT_DIRECTION)
                    currentTile = searchTile
                } else {
                    currentDirection = this.DOWN_DIRECTION
                }
            }

            if (currentDirection === this.DOWN_DIRECTION) {

            }



        }

        return orders

    }

}

// This is for Jest testing
var module = module || {};
module.exports = Path;