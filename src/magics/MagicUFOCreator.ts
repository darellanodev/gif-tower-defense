import { Image } from 'p5'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicUFO } from './MagicUFO'
import { Position } from '../types/position'
import { MagicUFOCollisionChecker } from './MagicUFOCollisionChecker'

export class MagicUFOCreator {
  static #instance: MagicUFOCreator | null = null
  #images: Image[]
  #startPosition: Position
  #magicInstancesManager: MagicInstancesManager
  constructor(
    images: Image[],
    startPosition: Position,
    magicInstancesManager: MagicInstancesManager,
  ) {
    if (MagicUFOCreator.#instance !== null) {
      throw new Error(
        'MagicUFOCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#images = images
    this.#startPosition = startPosition
    this.#magicInstancesManager = magicInstancesManager

    // assign the singleton instance
    MagicUFOCreator.#instance = this
  }

  static getInstance(
    images: Image[],
    startPosition: Position,
    magicInstancesManager: MagicInstancesManager,
  ) {
    if (MagicUFOCreator.#instance === null) {
      MagicUFOCreator.#instance = new MagicUFOCreator(
        images,
        startPosition,
        magicInstancesManager,
      )
    }

    return MagicUFOCreator.#instance
  }

  // clearInstance is for using in jest
  static clearInstance() {
    MagicUFOCreator.#instance = null
  }

  // this is the only magic that needs to pass in the instance creation the instances manager (magicInstancesManager). The UFO needs to see if other UFOs has targeted the enemy to target it
  create() {
    const magicUFOCollisionChecker = new MagicUFOCollisionChecker(
      this.#startPosition,
    )
    this.#magicInstancesManager.add(
      new MagicUFO(
        this.#images,
        this.#startPosition,
        this.#magicInstancesManager,
        magicUFOCollisionChecker,
      ),
    )
  }
}
