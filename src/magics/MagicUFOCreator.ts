import { Image } from 'p5'
import { MagicUFOInstancesManager } from './MagicUFOInstancesManager'
import { MagicUFO } from './MagicUFO'
import { Position } from '../types/position'

export class MagicUFOCreator {
  #images: Image[]
  #startPosition: Position
  #magicUFOInstancesManager: MagicUFOInstancesManager
  constructor(
    images: Image[],
    startPosition: Position,
    magicUFOInstancesManager: MagicUFOInstancesManager,
  ) {
    this.#images = images
    this.#startPosition = startPosition
    this.#magicUFOInstancesManager = magicUFOInstancesManager
  }

  // this is the only magic that needs to pass in the instance creation the instances manager (magicUFOInstancesManager). The UFO needs to see if other UFOs has targeted the enemy to target it
  create() {
    this.#magicUFOInstancesManager.add(
      new MagicUFO(
        this.#images,
        this.#startPosition,
        this.#magicUFOInstancesManager,
      ),
    )
  }
}
