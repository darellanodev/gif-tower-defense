import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { P5 } from '../utils/P5'
import { PathMovement } from '../levels/path/PathMovement'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicFireballCollisionChecker } from './MagicFireballCollisionChecker'
import { MAGIC_STATUS } from '../constants/magics'

export class MagicFireball extends Magic {
  static DAMAGE = 500

  #pathMovement: PathMovement
  #magicFireballCollisionChecker: MagicFireballCollisionChecker
  #img: Image
  constructor(
    img: Image,
    pathMovement: PathMovement,
    magicFireballCollisionChecker: MagicFireballCollisionChecker,
  ) {
    super(pathMovement.position)
    this.#img = img
    this.#pathMovement = pathMovement
    this.#magicFireballCollisionChecker = magicFireballCollisionChecker
  }

  addDamage(enemy: Enemy) {
    enemy.addDamage(MagicFireball.DAMAGE)
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
    this.#magicFireballCollisionChecker.check(
      this,
      enemyInstancesManager.getAll(),
    )
  }
}
