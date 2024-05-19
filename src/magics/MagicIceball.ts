import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { Position } from '../types/position'
import { ExplosionMagicIceball } from '../explosions/ExplosionMagicIceball'
import { P5 } from '../utils/P5'

export class MagicIceball extends Magic {
  static FREEZE_ENEMY_MAX_TIME = 500

  static instances: MagicIceball[] = []

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(images: Image, position: Position, orders: number[]) {
    MagicIceball.instances.push(new MagicIceball(images, position, orders))
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
