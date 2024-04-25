import { FlyIndicator } from '../src/hud/FlyIndicator'
import { Position } from '../src/utils/types'

const instantiateFlyIndicator = () => {
  const position: Position = { x: 100, y: 200 }
  const text: string = ''

  FlyIndicator.instances = []
  FlyIndicator.instantiateFlyIndicator(position, text)
}

describe('isActive', () => {
  test('when FlyIndicator is recently created, return true', () => {
    instantiateFlyIndicator()

    const result = FlyIndicator.instances[0].isActive

    expect(result).toBeTruthy()
  })
  test('when FlyIndicator is recently created and updated MAX_TIME_ALIVE + 1 times, return false', () => {
    instantiateFlyIndicator()
    const updateTimes = FlyIndicator.MAX_TIME_ALIVE + 1
    for (let i = 0; i < updateTimes; i++) {
      FlyIndicator.instances[0].update()
    }

    const result = FlyIndicator.instances[0].isActive
    expect(result).toBeFalsy()
  })
})

test('get position, when FlyIndicator is recently created and updated one time, position.y is < than initial position.y', () => {
  instantiateFlyIndicator()
  const initialPosition = FlyIndicator.instances[0].position
  FlyIndicator.instances[0].update()

  const newPosition = FlyIndicator.instances[0].position

  const result = initialPosition.y > newPosition.y
  expect(result).toBeTruthy()
})
