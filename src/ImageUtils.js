class ImageUtils {
    static getRangeImagesOfEnemy(number) {
        return [number * 4, (number+1) * 4]
    }
}


// This is for Jest testing
var module = module || {}
module.exports = ImageUtils