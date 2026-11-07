import { GAME_SPEEDS } from './constants/gameSpeed'

export class GameSpeed {
  #speeds: readonly number[]
  #index = 0

  constructor(speeds: readonly number[] = GAME_SPEEDS) {
    const areValid =
      speeds.length > 0 && speeds.every((s) => Number.isInteger(s) && s >= 1)
    if (!areValid) {
      throw new Error('speeds must be a not empty list of integers >= 1')
    }
    this.#speeds = speeds
  }

  get updatesPerFrame() {
    return this.#speeds[this.#index]
  }

  get label() {
    return `x${this.updatesPerFrame}`
  }

  next() {
    this.#index = (this.#index + 1) % this.#speeds.length
  }

  reset() {
    this.#index = 0
  }

  // runs the update as many times as the current speed says, stopping as soon as it can not continue
  // (for example, when the game is over). Returns the number of updates executed
  runUpdates(update: () => void, canContinue: () => boolean = () => true) {
    let executed = 0
    while (executed < this.updatesPerFrame) {
      update()
      executed++
      if (!canContinue()) {
        break
      }
    }
    return executed
  }
}
