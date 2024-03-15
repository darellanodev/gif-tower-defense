import { ParticleSystem } from './ParticleSystem'
import { Position, RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'

export class ExplosionMagicIceball extends Explosion {
  static SIZE = 6
  static COLOR = [0, 65, 255] as RGBType

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      createVector(
        this.position.x + Const.EXPLOSION_OFFSET,
        this.position.y + Const.EXPLOSION_OFFSET,
      ),
      ExplosionMagicIceball.SIZE,
      ExplosionMagicIceball.COLOR,
    )
  }
}
