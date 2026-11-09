// A jump is made of one order (one tile) per tile of the jump distance
export type JumpStep = {
  // number of the order inside the jump, starting at 0
  step: number
  // number of orders of the jump (the jump distance in tiles)
  length: number
}
