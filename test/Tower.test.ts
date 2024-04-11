import { Tower } from '../src/towers/Tower'
import { TowerGreen } from '../src/towers/TowerGreen'
import { Position } from '../src/utils/types'

test('upgradeIncrement, when the instance is recently created, return the expected value', () => {
  const position: Position = { x: 10, y: 20 }
  const towerGreen = TowerGreen.instantiate(position)

  const result = towerGreen.upgradeIncrement

  const expected = Tower.UPGRADE_INCREMENT / (towerGreen.upgradeLevel + 1)
  expect(result).toBe(expected)
})
