import { ParticleSystem } from '../ParticleSystem'
import { Position } from '../../types/position'
import { Explosion } from './Explosion'
import { P5 } from '../../utils/P5'
import {
  EXPLOSION_COLOR,
  EXPLOSION_OFFSET,
  EXPLOSION_SIZE,
} from '../../constants/explosion'

export class ExplosionMagicFireball extends Explosion {
  static instances: ExplosionMagicFireball[] = []

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      P5.p5.createVector(
        this.position.x + EXPLOSION_OFFSET,
        this.position.y + EXPLOSION_OFFSET,
      ),
      EXPLOSION_SIZE.MAGIC_FIREBALL,
      EXPLOSION_COLOR.MAGIC_FIREBALL,
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
      (e) => e.particleSystem!.hasAnyAliveParticles,
    )
  }
}
