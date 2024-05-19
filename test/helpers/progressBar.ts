import { ProgressBar } from '../../src/hud/ProgressBar'
import { Position } from '../../src/types/position'
import { Size } from '../../src/types/size'

export const instantiateProgressBar = () => {
  const position: Position = { x: 0, y: 0 }
  const size: Size = { w: 100, h: 10 }
  return new ProgressBar(position, size)
}
