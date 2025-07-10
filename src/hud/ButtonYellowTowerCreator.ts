import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { ButtonTower } from './ButtonTower'

export class ButtonYellowTowerCreator extends Button {
  static _initializeYellowTowerButton() {
    const position: Position = { x: 180, y: 28 }
    const size: Size = { w: 83, h: 50 }
    const offsetImages: Position = { x: 47, y: 10 }
    ButtonTower.yellowTowerButton = new Button(
      position,
      size,
      ButtonTower.towerYellowButtonImages,
      offsetImages,
    )
  }
}
