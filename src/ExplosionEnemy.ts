import { ParticleSystem } from './ParticleSystem'
import { Position, RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'

export class ExplosionEnemy extends Explosion {
  static SIZE = 12
  static COLOR = [255, 165, 0] as RGBType

  constructor(position: Position, ParticleSystemClass: typeof ParticleSystem) {
    super(position)
    this.particleSystem = new ParticleSystemClass(
      createVector(
        this.position.x + Const.EXPLOSION_OFFSET,
        this.position.y + Const.EXPLOSION_OFFSET,
      ),
      ExplosionEnemy.SIZE,
      ExplosionEnemy.COLOR,
    )
  }
}
