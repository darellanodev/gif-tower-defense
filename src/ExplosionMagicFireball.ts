import { ParticleSystem } from './ParticleSystem'
import { Position, RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'
import { P5 } from './P5'

export class ExplosionMagicFireball extends Explosion {
  static SIZE = 6
  static COLOR = [202, 191, 24] as RGBType

  static instances: ExplosionMagicFireball[] = []

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      P5.p5.createVector(
        this.position.x + Const.EXPLOSION_OFFSET,
        this.position.y + Const.EXPLOSION_OFFSET,
      ),
      ExplosionMagicFireball.SIZE,
      ExplosionMagicFireball.COLOR,
    )
  }

  static instantiate(position: Position) {
    ExplosionMagicFireball.instances.push(new ExplosionMagicFireball(position))
  }

  static updateInstances() {
    ExplosionMagicFireball.instances.forEach((e) => {
      e.update()
    })
  }

  static removeDeadInstances() {
    ExplosionMagicFireball.instances = ExplosionMagicFireball.instances.filter(
      (e) => e.isActive(),
    )
  }
}
