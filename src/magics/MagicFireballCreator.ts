import { Image } from 'p5'
import { PathMovement } from '../path/PathMovement'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicFireball } from './MagicFireball'

export class MagicFireballCreator {
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
      new MagicFireball(
        this.#images,
        this.#pathMovement,
        this.#magicCollisionChecker,
      ),
    )
  }
}
