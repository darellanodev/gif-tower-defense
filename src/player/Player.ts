export class Player {
  static #instance: Player | null = null

  #lives: number = 7
  #score: number = 0
  #wave: number = 1
  constructor() {
    if (Player.#instance !== null) {
      throw new Error(
        'Player is a singleton class. Use getInstance to get the instance of the Player',
      )
    }
    Player.#instance = this
  }

  static getInstance() {
    if (Player.#instance === null) {
      Player.#instance = new Player()
    }
    return Player.#instance
  }

  get lives() {
    return this.#lives
  }

  get wave() {
    return this.#wave
  }

  get score() {
    return this.#score
  }

  set score(value) {
    this.#score = value
  }

  increaseWave() {
    this.#wave++
  }

  increaseScore(score: number) {
    this.#score += score
  }

  getPrintScore(): string {
    return String(this.#score).padStart(10, '0')
  }

  increaseLives(increment: number) {
    this.#lives += increment
  }

  decreaseLives() {
    this.#lives--
  }
}
