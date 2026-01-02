import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { P5 } from '../utils/P5'
import { PathMovement } from '../levels/path/PathMovement'
import { MagicIceballCollisionChecker } from './MagicIceballCollisionChecker'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MAGIC_STATUS } from '../constants/magics'

export class MagicIceball extends Magic {
  static FREEZE_ENEMY_MAX_TIME = 500
  static SPEED = 10

  #pathMovement: PathMovement
  #magicIceballCollisionChecker: MagicIceballCollisionChecker

  #img: Image
  constructor(
    img: Image,
    pathMovement: PathMovement,
    magicIceballCollisionChecker: MagicIceballCollisionChecker,
  ) {
    super(pathMovement.position)
    this.#img = img
    this.#pathMovement = pathMovement
    this.#magicIceballCollisionChecker = magicIceballCollisionChecker
  }

  freeze(enemy: Enemy) {
    enemy.freeze()
  }

  draw() {
    P5.p5.image(this.#img, this.position.x, this.position.y)
  }

  updatePosition() {
    this.position = this.#pathMovement.position
  }

  updateStatus() {
    if (this.#pathMovement.isAlive) {
      this.status = MAGIC_STATUS.ALIVE
      return
    }
    this.status = MAGIC_STATUS.DEAD
  }

  update(enemyInstancesManager: EnemyInstancesManager) {
    this.#pathMovement.update()
    this.updatePosition()
    this.updateStatus()
    this.#magicIceballCollisionChecker.check(
      this,
      enemyInstancesManager.getAll(),
    )
  }
}
