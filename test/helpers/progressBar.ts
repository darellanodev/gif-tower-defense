import { ProgressBar } from '../../src/hud/ProgressBar'
import { Position, Size } from '../../src/utils/types'

export const instantiateProgressBar = () => {
  const position: Position = { x: 0, y: 0 }
  const size: Size = { w: 100, h: 10 }
  return new ProgressBar(position, size)
}
