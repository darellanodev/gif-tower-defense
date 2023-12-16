class EndTile {
  x: number
  y: number
  img: any

  constructor(img: any, x: number, y: number) {
    this.x = x
    this.y = y
    this.img = img
  }

  draw() {
    image(this.img, this.x, this.y)
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }
}
