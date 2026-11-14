import { TilePath } from './TilePath'
import { drawTeleport } from './teleportDrawing'

// The enemies that go through the teleport in tile appear here. For the rest it is a normal path tile
export class TileTeleportOut extends TilePath {
  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    drawTeleport(
      this.position,
      [255, 150, 20],
      scale,
      startOffsetX,
      startOffsetY,
    )
  }
}
