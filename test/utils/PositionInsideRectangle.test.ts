import { expect } from 'vitest'
import { PositionInsideRectangle } from '../../src/utils/PositionInsideRectangle'
import { Position } from '../../src/types/position'
import { Size } from '../../src/types/size'

test('isPositionInsideRectangle, when position is inside a rectangle, return true', () => {
  const position: Position = { x: 100, y: 120 }
  const rectanglePosition: Position = { x: 90, y: 90 }
  const rectangleSize: Size = { w: 200, h: 200 }

  const positionInsideRectangle = new PositionInsideRectangle()

  const result = positionInsideRectangle.isPositionInsideRectangle(
    position,
    rectanglePosition,
    rectangleSize,
  )
  expect(result).toBeTruthy()
})
