import { ParticleSystem } from './ParticleSystem'
import { RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'

export class ExplosionMagicFireball extends Explosion {
  static SIZE = 6
  static COLOR = [202, 191, 24] as RGBType

  constructor(
    x: number,
    y: number,
    ParticleSystemClass: typeof ParticleSystem,
  ) {
    super(x, y)
    this.particleSystem = new ParticleSystemClass(
      createVector(
        this.x + Const.EXPLOSION_OFFSET,
        this.y + Const.EXPLOSION_OFFSET,
      ),
      ExplosionMagicFireball.SIZE,
      ExplosionMagicFireball.COLOR,
    )
  }
}
