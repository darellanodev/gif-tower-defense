import { ParticleSystem } from '../ParticleSystem'
import { Position } from '../../types/position'
import { RGBType } from '../../types/rgb'
import { Explosion } from './Explosion'
import { P5 } from '../../utils/P5'
import { EXPLOSION_OFFSET } from '../../constants/explosion'

export class ExplosionEnemy extends Explosion {
  static SIZE = 12
  static COLOR = [255, 165, 0] as RGBType

  static instances: ExplosionEnemy[] = []

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      P5.p5.createVector(
        this.position.x + EXPLOSION_OFFSET,
        this.position.y + EXPLOSION_OFFSET,
      ),
      ExplosionEnemy.SIZE,
      ExplosionEnemy.COLOR,
    )
  }

  static instantiate(position: Position) {
    ExplosionEnemy.instances.push(new ExplosionEnemy(position))
  }

  static updateInstances() {
    ExplosionEnemy.instances.forEach((e) => {
      e.update()
    })
  }

  static removeDeadInstances() {
    ExplosionEnemy.instances = ExplosionEnemy.instances.filter(
      (e) => e.particleSystem!.hasAnyAliveParticles,
    )
  }
}
