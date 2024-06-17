export class StateManager {
  static STATE_MENU = 0
  static STATE_PLAY = 1
  static STATE_PAUSE = 2

  #state: number
  constructor() {
    this.#state = 0
  }

  setPlay() {
    this.#state = StateManager.STATE_PLAY
  }

  setPause() {
    this.#state = StateManager.STATE_PAUSE
  }

  setMenu() {
    this.#state = StateManager.STATE_MENU
  }
}
