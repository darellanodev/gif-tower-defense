import { EnemyInstances } from '../../src/enemies/EnemyInstances'
import { Missile } from '../../src/towers/Missile'
import { TowerRed } from '../../src/towers/TowerRed'
import { instantiateNormalEnemy } from './enemy'

export const instantiateMissile = () => {
  instantiateNormalEnemy()
  Missile.instances = []
  const position = { x: 100, y: 200 }
  Missile.instances.push(
    new Missile(
      position,
      EnemyInstances.instances[0],
      TowerRed.DAMAGE_UPGRADE[0],
    ),
  )
}
