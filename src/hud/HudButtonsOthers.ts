import { Position } from '../types/position'
import { ButtonPause } from './ButtonPause'

export class HudButtonsOthers {
  isInsidePauseButton(position: Position) {
    if (position.x > 150 && position.x < 265) {
      return true
    }
    return false
  }

  selectPause() {
    ButtonPause.instance.check()
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
