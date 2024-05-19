import { ParticleSystem } from '../particles/ParticleSystem'
import { Position } from '../types/position'
import { RGBType } from '../types/rgb'
import { Const } from '../constants/Const'
import { Explosion } from './Explosion'
import { P5 } from '../utils/P5'

export class ExplosionMagicIceball extends Explosion {
  static SIZE = 6
  static COLOR = [0, 65, 255] as RGBType

  static instances: ExplosionMagicIceball[] = []

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      P5.p5.createVector(
        this.position.x + Const.EXPLOSION_OFFSET,
        this.position.y + Const.EXPLOSION_OFFSET,
      ),
      ExplosionMagicIceball.SIZE,
      ExplosionMagicIceball.COLOR,
    )
  }

  static instantiate(position: Position) {
    ExplosionMagicIceball.instances.push(new ExplosionMagicIceball(position))
  }

  static updateInstances() {
    ExplosionMagicIceball.instances.forEach((e) => {
      e.update()
    })
  }

  static removeDeadInstances() {
    ExplosionMagicIceball.instances = ExplosionMagicIceball.instances.filter(
      (e) => e.isActive(),
    )
  }
}
