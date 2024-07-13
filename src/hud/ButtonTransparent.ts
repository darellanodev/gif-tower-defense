import { Position } from '../types/position'
import { Size } from '../types/size'
import { Obj } from '../Obj'
import { PositionUtils } from '../utils/PositionUtils'

export class ButtonTransparent extends Obj {
  static INDEX_IMAGE_ON = 0
  static INDEX_IMAGE_OFF = 1
  static INDEX_IMAGE_HOVER = 2

  size: Size
  offsetImages: Position
  constructor(
    position: Position,
    size: Size,
    offsetImages: Position = { x: 0, y: 0 },
  ) {
    super(position)

    this.size = { ...size }
    this.offsetImages = { ...offsetImages }
  }

  isMouseOver(mousePosition: Position): boolean {
    return PositionUtils.isInsideRectangle(
      mousePosition,
      this.position,
      this.size,
    )
  }
}
