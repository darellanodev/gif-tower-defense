import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { Missile } from '../../src/towers/Missile'
import { TowerRed } from '../../src/towers/TowerRed'
import { createNormalEnemy } from './enemyCreator'

export const instantiateMissile = () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager)

  Missile.instances = []
  const position = { x: 100, y: 200 }
  Missile.instances.push(
    new Missile(
      position,
      enemyInstancesManager.getAll()[0],
      TowerRed.DAMAGE_UPGRADE[0],
    ),
  )
}
