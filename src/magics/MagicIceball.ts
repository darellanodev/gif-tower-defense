import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { ExplosionMagicIceball } from '../explosions/ExplosionMagicIceball'
import { P5 } from '../utils/P5'
import { PathMovement } from '../path/PathMovement'
import { Const } from '../constants/Const'

export class MagicIceball extends Magic {
  static FREEZE_ENEMY_MAX_TIME = 500
  static SPEED = 10

  static instances: MagicIceball[] = []
  #touchedEnemiesIds: number[]
  #pathMovement: PathMovement

  #img: Image
  constructor(img: Image, pathMovement: PathMovement) {
    super(pathMovement.position)
    this.#touchedEnemiesIds = []
    this.#img = img
    this.#pathMovement = pathMovement
  }

  setToIgnoreList(enemy: Enemy) {
    this.#touchedEnemiesIds.push(enemy.id)
  }

  static instantiate(images: Image, pathMovement: PathMovement) {
    MagicIceball.instances.push(new MagicIceball(images, pathMovement))
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

  static updateInstances() {
    MagicIceball.instances.forEach((iceball) => {
      iceball.#pathMovement.update()
      iceball.updatePosition()
      iceball.updateStatus()
      MagicIceball.checkMagicIceballCollides(iceball, Enemy.instances)
    })
  }

  checkCollision(enemy: Enemy) {
    if (enemy.dead || enemy.winner) {
      return false
    }

    const found = this.#touchedEnemiesIds.find((id) => id === enemy.id)
    if (found !== undefined) {
      return false
    }

    const fireballPos = this.#pathMovement.indexOrder
    const enemyPos = enemy.orderPosition
    const distanceBetween = Math.abs(fireballPos - enemyPos)

    if (fireballPos >= enemyPos && distanceBetween < 1) {
      return true
    }

    return false
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
      if (magicIceball.checkCollision(enemy)) {
        MagicIceball.handleMagicIceballCollision(magicIceball, enemy)
      }
    })
  }

  static handleMagicIceballCollision(magicIceball: MagicIceball, enemy: Enemy) {
    magicIceball.freeze(enemy)
    magicIceball.setToIgnoreList(enemy)
    ExplosionMagicIceball.instantiate(enemy.position)
  }
}
