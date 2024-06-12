import { Image } from 'p5'
import { PathMovement } from '../path/PathMovement'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicIceball } from './MagicIceball'

export class MagicIceballCreator {
  #instancesManager: MagicInstancesManager
  #images: Image
  #pathMovement: PathMovement
  #magicCollisionChecker: MagicCollisionChecker
  constructor(
    instancesManager: MagicInstancesManager,
    images: Image,
    pathMovement: PathMovement,
    magicCollisionChecker: MagicCollisionChecker,
  ) {
    this.#instancesManager = instancesManager
    this.#images = images
    this.#pathMovement = pathMovement
    this.#magicCollisionChecker = magicCollisionChecker
  }

  create() {
    this.#instancesManager.add(
      new MagicIceball(
        this.#images,
        this.#pathMovement,
        this.#magicCollisionChecker,
      ),
    )
  }
}
