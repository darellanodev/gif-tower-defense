import { Image } from 'p5'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicUFO } from './MagicUFO'
import { Position } from '../types/position'

export class MagicUFOCreator {
  #images: Image[]
  #startPosition: Position
  #magicInstancesManager: MagicInstancesManager
  constructor(
    images: Image[],
    startPosition: Position,
    magicInstancesManager: MagicInstancesManager,
  ) {
    this.#images = images
    this.#startPosition = startPosition
    this.#magicInstancesManager = magicInstancesManager
  }

  // this is the only magic that needs to pass in the instance creation the instances manager (magicInstancesManager). The UFO needs to see if other UFOs has targeted the enemy to target it
  create() {
    this.#magicInstancesManager.add(
      new MagicUFO(
        this.#images,
        this.#startPosition,
        this.#magicInstancesManager,
      ),
    )
  }
}
