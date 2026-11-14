import { TILE_SIZE } from '../../constants/tile'
import { Position } from '../../types/position'
import { P5 } from '../../utils/P5'

// There are no images for the teleports yet: they are drawn with circles
export const drawTeleport = (
  position: Position,
  color: readonly [number, number, number],
  scale: number,
  startOffsetX: number,
  startOffsetY: number,
) => {
  const p5 = P5.p5
  const size = TILE_SIZE / scale
  const centerX = position.x / scale + startOffsetX + size / 2
  const centerY = position.y / scale + startOffsetY + size / 2

  p5.push()
  p5.noStroke()
  const rings = 4
  for (let ring = 0; ring < rings; ring++) {
    p5.fill(color[0], color[1], color[2], 70 + ring * 45)
    const ringSize = size * 0.9 * (1 - ring / rings)
    p5.ellipse(centerX, centerY, ringSize, ringSize)
  }
  p5.pop()
}
