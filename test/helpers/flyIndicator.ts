import { FLY_INDICATOR_MAX_TIME_ALIVE } from '../../src/constants/flyIndicator'
import { FlyIndicator } from '../../src/hud/FlyIndicator'
import { Position } from '../../src/types/position'

export const instantiateFlyIndicator = () => {
  const position: Position = { x: 100, y: 200 }
  const text: string = ''

  FlyIndicator.instances = []
  FlyIndicator.instantiateFlyIndicator(position, text)
}

export const updateMaxTimesPlusOne = () => {
  const updateTimes = FLY_INDICATOR_MAX_TIME_ALIVE + 1
  for (let i = 0; i < updateTimes; i++) {
    FlyIndicator.updateInstances()
  }
}
