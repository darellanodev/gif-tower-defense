import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Magic } from './Magic'
import { Position } from './types'
import { ExplosionMagicIceball } from './ExplosionMagicIceball'

export class MagicIceball extends Magic {
  static FREEZE_ENEMY_MAX_TIME = 500

  static instances: MagicIceball[] = []
  static total: number = 3

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(images: Image, position: Position, orders: number[]) {
    if (MagicIceball.total > 0) {
      MagicIceball.instances.push(new MagicIceball(images, position, orders))
      MagicIceball.total--
    }
  }

  freeze(enemy: Enemy) {
    enemy.freeze()
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }

  static drawInstances() {
    MagicIceball.instances.forEach((iceball) => {
      iceball.draw()
    })
  }

  static updateInstances() {
    MagicIceball.instances.forEach((iceball) => {
      iceball.update()
      MagicIceball.checkMagicIceballCollides(iceball, Enemy.instances)
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
