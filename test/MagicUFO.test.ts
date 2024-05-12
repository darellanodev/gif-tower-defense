import { Const } from '../src/constants/Const'
import { Enemy } from '../src/enemies/Enemy'
import { MagicUFO } from '../src/magics/MagicUFO'
import { clearEnemyInstances, instantiateNormalEnemy } from './helpers/enemy'
import { getPathFromMap } from './helpers/map'

const clearMagicUFOInstances = () => {
  MagicUFO.instances = []
}
const instantiateMagicUFO = (orders?: number[]) => {
  const image: any = null
  const initialPosition = { x: 100, y: 200 }

  if (!orders) {
    const path = getPathFromMap()
    orders = path.makeOrders()
  }

  MagicUFO.instantiate(image, initialPosition, orders)
}

test('id, when three Magic UFOs are created, last UFO has id = 3', () => {
  clearMagicUFOInstances()
  instantiateMagicUFO()
  instantiateMagicUFO()
  instantiateMagicUFO()
  const result = MagicUFO.instances[2].id

  expect(result).toBe(3)
})

test('id, when an Enemy is created and then a magic UFO is created, MagicUFO targets the enemy', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()

  clearMagicUFOInstances()
  instantiateMagicUFO()

  // The enemy needs to walk a minimum of a one tile size and then the MagicUFO can target it
  for (let i = 0; i < Const.TILE_SIZE + 1; i++) {
    Enemy.updateInstances()
    MagicUFO.updateInstances()
  }

  const result = MagicUFO.instances[0].enemyTarget

  const expected = Enemy.instances[0]
  expect(result).toEqual(expected)
})
