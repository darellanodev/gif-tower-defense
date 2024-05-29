import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { ExplosionMagicFireball } from '../explosions/ExplosionMagicFireball'
import { P5 } from '../utils/P5'
import { PathMovement } from '../path/PathMovement'
import { Const } from '../constants/Const'

export class MagicFireball extends Magic {
  static DAMAGE = 500
  static SPEED = 10

  static instances: MagicFireball[] = []
  #touchedEnemiesIds: number[]
  #pathMovement: PathMovement

  #img: Image
  constructor(img: Image, pathMovement: PathMovement) {
    super(pathMovement.position)
    this.#img = img
    this.#touchedEnemiesIds = []
    this.#pathMovement = pathMovement
  }

  setToIgnoreList(enemy: Enemy) {
    this.#touchedEnemiesIds.push(enemy.id)
  }

  static instantiate(images: Image, pathMovement: PathMovement) {
    MagicFireball.instances.push(new MagicFireball(images, pathMovement))
  }

  addDamage(enemy: Enemy) {
    enemy.addDamage(MagicFireball.DAMAGE)
  }

  draw() {
    P5.p5.image(this.#img, this.position.x, this.position.y)
  }

  static drawInstances() {
    MagicFireball.instances.forEach((fireball) => {
      fireball.draw()
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
    MagicFireball.instances.forEach((fireball) => {
      fireball.#pathMovement.update()
      fireball.updatePosition()
      fireball.updateStatus()
      MagicFireball.checkMagicFireballCollides(fireball, Enemy.instances)
    })
  }

  static removeDeadInstances() {
    MagicFireball.instances = MagicFireball.instances.filter((fireball) =>
      fireball.isAlive(),
    )
  }

  static checkMagicFireballCollides(
    magicFireball: MagicFireball,
    enemies: Enemy[],
  ) {
    enemies.forEach((enemy) => {
      if (magicFireball.checkCollision(enemy)) {
        MagicFireball.handleMagicFireballCollision(magicFireball, enemy)
      }
    })
  }

  static handleMagicFireballCollision(
    magicFireball: MagicFireball,
    enemy: Enemy,
  ) {
    magicFireball.addDamage(enemy)
    magicFireball.setToIgnoreList(enemy)
    ExplosionMagicFireball.instantiate(enemy.position)
  }
}
