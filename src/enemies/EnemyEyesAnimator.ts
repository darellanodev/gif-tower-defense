import {
  ENEMY_EYES_CHANGE_MAX_TIME,
  ENEMY_EYES_EXTEND_CLOSED_TIME,
  ENEMY_EYES_IMAGE,
  ENEMY_EYES_TIME_TO_CLOSE,
} from '../constants/enemyEyes'
import { Random } from '../utils/Random'
import { Image } from 'p5'

export class EnemyAnimator {
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
      ENEMY_EYES_IMAGE.LEFT,
      ENEMY_EYES_IMAGE.CENTER,
      ENEMY_EYES_IMAGE.RIGHT,
      ENEMY_EYES_IMAGE.CENTER,
    ]
    this.#imgIndex = ENEMY_EYES_IMAGE.CENTER
    this.#imgIndexBeforeEyesClosed = ENEMY_EYES_IMAGE.CENTER
  }

  update() {
    this.#changeEyes()
  }

  #hasEyesOpen() {
    return this.#imgIndex != ENEMY_EYES_IMAGE.CLOSED
  }

  #moveEyesInSequence() {
    if (this.#changeEyesTime > ENEMY_EYES_CHANGE_MAX_TIME) {
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
      ENEMY_EYES_TIME_TO_CLOSE.MIN,
      ENEMY_EYES_TIME_TO_CLOSE.MAX,
    )
  }

  #closeEyesWhenTimeReached() {
    if (this.#closeEyesTime > this.#randomCloseEyes) {
      this.#closeEyesTime = 0
      this.#setRandomTimeMaxForClosingEyes()
      this.#imgIndexBeforeEyesClosed = this.#imgIndex
      this.#imgIndex = ENEMY_EYES_IMAGE.CLOSED
    }
  }

  #openEyesWhenTimeReached() {
    if (this.#extendClosedEyesTime > ENEMY_EYES_EXTEND_CLOSED_TIME) {
      this.#extendClosedEyesTime = 0
      this.#imgIndex = this.#imgIndexBeforeEyesClosed
    }
  }

  #changeEyes() {
    if (this.#hasEyesOpen()) {
      this.#closeEyesTime++
      this.#closeEyesWhenTimeReached()
      this.#moveEyesInSequence()
      return
    }
    this.#extendClosedEyesTime++
    this.#openEyesWhenTimeReached()
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
