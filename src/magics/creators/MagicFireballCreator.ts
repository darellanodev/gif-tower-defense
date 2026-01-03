import { Image } from 'p5'
import { PathMovement } from '../../levels/path/PathMovement'
import { MagicInstancesManager } from '../MagicInstancesManager'
import { MagicFireball } from '../MagicFireball'
import { MagicFireballCollisionChecker } from '../MagicFireballCollisionChecker'
import { MagicCollisionChecker } from '../MagicCollisionChecker'
import { Position } from '../../types/position'

export class MagicFireballCreator {
  static #instance: MagicFireballCreator | null = null

  #instancesManager: MagicInstancesManager
  #images: Image
  #initialEnemiesPosition: Position
  #orders: number[]
  #speed: number
  constructor(
    instancesManager: MagicInstancesManager,
    images: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    speed: number,
  ) {
    if (MagicFireballCreator.#instance !== null) {
      throw new Error(
        'MagicFireballCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#instancesManager = instancesManager
    this.#images = images
    this.#initialEnemiesPosition = initialEnemiesPosition
    this.#orders = orders
    this.#speed = speed

    // assign the singleton instance
    MagicFireballCreator.#instance = this
  }
  static getInstance(
    instancesManager: MagicInstancesManager,
    images: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    speed: number,
  ) {
    if (MagicFireballCreator.#instance === null) {
      MagicFireballCreator.#instance = new MagicFireballCreator(
        instancesManager,
        images,
        initialEnemiesPosition,
        orders,
        speed,
      )
    }
    return MagicFireballCreator.#instance
  }

  // clearInstance is for using in jest
  static clearInstance() {
    MagicFireballCreator.#instance = null
  }
  create() {
    const pathMovement = new PathMovement(
      this.#initialEnemiesPosition,
      this.#orders,
      this.#speed,
    )

    const magicCollisionChecker = new MagicCollisionChecker()

    const magicFireballCollisionChecker = new MagicFireballCollisionChecker(
      magicCollisionChecker,
      pathMovement,
    )
    this.#instancesManager.add(
      new MagicFireball(
        this.#images,
        pathMovement,
        magicFireballCollisionChecker,
      ),
    )
  }
}
