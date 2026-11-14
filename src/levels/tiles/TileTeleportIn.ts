import { TilePath } from './TilePath'
import { drawTeleport } from './teleportDrawing'

// The enemies that arrive here are moved to the teleport out tile
export class TileTeleportIn extends TilePath {
  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    drawTeleport(
      this.position,
      [150, 60, 230],
      scale,
      startOffsetX,
      startOffsetY,
    )
  }
}
