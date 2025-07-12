import { Image } from 'p5'
import { Button } from './Button'
import { ButtonGreenTowerCreator } from './ButtonGreenTowerCreator'
import { ButtonRedTowerCreator } from './ButtonRedTowerCreator'
import { ButtonYellowTowerCreator } from './ButtonYellowTowerCreator'

export class ButtonTower extends Button {
  static greenTowerButton: Button
  static redTowerButton: Button
  static yellowTowerButton: Button

  static towerGreenButtonImages: Image[]
  static towerRedButtonImages: Image[]
  static towerYellowButtonImages: Image[]

  static setImages(
    towerGreenButtonImages: Image[],
    towerRedButtonImages: Image[],
    towerYellowButtonImages: Image[],
  ) {
    ButtonTower.towerGreenButtonImages = towerGreenButtonImages
    ButtonTower.towerRedButtonImages = towerRedButtonImages
    ButtonTower.towerYellowButtonImages = towerYellowButtonImages
  }

  static initializeButtons() {
    ButtonTower._initializeTowerButtons()
  }

  static _initializeTowerButtons() {
    ButtonGreenTowerCreator._initializeGreenTowerButton()
    ButtonRedTowerCreator._initializeRedTowerButton()
    ButtonYellowTowerCreator._initializeYellowTowerButton()

    ButtonTower.greenTowerButton.check()
  }
}
