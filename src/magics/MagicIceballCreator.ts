import { Image } from 'p5'
import { PathMovement } from '../path/PathMovement'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicIceball } from './MagicIceball'
import { MagicIceballCollisionChecker } from './MagicIceballCollisionChecker'

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
    const magicIceballCollisionChecker = new MagicIceballCollisionChecker(
      this.#magicCollisionChecker,
      this.#pathMovement,
    )
    this.#instancesManager.add(
      new MagicIceball(
        this.#images,
        this.#pathMovement,
        magicIceballCollisionChecker,
      ),
    )
  }
}
