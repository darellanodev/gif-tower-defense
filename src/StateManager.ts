export class StateManager {
  static STATE_MENU_MAIN = 0
  static STATE_MENU_SURVIVAL = 1
  static STATE_PLAY_SURVIVAL = 2

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
    this.#state = StateManager.STATE_PLAY_SURVIVAL
  }

  setMenuSurvival() {
    this.#state = StateManager.STATE_MENU_SURVIVAL
  }

  setMenuMain() {
    this.#state = StateManager.STATE_MENU_MAIN
  }

  get isPlay() {
    return this.#state == StateManager.STATE_PLAY_SURVIVAL
  }
  get isMenuSurvival() {
    return this.#state == StateManager.STATE_MENU_SURVIVAL
  }
  get isMenuMain() {
    return this.#state == StateManager.STATE_MENU_MAIN
  }
}
