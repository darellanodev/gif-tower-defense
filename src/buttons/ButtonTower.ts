import { Image } from 'p5'
import { Button } from './Button'
import { Position, Size } from '../utils/types'

export class ButtonTower extends Button {
  static greenTowerButton: ButtonTower
  static redTowerButton: ButtonTower
  static yellowTowerButton: ButtonTower

  static towerGreenButtonImages: Image[]
  static towerRedButtonImages: Image[]
  static towerYellowButtonImages: Image[]

  #isChecked: boolean = false
  check() {
    this.#isChecked = true
  }
  uncheck() {
    this.#isChecked = false
  }
  get isChecked() {
    return this.#isChecked
  }

  drawActive(isActive: boolean) {
    if (isActive) {
      this.drawON()
    } else {
      this.drawOFF()
    }
  }

  static setImages(
    towerGreenButtonImages: Image[],
    towerRedButtonImages: Image[],
    towerYellowButtonImages: Image[],
  ) {
    ButtonTower.towerGreenButtonImages = towerGreenButtonImages
    ButtonTower.towerRedButtonImages = towerRedButtonImages
    ButtonTower.towerYellowButtonImages = towerYellowButtonImages
  }

  static _initializeGreenTowerButton() {
    const position: Position = { x: 0, y: 28 }
    const size: Size = { w: 98, h: 50 }
    const offsetImages: Position = { x: 60, y: 10 }

    ButtonTower.greenTowerButton = new ButtonTower(
      position,
      size,
      ButtonTower.towerGreenButtonImages,
      offsetImages,
    )
  }
  static _initializeRedTowerButton() {
    const position: Position = { x: 98, y: 28 }
    const size: Size = { w: 82, h: 50 }
    const offsetImages: Position = { x: 42, y: 10 }
    ButtonTower.redTowerButton = new ButtonTower(
      position,
      size,
      ButtonTower.towerRedButtonImages,
      offsetImages,
    )
  }
  static _initializeYellowTowerButton() {
    const position: Position = { x: 180, y: 28 }
    const size: Size = { w: 83, h: 50 }
    const offsetImages: Position = { x: 45, y: 10 }
    ButtonTower.yellowTowerButton = new ButtonTower(
      position,
      size,
      ButtonTower.towerYellowButtonImages,
      offsetImages,
    )
  }

  static initializeButtons() {
    ButtonTower._initializeTowerButtons()
  }

  static unTowerAllTowerButtons() {
    ButtonTower.greenTowerButton.uncheck()
    ButtonTower.redTowerButton.uncheck()
    ButtonTower.yellowTowerButton.uncheck()
  }

  static _initializeTowerButtons() {
    ButtonTower._initializeGreenTowerButton()
    ButtonTower._initializeRedTowerButton()
    ButtonTower._initializeYellowTowerButton()

    ButtonTower.unTowerAllTowerButtons()
    ButtonTower.greenTowerButton.check()
  }
}
