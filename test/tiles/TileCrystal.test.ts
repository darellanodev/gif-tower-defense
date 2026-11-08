import { describe, expect } from 'vitest'
import { CRYSTAL } from '../../src/constants/crystal'
import { TileCrystal } from '../../src/levels/tiles/TileCrystal'

const createCrystal = () => new TileCrystal(null, { x: 100, y: 130 })

describe('isDead', () => {
  test('when the crystal is new, it is not dead', () => {
    expect(createCrystal().isDead).toBeFalsy()
  })

  test('when it receives half of the health in damage, it is not dead', () => {
    const crystal = createCrystal()

    crystal.addDamage(CRYSTAL.MAX_HEALTH / 2)

    expect(crystal.isDead).toBeFalsy()
  })

  test('when it receives all the health in damage, it is dead', () => {
    const crystal = createCrystal()

    crystal.addDamage(CRYSTAL.MAX_HEALTH)

    expect(crystal.isDead).toBeTruthy()
  })

  test('when it receives the damage in several shots, it is dead when the sum is the health', () => {
    const crystal = createCrystal()

    for (let shot = 0; shot < 100; shot++) {
      crystal.addDamage(5)
    }

    expect(crystal.isDead).toBeTruthy()
  })

  test('when it receives more damage than its health, it is still dead', () => {
    const crystal = createCrystal()

    crystal.addDamage(CRYSTAL.MAX_HEALTH * 10)

    expect(crystal.isDead).toBeTruthy()
  })
})

describe('damage', () => {
  test('when the crystal is new, the damage is 0', () => {
    expect(createCrystal().damage).toBe(0)
  })

  test('when it receives a quarter of the health in damage, the damage is 25', () => {
    const crystal = createCrystal()

    crystal.addDamage(CRYSTAL.MAX_HEALTH / 4)

    expect(crystal.damage).toBe(25)
  })

  test('the damage never goes over 100', () => {
    const crystal = createCrystal()

    crystal.addDamage(CRYSTAL.MAX_HEALTH * 3)

    expect(crystal.damage).toBe(100)
  })
})

describe('reward and score', () => {
  test('the reward is floor(500 / 5) - 25 = 75 (legacy game)', () => {
    expect(createCrystal().reward).toBe(75)
  })

  test('the score is the same than the reward (legacy game)', () => {
    const crystal = createCrystal()

    expect(crystal.score).toBe(crystal.reward)
  })
})

describe('position', () => {
  test('the crystal keeps the position of its tile', () => {
    expect(createCrystal().position).toStrictEqual({ x: 100, y: 130 })
  })
})
