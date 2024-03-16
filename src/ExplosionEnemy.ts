import { ParticleSystem } from './ParticleSystem'
import { Position, RGBType } from './types'
import { Const } from './Const'
import { Explosion } from './Explosion'

export class ExplosionEnemy extends Explosion {
  static SIZE = 12
  static COLOR = [255, 165, 0] as RGBType

  static instances: ExplosionEnemy[] = []

  constructor(position: Position) {
    super(position)
    this.particleSystem = new ParticleSystem(
      createVector(
        this.position.x + Const.EXPLOSION_OFFSET,
        this.position.y + Const.EXPLOSION_OFFSET,
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
    ExplosionEnemy.instances = ExplosionEnemy.instances.filter((e) =>
      e.isActive(),
    )
  }
}
