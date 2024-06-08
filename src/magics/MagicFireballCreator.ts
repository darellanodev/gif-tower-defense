import { Image } from 'p5'
import { PathMovement } from '../path/PathMovement'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { MagicFireballInstancesManager } from './MagicFireballInstancesManager'
import { MagicFireball } from './MagicFireball'

export class MagicFireballCreator {
  #magicFireballInstancesManager: MagicFireballInstancesManager
  #images: Image
  #pathMovement: PathMovement
  #magicCollisionChecker: MagicCollisionChecker
  constructor(
    magicFireballInstancesManager: MagicFireballInstancesManager,
    images: Image,
    pathMovement: PathMovement,
    magicCollisionChecker: MagicCollisionChecker,
  ) {
    this.#magicFireballInstancesManager = magicFireballInstancesManager
    this.#images = images
    this.#pathMovement = pathMovement
    this.#magicCollisionChecker = magicCollisionChecker
  }

  createMagicFireball() {
    this.#magicFireballInstancesManager.add(
      new MagicFireball(
        this.#images,
        this.#pathMovement,
        this.#magicCollisionChecker,
      ),
    )
  }
}
