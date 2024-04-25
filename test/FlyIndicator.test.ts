import { FlyIndicator } from '../src/hud/FlyIndicator'
import { Position } from '../src/utils/types'

const flyIndicatorText: string = ''

describe('isActive', () => {
  test('when FlyIndicator is recently created, return true', () => {
    const initialPosition: Position = { x: 100, y: 200 }

    const flyIndicator = new FlyIndicator(initialPosition, flyIndicatorText)

    const result = flyIndicator.isActive

    expect(result).toBeTruthy()
  })
  test('when FlyIndicator is recently created and updated MAX_TIME_ALIVE + 1 times, return false', () => {
    const initialPosition: Position = { x: 100, y: 200 }

    const flyIndicator = new FlyIndicator(initialPosition, flyIndicatorText)
    const updateTimes = FlyIndicator.MAX_TIME_ALIVE + 1
    for (let i = 0; i < updateTimes; i++) {
      flyIndicator.update()
    }

    const result = flyIndicator.isActive
    expect(result).toBeFalsy()
  })
})

test('get position, when FlyIndicator is recently created and updated one time, position.y is < than initial position.y', () => {
  const initialPosition: Position = { x: 100, y: 200 }

  const flyIndicator = new FlyIndicator(initialPosition, flyIndicatorText)
  flyIndicator.update()

  const position = flyIndicator.position

  const result = position.y < initialPosition.y
  expect(result).toBeTruthy()
})
