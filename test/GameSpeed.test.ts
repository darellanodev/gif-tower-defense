import { describe, expect } from 'vitest'
import { GameSpeed } from '../src/GameSpeed'

describe('constructor', () => {
  test('when the speeds list is empty, throw an error', () => {
    expect(() => new GameSpeed([])).toThrow()
  })

  test('when a speed is lower than 1, throw an error', () => {
    expect(() => new GameSpeed([1, 0])).toThrow()
  })

  test('when a speed is not an integer, throw an error', () => {
    expect(() => new GameSpeed([1, 1.5])).toThrow()
  })
})

describe('updatesPerFrame', () => {
  test('when the game speed is just created, return the first speed', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])

    expect(gameSpeed.updatesPerFrame).toBe(1)
  })

  test('when changing to the next speed, return the second speed', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])

    gameSpeed.next()

    expect(gameSpeed.updatesPerFrame).toBe(2)
  })

  test('when changing to the next speed as many times as speeds there are, return the first speed again', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])

    gameSpeed.next()
    gameSpeed.next()
    gameSpeed.next()

    expect(gameSpeed.updatesPerFrame).toBe(1)
  })

  test('when there is only one speed, changing to the next speed keeps it', () => {
    const gameSpeed = new GameSpeed([3])

    gameSpeed.next()

    expect(gameSpeed.updatesPerFrame).toBe(3)
  })

  test('when reset after changing the speed, return the first speed', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])
    gameSpeed.next()
    gameSpeed.next()

    gameSpeed.reset()

    expect(gameSpeed.updatesPerFrame).toBe(1)
  })

  test('the default speeds start with the normal speed', () => {
    const gameSpeed = new GameSpeed()

    expect(gameSpeed.updatesPerFrame).toBe(1)
  })
})

describe('label', () => {
  test('when the speed is 1, return x1', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])

    expect(gameSpeed.label).toBe('x1')
  })

  test('when the speed is 4, return x4', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])
    gameSpeed.next()
    gameSpeed.next()

    expect(gameSpeed.label).toBe('x4')
  })
})

describe('runUpdates', () => {
  const countUpdates = (gameSpeed: GameSpeed, canContinue?: () => boolean) => {
    let count = 0
    const executed = gameSpeed.runUpdates(() => count++, canContinue)
    return { count, executed }
  }

  test('when the speed is 1, run one update', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])

    expect(countUpdates(gameSpeed).count).toBe(1)
  })

  test('when the speed is 4, run four updates', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])
    gameSpeed.next()
    gameSpeed.next()

    expect(countUpdates(gameSpeed).count).toBe(4)
  })

  test('return the number of updates executed', () => {
    const gameSpeed = new GameSpeed([1, 2, 4])
    gameSpeed.next()

    expect(countUpdates(gameSpeed).executed).toBe(2)
  })

  test('when the game can not continue after the second update, stop running updates', () => {
    const gameSpeed = new GameSpeed([4])
    let count = 0

    gameSpeed.runUpdates(
      () => count++,
      () => count < 2,
    )

    expect(count).toBe(2)
  })

  test('when the game can not continue from the beginning, the first update is still executed', () => {
    const gameSpeed = new GameSpeed([4])

    expect(countUpdates(gameSpeed, () => false).count).toBe(1)
  })

  test('the speed is applied to every frame', () => {
    const gameSpeed = new GameSpeed([2])
    let count = 0

    gameSpeed.runUpdates(() => count++)
    gameSpeed.runUpdates(() => count++)

    expect(count).toBe(4)
  })
})
