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

    
    makeOrders() {

        const orders = []
        let actualTile = this.startTile
        let actualDirection = this.startTile.getStartDirection()

        let searchCount = 0
        while(searchCount < this.MAX_SEARCHES) {
            searchCount++
            if (actualDirection === this.LEFT_DIRECTION) {
                const searchPx = actualTile.getX() - this.TILE_SIZE
                const searchPy = actualTile.getY()
                const searchTile = this.getTileInPosition(searchPx, searchPy)
                
                if (searchTile) {
                    orders.push(this.LEFT_DIRECTION)
                    actualTile = searchTile
                }
            }   
        }

        return orders

    }

}

// This is for Jest testing
var module = module || {};
module.exports = Path;