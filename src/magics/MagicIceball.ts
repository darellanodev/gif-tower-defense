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

  static instances: MagicIceball[] = []
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

  static instantiate(
    images: Image,
    pathMovement: PathMovement,
    magicCollisionChecker: MagicCollisionChecker,
  ) {
    MagicIceball.instances.push(
      new MagicIceball(images, pathMovement, magicCollisionChecker),
    )
  }

  freeze(enemy: Enemy) {
    enemy.freeze()
  }

  draw() {
    P5.p5.image(this.#img, this.position.x, this.position.y)
  }

  static drawInstances() {
    MagicIceball.instances.forEach((iceball) => {
      iceball.draw()
    })
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

  static updateInstances(enemyInstancesManager: EnemyInstancesManager) {
    MagicIceball.instances.forEach((iceball) => {
      iceball.#pathMovement.update()
      iceball.updatePosition()
      iceball.updateStatus()
      MagicIceball.checkMagicIceballCollides(
        iceball,
        enemyInstancesManager.getAll(),
      )
    })
  }

  static removeDeadInstances() {
    MagicIceball.instances = MagicIceball.instances.filter((iceball) =>
      iceball.isAlive(),
    )
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
