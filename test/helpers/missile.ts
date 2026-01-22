import { TOWER_RED_UPGRADE } from '../../src/constants/tower'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { Missile } from '../../src/towers/Missile'
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
      TOWER_RED_UPGRADE.DAMAGE[0],
    ),
  )
}
