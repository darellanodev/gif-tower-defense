import { Random } from '../utils/Random'
import { Image } from 'p5'

export class EnemyAnimator {
  static CHANGE_EYES_MAX_TIME = 50
  static EXTEND_CLOSED_EYES_MAX_TIME = 20
  static MIN_TIME_TO_CLOSE = 50
  static MAX_TIME_TO_CLOSE = 200
  static EYES_CENTER = 0
  static EYES_LEFT = 1
  static EYES_RIGHT = 2
  static EYES_CLOSED = 3
  static INDEX_BOSS_IN_ENEMIES_IMAGES = 5

  #images: Image[]

  #imgIndex: number
  #imgIndexBeforeEyesClosed: number
  #eyesSequence: number[]
  #changeEyesTime: number = 0
  #indexEyesSequence: number = 0
  #closeEyesTime: number = 0
  #extendClosedEyesTime: number = 0
  #randomCloseEyes: number = 0

  constructor(images: Image[]) {
    this.#images = images

    this.#eyesSequence = [
      EnemyAnimator.EYES_LEFT,
      EnemyAnimator.EYES_CENTER,
      EnemyAnimator.EYES_RIGHT,
      EnemyAnimator.EYES_CENTER,
    ]
    this.#imgIndex = EnemyAnimator.EYES_CENTER
    this.#imgIndexBeforeEyesClosed = EnemyAnimator.EYES_CENTER
  }

  update() {
    this.#changeEyes()
  }

  #hasOpenEyes() {
    return this.#imgIndex != EnemyAnimator.EYES_CLOSED
  }

  #moveEyesInSequence() {
    if (this.#changeEyesTime > EnemyAnimator.CHANGE_EYES_MAX_TIME) {
      this.#changeEyesTime = 0
      this.#indexEyesSequence++
      this.#resetEyesSequenceWhenTimeReached()
      this.#updateEyesImage()
    }
    this.#changeEyesTime++
  }

  #updateEyesImage() {
    this.#imgIndex = this.#eyesSequence[this.#indexEyesSequence]
  }

  #resetEyesSequenceWhenTimeReached() {
    if (this.#indexEyesSequence == this.#eyesSequence.length) {
      this.#indexEyesSequence = 0
    }
  }

  #setRandomTimeMaxForClosingEyes() {
    this.#randomCloseEyes = Random.integerBetween(
      EnemyAnimator.MIN_TIME_TO_CLOSE,
      EnemyAnimator.MAX_TIME_TO_CLOSE,
    )
  }

  #closeEyesWhenTimeReached() {
    if (this.#closeEyesTime > this.#randomCloseEyes) {
      this.#closeEyesTime = 0
      this.#setRandomTimeMaxForClosingEyes()
      this.#imgIndexBeforeEyesClosed = this.#imgIndex
      this.#imgIndex = EnemyAnimator.EYES_CLOSED
    }
  }

  #checkIfOpenEyes() {
    if (
      this.#extendClosedEyesTime > EnemyAnimator.EXTEND_CLOSED_EYES_MAX_TIME
    ) {
      this.#extendClosedEyesTime = 0
      this.#imgIndex = this.#imgIndexBeforeEyesClosed
    }
  }

  #changeEyes() {
    if (this.#hasOpenEyes()) {
      this.#closeEyesTime++
      this.#closeEyesWhenTimeReached()
      this.#moveEyesInSequence()
    } else {
      this.#extendClosedEyesTime++
      this.#checkIfOpenEyes()
    }
  }

  get imageToDraw() {
    return this.#images[this.#imgIndex]
  }

  restart() {
    this.#changeEyesTime = 0
    this.#indexEyesSequence = 0
    this.#closeEyesTime = 0
    this.#extendClosedEyesTime = 0
    this.#setRandomTimeMaxForClosingEyes()
  }
}
