export class StateManager {
  static STATE_MENU = 0
  static STATE_PLAY = 1

  static #instance: StateManager | null = null
  #state: number
  constructor(initialState: number) {
    if (StateManager.#instance !== null) {
      throw new Error(
        'StateManager is a singleton class, use getInstance to get the instance',
      )
    }
    this.#state = initialState

    // assign the singleton instance
    StateManager.#instance = this
  }

  static getInstance(initialState: number) {
    if (StateManager.#instance === null) {
      StateManager.#instance = new StateManager(initialState)
    }
    return StateManager.#instance
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
