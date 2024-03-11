import { ParticleSystem } from './ParticleSystem'
import { RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'

export class ExplosionMagicIceball extends Explosion {
  static SIZE = 6
  static COLOR = [0, 65, 255] as RGBType

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
      ExplosionMagicIceball.SIZE,
      ExplosionMagicIceball.COLOR,
    )
  }
}
