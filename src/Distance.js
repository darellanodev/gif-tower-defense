class Distance {
    static twoPoints(ax, ay, bx, by) {
        return Math.sqrt( ((ax - bx) * (ax - bx)) + ((ay - by) * (ay - by)) ) 
    }
}
