class Range {

    static make(start, stop) {
        return new Array(stop - start + 1).fill(0).map((v,i) => start + i)
    }

}

// This is for Jest testing
var module = module || {}
module.exports = Range