import { FlyIndicator } from '../src/hud/FlyIndicator'
import { Position } from '../src/utils/types'

const instantiateFlyIndicator = () => {
  const position: Position = { x: 100, y: 200 }
  const text: string = ''

  FlyIndicator.instances = []
  FlyIndicator.instantiateFlyIndicator(position, text)
}

const updateMaxTimesPlusOne = () => {
  const updateTimes = FlyIndicator.MAX_TIME_ALIVE + 1
  for (let i = 0; i < updateTimes; i++) {
    FlyIndicator.updateInstances()
  }
}

describe('isActive', () => {
  test('when FlyIndicator is recently created, return true', () => {
    instantiateFlyIndicator()

    const result = FlyIndicator.instances[0].alive

    expect(result).toBeTruthy()
  })
  test('when FlyIndicator is recently created and updated MAX_TIME_ALIVE + 1 times, return false', () => {
    instantiateFlyIndicator()
    updateMaxTimesPlusOne()

    const result = FlyIndicator.instances[0].alive
    expect(result).toBeFalsy()
  })
})

test('get position, when FlyIndicator is recently created and updated one time, position.y is < than initial position.y', () => {
  instantiateFlyIndicator()
  const initialPosition = FlyIndicator.instances[0].position
  FlyIndicator.updateInstances()

  const newPosition = FlyIndicator.instances[0].position

  const result = initialPosition.y > newPosition.y
  expect(result).toBeTruthy()
})

describe('', () => {
  test('FlyIndicator.instances.lenght, when we instantiate one FlyIndicator and is recently created and updated one time and removed dead instances, return 1', () => {
    instantiateFlyIndicator()
    FlyIndicator.updateInstances()
    FlyIndicator.removeDeadInstances()
    const result = FlyIndicator.instances.length
    expect(result).toBe(1)
  })

  test('FlyIndicator.instances.lenght, when we instantiate one FlyIndicator and is recently created and updated MAX_TIME_ALIVE + 1 times and removed dead instances, return 0', () => {
    instantiateFlyIndicator()
    updateMaxTimesPlusOne()
    FlyIndicator.removeDeadInstances()
    const result = FlyIndicator.instances.length
    expect(result).toBe(0)
  })
})
