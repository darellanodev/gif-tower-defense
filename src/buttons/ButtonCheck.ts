import { Image } from 'p5'
import { Button } from './Button'
import { Position, Size } from '../utils/types'

export class ButtonCheck extends Button {
  static greenTowerButton: ButtonCheck
  static redTowerButton: ButtonCheck
  static yellowTowerButton: ButtonCheck

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
  static setImages(
    towerGreenButtonImages: Image[],
    towerRedButtonImages: Image[],
    towerYellowButtonImages: Image[],
  ) {
    ButtonCheck.towerGreenButtonImages = towerGreenButtonImages
    ButtonCheck.towerRedButtonImages = towerRedButtonImages
    ButtonCheck.towerYellowButtonImages = towerYellowButtonImages
  }

  static _initializeGreenTowerButton() {
    const position: Position = { x: 0, y: 28 }
    const size: Size = { w: 98, h: 50 }
    const offsetImages: Position = { x: 60, y: 10 }

    ButtonCheck.greenTowerButton = new ButtonCheck(
      position,
      size,
      ButtonCheck.towerGreenButtonImages,
      offsetImages,
    )
  }
  static _initializeRedTowerButton() {
    const position: Position = { x: 98, y: 28 }
    const size: Size = { w: 82, h: 50 }
    const offsetImages: Position = { x: 42, y: 10 }
    ButtonCheck.redTowerButton = new ButtonCheck(
      position,
      size,
      ButtonCheck.towerRedButtonImages,
      offsetImages,
    )
  }
  static _initializeYellowTowerButton() {
    const position: Position = { x: 180, y: 28 }
    const size: Size = { w: 83, h: 50 }
    const offsetImages: Position = { x: 45, y: 10 }
    ButtonCheck.yellowTowerButton = new ButtonCheck(
      position,
      size,
      ButtonCheck.towerYellowButtonImages,
      offsetImages,
    )
  }

  static initializeButtons() {
    ButtonCheck._initializeTowerButtons()
  }

  static uncheckAllTowerButtons() {
    ButtonCheck.greenTowerButton.uncheck()
    ButtonCheck.redTowerButton.uncheck()
    ButtonCheck.yellowTowerButton.uncheck()
  }

  static _initializeTowerButtons() {
    ButtonCheck._initializeGreenTowerButton()
    ButtonCheck._initializeRedTowerButton()
    ButtonCheck._initializeYellowTowerButton()

    ButtonCheck.uncheckAllTowerButtons()
    ButtonCheck.greenTowerButton.check()
  }
}
