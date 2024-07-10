import { Image } from 'p5'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicIceball } from './MagicIceball'
import { MagicIceballCollisionChecker } from './MagicIceballCollisionChecker'
import { Position } from '../types/position'
import { PathMovement } from '../path/PathMovement'
import { MagicCollisionChecker } from './MagicCollisionChecker'

export class MagicIceballCreator {
  static #instance: MagicIceballCreator | null = null
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
    if (MagicIceballCreator.#instance !== null) {
      throw new Error(
        'MagicIceballCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#instancesManager = instancesManager
    this.#images = images
    this.#initialEnemiesPosition = initialEnemiesPosition
    this.#orders = orders
    this.#speed = speed

    // assign the singleton instance
    MagicIceballCreator.#instance = this
  }

  static getInstance(
    instancesManager: MagicInstancesManager,
    images: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    speed: number,
  ) {
    if (MagicIceballCreator.#instance === null) {
      MagicIceballCreator.#instance = new MagicIceballCreator(
        instancesManager,
        images,
        initialEnemiesPosition,
        orders,
        speed,
      )
    }
    return MagicIceballCreator.#instance
  }

  // clearInstance is for using in jest
  static clearInstance() {
    MagicIceballCreator.#instance = null
  }

  create() {
    const pathMovement = new PathMovement(
      this.#initialEnemiesPosition,
      this.#orders,
      this.#speed,
    )

    const magicCollisionChecker = new MagicCollisionChecker()

    const magicIceballCollisionChecker = new MagicIceballCollisionChecker(
      magicCollisionChecker,
      pathMovement,
    )
    this.#instancesManager.add(
      new MagicIceball(
        this.#images,
        pathMovement,
        magicIceballCollisionChecker,
      ),
    )
  }
}
