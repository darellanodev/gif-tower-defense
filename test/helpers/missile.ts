import { Enemy } from '../../src/enemies/Enemy'
import { Missile } from '../../src/towers/Missile'
import { TowerRed } from '../../src/towers/TowerRed'
import { instantiateNormalEnemy } from './enemy'

export const instantiateMissile = () => {
  instantiateNormalEnemy()
  Missile.instances = []
  const position = { x: 100, y: 200 }
  Missile.instances.push(
    new Missile(position, Enemy.instances[0], TowerRed.DAMAGE_UPGRADE[0]),
  )
}
