import { ParticleSystem } from '../ParticleSystem'
import { Position } from '../../types/position'
import { Explosion } from './Explosion'
import { P5 } from '../../utils/P5'
import {
  EXPLOSION_COLOR,
  EXPLOSION_OFFSET,
  EXPLOSION_SIZE,
} from '../../constants/explosion'

export class ExplosionMagicIceball extends Explosion {
  static instances: ExplosionMagicIceball[] = []

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      P5.p5.createVector(
        this.position.x + EXPLOSION_OFFSET,
        this.position.y + EXPLOSION_OFFSET,
      ),
      EXPLOSION_SIZE.MAGIC_ICEBALL,
      EXPLOSION_COLOR.MAGIC_ICEBALL,
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
      (e) => e.particleSystem!.hasAnyAliveParticles,
    )
  }
}
