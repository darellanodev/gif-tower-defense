import { PositionUtils } from '../../src/utils/PositionUtils'
import { Position } from '../../src/types/position'
import { Size } from '../../src/types/size'

test('isPositionInsideRectangle, when position is inside a rectangle, return true', () => {
  const position: Position = { x: 100, y: 120 }
  const rectanglePosition: Position = { x: 90, y: 90 }
  const rectangleSize: Size = { w: 200, h: 200 }

  const result = PositionUtils.isInsideRectangle(
    position,
    rectanglePosition,
    rectangleSize,
  )
  expect(result).toBeTruthy()
})

test('distance, given two positions, return the distance', () => {
  const position1: Position = { x: 100, y: 0 }
  const position2: Position = { x: 200, y: 0 }

  const result = PositionUtils.distance(position1, position2)
  expect(result).toBe(100)
})
