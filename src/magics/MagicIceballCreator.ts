import { Image } from 'p5'
import { PathMovement } from '../path/PathMovement'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { MagicIceballInstancesManager } from './MagicIceballInstancesManager'
import { MagicIceball } from './MagicIceball'

export class MagicIceballCreator {
  #magicIceballInstancesManager: MagicIceballInstancesManager
  #images: Image
  #pathMovement: PathMovement
  #magicCollisionChecker: MagicCollisionChecker
  constructor(
    magicIceballInstancesManager: MagicIceballInstancesManager,
    images: Image,
    pathMovement: PathMovement,
    magicCollisionChecker: MagicCollisionChecker,
  ) {
    this.#magicIceballInstancesManager = magicIceballInstancesManager
    this.#images = images
    this.#pathMovement = pathMovement
    this.#magicCollisionChecker = magicCollisionChecker
  }

  createMagicIceball() {
    this.#magicIceballInstancesManager.add(
      new MagicIceball(
        this.#images,
        this.#pathMovement,
        this.#magicCollisionChecker,
      ),
    )
  }
}
