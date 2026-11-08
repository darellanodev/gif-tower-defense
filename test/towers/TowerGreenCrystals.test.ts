import { beforeEach, describe, expect } from 'vitest'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { TileCrystal } from '../../src/levels/tiles/TileCrystal'
import { TowerGreen } from '../../src/towers/TowerGreen'
import { TowerRed } from '../../src/towers/TowerRed'
import { TOWER_GREEN_UPGRADE } from '../../src/constants/tower'
import { Distance } from '../../src/utils/Distance'
import { createNormalEnemy } from '../helpers/enemyCreator'
import { instantiateGreenTower, instantiateRedTower } from '../helpers/towers'

// the tower is placed around (10, 20) and its influence area is about 90 pixels at the first level
const crystalNear = () => new TileCrystal(null, { x: 60, y: 20 })
const crystalNearer = () => new TileCrystal(null, { x: 30, y: 20 })
const crystalFar = () => new TileCrystal(null, { x: 400, y: 20 })

let greenTower: TowerGreen
let enemyInstancesManager: EnemyInstancesManager

const createEnemyAt = (x: number, y: number) => {
  createNormalEnemy(enemyInstancesManager, null, 1)
  const enemies = enemyInstancesManager.getAll()
  const enemy = enemies[enemies.length - 1]
  enemy.position = { x, y }
  return enemy
}

beforeEach(() => {
  greenTower = instantiateGreenTower() as TowerGreen
  enemyInstancesManager = new EnemyInstancesManager()
})

describe('selectTarget with crystals', () => {
  test('when there are no enemies and a crystal is in the influence area, the crystal is the target', () => {
    const crystal = crystalNear()

    greenTower.selectTarget([], [crystal])

    expect(greenTower.crystalTarget).toBe(crystal)
  })

  test('when the crystal is outside of the influence area, there is no target', () => {
    greenTower.selectTarget([], [crystalFar()])

    expect(greenTower.crystalTarget).toBeNull()
  })

  test('when there are several crystals in the influence area, the nearest one is the target', () => {
    const nearest = crystalNearer()

    greenTower.selectTarget([], [crystalNear(), nearest])

    expect(greenTower.crystalTarget).toBe(nearest)
  })

  test('when the nearest crystal is dead, it is ignored', () => {
    const dead = crystalNearer()
    dead.addDamage(10000)
    const alive = crystalNear()

    greenTower.selectTarget([], [dead, alive])

    expect(greenTower.crystalTarget).toBe(alive)
  })

  test('when there is an enemy in the influence area, the enemy is the target and not the crystal', () => {
    const enemy = createEnemyAt(20, 20)

    greenTower.selectTarget([enemy], [crystalNearer()])

    expect([greenTower.enemyTarget, greenTower.crystalTarget]).toStrictEqual([
      enemy,
      null,
    ])
  })

  test('when the enemy is outside of the influence area, the crystal is the target', () => {
    const enemy = createEnemyAt(500, 500)
    const crystal = crystalNear()

    greenTower.selectTarget([enemy], [crystal])

    expect([greenTower.enemyTarget, greenTower.crystalTarget]).toStrictEqual([
      null,
      crystal,
    ])
  })

  test('when the enemy goes away, the tower shoots the crystal again', () => {
    const enemy = createEnemyAt(20, 20)
    const crystal = crystalNear()
    greenTower.selectTarget([enemy], [crystal])

    enemy.position = { x: 500, y: 500 }
    greenTower.selectTarget([enemy], [crystal])

    expect(greenTower.crystalTarget).toBe(crystal)
  })

  test('when the crystal target is destroyed and removed, the target is cleared', () => {
    const crystal = crystalNear()
    greenTower.selectTarget([], [crystal])

    greenTower.selectTarget([], [])

    expect(greenTower.crystalTarget).toBeNull()
  })

  test('the distance to the target is the distance to the crystal', () => {
    const crystal = crystalNear()
    greenTower.selectTarget([], [crystal])

    const expected = new Distance().calculate(
      greenTower.position,
      crystal.position,
    )
    expect(greenTower.distanceToEnemyTarget).toBe(expected)
  })
})

describe('the red tower and the crystals', () => {
  test('the red towers ignore the crystals', () => {
    const redTower = instantiateRedTower() as TowerRed

    redTower.selectTarget([], [crystalNearer()])

    expect(redTower.enemyTarget).toBeNull()
  })
})

describe('update of the green tower', () => {
  test('when the target is a crystal, every update damages the crystal', () => {
    const crystal = crystalNear()
    greenTower.selectTarget([], [crystal])

    greenTower.update()

    expect(crystal.damage).toBe((TOWER_GREEN_UPGRADE.DAMAGE[0] * 100) / 500)
  })

  test('the damage is applied once per update', () => {
    const crystal = crystalNear()
    greenTower.selectTarget([], [crystal])

    greenTower.update()
    greenTower.update()
    greenTower.update()

    expect(crystal.damage).toBeCloseTo(
      (3 * TOWER_GREEN_UPGRADE.DAMAGE[0] * 100) / 500,
    )
  })

  test('when the target is an enemy, every update damages the enemy', () => {
    const enemy = createEnemyAt(20, 20)
    greenTower.selectTarget([enemy], [])
    const damageBefore = enemy.damage

    greenTower.update()

    expect(enemy.damage).toBeGreaterThan(damageBefore)
  })

  test('when there is no target, the update does not damage anything', () => {
    const crystal = crystalFar()
    greenTower.selectTarget([], [crystal])

    greenTower.update()

    expect(crystal.damage).toBe(0)
  })

  test('when the tower is upgrading, the update does not damage the target', () => {
    const crystal = crystalNear()
    greenTower.selectTarget([], [crystal])
    greenTower.upgrade()

    greenTower.update()

    expect(crystal.damage).toBe(0)
  })

  test('a crystal is destroyed after enough updates', () => {
    const crystal = crystalNear()
    greenTower.selectTarget([], [crystal])

    // 1 damage per update and 500 of health
    for (let i = 0; i < 501; i++) {
      greenTower.update()
    }

    expect(crystal.isDead).toBeTruthy()
  })
})
