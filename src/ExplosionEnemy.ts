import { ParticleSystem } from './ParticleSystem'
import { RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'

export class ExplosionEnemy extends Explosion {
  static SIZE = 12
  static COLOR = [255, 165, 0] as RGBType

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
      ExplosionEnemy.SIZE,
      ExplosionEnemy.COLOR,
    )
  }
}
