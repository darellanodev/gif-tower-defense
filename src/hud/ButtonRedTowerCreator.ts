import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { ButtonTower } from './ButtonTower'
import { Images } from '../resources/Images'

export class ButtonRedTowerCreator extends Button {
  static _initializeRedTowerButton() {
    const position: Position = { x: 98, y: 28 }
    const size: Size = { w: 82, h: 50 }
    const offsetImages: Position = { x: 45, y: 10 }
    ButtonTower.redTowerButton = new Button(
      position,
      size,
      Images.towerRedButtonImages,
      offsetImages,
    )
  }
}
