import { Position } from '../types/position'
import { ButtonPause } from './ButtonPause'

export class HudButtonsOthers {
  isInsidePauseButton(position: Position) {
    if (
      position.x > 268 &&
      position.x < 344 &&
      position.y > 28 &&
      position.y < 56
    ) {
      return true
    }
    return false
  }

  selectPause() {
    ButtonPause.instance.check()
  }

  unSelectPause() {
    ButtonPause.instance.uncheck()
  }

  draw() {
    ButtonPause.instance.draw()
  }

  handlePauseButton(mousePosition: Position) {
    if (ButtonPause.instance.isMouseOver(mousePosition)) {
      this.selectPause()
    }
  }
}
