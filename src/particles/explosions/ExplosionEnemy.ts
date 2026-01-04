import { ParticleSystem } from '../ParticleSystem'
import { Position } from '../../types/position'
import { Explosion } from './Explosion'
import { P5 } from '../../utils/P5'
import {
  EXPLOSION_COLOR,
  EXPLOSION_OFFSET,
  EXPLOSION_SIZE,
} from '../../constants/explosion'

export class ExplosionEnemy extends Explosion {
  static instances: ExplosionEnemy[] = []

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      P5.p5.createVector(
        this.position.x + EXPLOSION_OFFSET,
        this.position.y + EXPLOSION_OFFSET,
      ),
      EXPLOSION_SIZE.ENEMY,
      EXPLOSION_COLOR.ENEMY,
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
