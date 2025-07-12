import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Images } from '../resources/Images'
import { HudButtonsTowers } from './HudButtonsTowers'

export class ButtonRedTowerCreator extends Button {
  static _initializeRedTowerButton() {
    const position: Position = { x: 98, y: 28 }
    const size: Size = { w: 82, h: 50 }
    const offsetImages: Position = { x: 45, y: 10 }
    HudButtonsTowers.redTowerButton = new Button(
      position,
      size,
      Images.towerRedButtonImages,
      offsetImages,
    )
  }
}
