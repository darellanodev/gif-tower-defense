import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { ExplosionMagicFireball } from '../explosions/ExplosionMagicFireball'
import { P5 } from '../utils/P5'
import { PathMovement } from '../path/PathMovement'
import { Const } from '../constants/Const'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { ConstTest } from '../constants/ConstTest'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'

export class MagicFireball extends Magic {
  static DAMAGE = 500
  static SPEED = 10

  #magicCollisionChecker: MagicCollisionChecker
  #pathMovement: PathMovement

  #img: Image
  constructor(
    img: Image,
    pathMovement: PathMovement,
    magicCollisionChecker: MagicCollisionChecker,
  ) {
    super(pathMovement.position)
    this.#img = img
    this.#pathMovement = pathMovement
    this.#magicCollisionChecker = magicCollisionChecker
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
      this.status = Const.MAGIC_STATUS_ALIVE
    } else {
      this.status = Const.MAGIC_STATUS_DEAD
    }
  }

  update(enemyInstancesManager: EnemyInstancesManager) {
    this.#pathMovement.update()
    this.updatePosition()
    this.updateStatus()

    this.checkMagicFireballCollides(this, enemyInstancesManager.getAll())
  }

  checkMagicFireballCollides(magicFireball: MagicFireball, enemies: Enemy[]) {
    enemies.forEach((enemy) => {
      if (
        magicFireball.#magicCollisionChecker.checkCollision(
          enemy,
          magicFireball.#pathMovement.indexOrder,
        )
      ) {
        this.handleMagicFireballCollision(magicFireball, enemy)
      }
    })
  }

  handleMagicFireballCollision(magicFireball: MagicFireball, enemy: Enemy) {
    magicFireball.addDamage(enemy)
    magicFireball.#magicCollisionChecker.setToIgnoreList(enemy)
    if (!ConstTest.DISABLE_EXPLOSION_FOR_UNIT_TESTING) {
      ExplosionMagicFireball.instantiate(enemy.position)
    }
  }
}
