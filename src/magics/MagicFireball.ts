import { Image } from 'p5'
import { Enemy } from '../enemies/Enemy'
import { Magic } from './Magic'
import { Position } from '../types/position'
import { ExplosionMagicFireball } from '../explosions/ExplosionMagicFireball'
import { P5 } from '../utils/P5'

export class MagicFireball extends Magic {
  static DAMAGE = 500

  static instances: MagicFireball[] = []

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(images: Image, position: Position, orders: number[]) {
    MagicFireball.instances.push(new MagicFireball(images, position, orders))
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

  static updateInstances() {
    MagicFireball.instances.forEach((magicFireball) => {
      magicFireball.update()
      MagicFireball.checkMagicFireballCollides(magicFireball, Enemy.instances)
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
