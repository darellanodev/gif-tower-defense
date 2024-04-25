import { FlyIndicator } from '../src/hud/FlyIndicator'
import { Position } from '../src/utils/types'

describe('isActive', () => {
  test('when FlyIndicator is recently created, return true', () => {
    const initialPosition: Position = { x: 100, y: 200 }

    const flyIndicator = new FlyIndicator(initialPosition)

    const result = flyIndicator.isActive

    expect(result).toBeTruthy()
  })
  test('when FlyIndicator is recently created and updated MAX_TIME_ALIVE + 1 times, return false', () => {
    const initialPosition: Position = { x: 100, y: 200 }

    const flyIndicator = new FlyIndicator(initialPosition)
    const updateTimes = FlyIndicator.MAX_TIME_ALIVE + 1
    for (let i = 0; i < updateTimes; i++) {
      flyIndicator.update()
    }

    const result = flyIndicator.isActive
    expect(result).toBeFalsy()
  })
})
