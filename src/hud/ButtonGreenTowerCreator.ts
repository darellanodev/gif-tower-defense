import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { ButtonTower } from './ButtonTower'

export class ButtonGreenTowerCreator extends Button {
  static _initializeGreenTowerButton() {
    const position: Position = { x: 0, y: 28 }
    const size: Size = { w: 98, h: 50 }
    const offsetImages: Position = { x: 60, y: 10 }

    ButtonTower.greenTowerButton = new Button(
      position,
      size,
      ButtonTower.towerGreenButtonImages,
      offsetImages,
    )
  }
}
