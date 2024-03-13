import { ParticleSystem } from './ParticleSystem'
import { Position, RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'

export class ExplosionMagicFireball extends Explosion {
  static SIZE = 6
  static COLOR = [202, 191, 24] as RGBType

  constructor(position: Position, ParticleSystemClass: typeof ParticleSystem) {
    super(position)
    this.particleSystem = new ParticleSystemClass(
      createVector(
        this.position.x + Const.EXPLOSION_OFFSET,
        this.position.y + Const.EXPLOSION_OFFSET,
      ),
      ExplosionMagicFireball.SIZE,
      ExplosionMagicFireball.COLOR,
    )
  }
}
