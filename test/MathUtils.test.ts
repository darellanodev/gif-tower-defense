import { MathUtils } from '../src/utils/MathUtils'
import { Position, Size } from '../src/utils/types'

describe('range', () => {
  test('when arguments are 1 and 5, return [1, 2, 3, 4, 5]', () => {
    const expected = [1, 2, 3, 4, 5]
    const from = 1
    const to = 5

    const result = MathUtils.range(from, to)

    expect(result).toStrictEqual(expected)
  })
  test('when arguments are 0 and 5, return [0, 1, 2, 3, 4, 5]', () => {
    const expected = [0, 1, 2, 3, 4, 5]
    const from = 0
    const to = 5
    const result = MathUtils.range(from, to)

    expect(result).toStrictEqual(expected)
  })
})

test('isPositionInsideRectangle, when position is inside a rectangle, return true', () => {
  const position: Position = { x: 100, y: 120 }
  const rectanglePosition: Position = { x: 90, y: 90 }
  const rectangleSize: Size = { w: 200, h: 200 }

  const result = MathUtils.isPositionInsideRectangle(
    position,
    rectanglePosition,
    rectangleSize,
  )
  expect(result).toBeTruthy()
})
