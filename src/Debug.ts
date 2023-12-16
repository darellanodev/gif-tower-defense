class Debug {
  static showMouseCoordinates(px: number, py: number) {
    fill(255)
    stroke(0)
    strokeWeight(4)
    text(`${px} - ${py}`, 260, 18)
  }
}
