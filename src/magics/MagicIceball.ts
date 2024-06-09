import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { ExplosionMagicIceball } from '../explosions/ExplosionMagicIceball'
import { P5 } from '../utils/P5'
import { PathMovement } from '../path/PathMovement'
import { Const } from '../constants/Const'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'

export class MagicIceball extends Magic {
  static FREEZE_ENEMY_MAX_TIME = 500
  static SPEED = 10

  #touchedEnemiesIds: number[]
  #pathMovement: PathMovement
  #magicCollisionChecker: MagicCollisionChecker

  #img: Image
  constructor(
    img: Image,
    pathMovement: PathMovement,
    magicCollisionChecker: MagicCollisionChecker,
  ) {
    super(pathMovement.position)
    this.#touchedEnemiesIds = []
    this.#img = img
    this.#pathMovement = pathMovement
    this.#magicCollisionChecker = magicCollisionChecker
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
      this.status = Const.MAGIC_STATUS_ALIVE
    } else {
      this.status = Const.MAGIC_STATUS_DEAD
    }
  }

  update(enemyInstancesManager: EnemyInstancesManager) {
    this.#pathMovement.update()
    this.updatePosition()
    this.updateStatus()
    MagicIceball.checkMagicIceballCollides(this, enemyInstancesManager.getAll())
  }

  static checkMagicIceballCollides(
    magicIceball: MagicIceball,
    enemies: Enemy[],
  ) {
    enemies.forEach((enemy) => {
      if (
        magicIceball.#magicCollisionChecker.checkCollision(
          enemy,
          magicIceball.#pathMovement.indexOrder,
        )
      ) {
        MagicIceball.handleMagicIceballCollision(magicIceball, enemy)
      }
    })
  }

  static handleMagicIceballCollision(magicIceball: MagicIceball, enemy: Enemy) {
    magicIceball.freeze(enemy)
    magicIceball.#magicCollisionChecker.setToIgnoreList(enemy)
    ExplosionMagicIceball.instantiate(enemy.position)
  }
}
