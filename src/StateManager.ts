export class StateManager {
  static STATE_MENU = 0
  static STATE_PLAY = 1

  #state: number
  constructor() {
    this.#state = 1
  }

  setPlay() {
    this.#state = StateManager.STATE_PLAY
  }

  setMenu() {
    this.#state = StateManager.STATE_MENU
  }

  get isPlay() {
    return this.#state == StateManager.STATE_PLAY
  }

  get isMenu() {
    return this.#state == StateManager.STATE_MENU
  }
}
