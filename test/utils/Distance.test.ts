import { expect } from 'vitest'
import { Position } from '../../src/types/position'
import { Distance } from '../../src/utils/Distance'

test('distance, given two positions, return the distance', () => {
  const position1: Position = { x: 100, y: 0 }
  const position2: Position = { x: 200, y: 0 }

  const distance = new Distance()

  const result = distance.calculate(position1, position2)
  expect(result).toBe(100)
})
