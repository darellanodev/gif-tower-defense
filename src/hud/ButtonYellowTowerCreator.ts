import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Images } from '../resources/Images'
import { HudButtonsTowers } from './HudButtonsTowers'

export class ButtonYellowTowerCreator extends Button {
  static _initializeYellowTowerButton() {
    const position: Position = { x: 180, y: 28 }
    const size: Size = { w: 83, h: 50 }
    const offsetImages: Position = { x: 47, y: 10 }
    HudButtonsTowers.yellowTowerButton = new Button(
      position,
      size,
      Images.towerYellowButtonImages,
      offsetImages,
    )
  }
}
