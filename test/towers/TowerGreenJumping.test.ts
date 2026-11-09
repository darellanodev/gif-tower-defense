import { beforeEach, describe, expect } from 'vitest'
import { TowerGreen } from '../../src/towers/TowerGreen'
import { TowerRed } from '../../src/towers/TowerRed'
import { instantiateGreenTower, instantiateRedTower } from '../helpers/towers'
import { createEnemy } from '../helpers/jumpingEnemy'

// the laser can not shoot the enemies that are in the air, the missiles can (legacy game)
let greenTower: TowerGreen
let redTower: TowerRed

beforeEach(() => {
  greenTower = instantiateGreenTower() as TowerGreen
  redTower = instantiateRedTower() as TowerRed
})

describe('the green tower and the jumping enemies', () => {
  test('when the only enemy in the influence area is jumping, there is no target', () => {
    const jumpingEnemy = createEnemy()

    greenTower.selectTarget([jumpingEnemy])

    expect(greenTower.enemyTarget).toBeNull()
  })

  test('when the enemy is not jumping, it is the target', () => {
    const walkingEnemy = createEnemy([])

    greenTower.selectTarget([walkingEnemy])

    expect(greenTower.enemyTarget).toBe(walkingEnemy)
  })

  test('when there is a jumping enemy and a walking enemy, the walking one is the target', () => {
    const jumpingEnemy = createEnemy(undefined, { x: 15, y: 20 })
    const walkingEnemy = createEnemy([], { x: 60, y: 20 })

    greenTower.selectTarget([jumpingEnemy, walkingEnemy])

    expect(greenTower.enemyTarget).toBe(walkingEnemy)
  })

  test('the update does not damage a jumping enemy', () => {
    const jumpingEnemy = createEnemy()
    greenTower.selectTarget([jumpingEnemy])

    greenTower.update()

    expect(jumpingEnemy.damage).toBe(0)
  })
})

describe('the red tower and the jumping enemies', () => {
  test('the red tower can target a jumping enemy', () => {
    const jumpingEnemy = createEnemy()

    redTower.selectTarget([jumpingEnemy])

    expect(redTower.enemyTarget).toBe(jumpingEnemy)
  })
})
