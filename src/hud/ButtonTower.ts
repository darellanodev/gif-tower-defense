import { Image } from 'p5'
import { Button } from './Button'
import { Position, Size } from '../utils/types'
import { P5 } from '../utils/P5'

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
  drawCheckRectangle() {
    P5.p5.strokeWeight(3)
    P5.p5.stroke(255, 204, 0)
    P5.p5.noFill()
    P5.p5.square(
      this.position.x + this.offsetImages.x - 2,
      this.position.y + this.offsetImages.y - 2,
      36,
    )
  }

  drawActive(isActive: boolean) {
    if (isActive) {
      this.drawON()
    } else {
      this.drawOFF()
    }
    if (this.#isChecked) {
      this.drawCheckRectangle()
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
    const offsetImages: Position = { x: 45, y: 10 }
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
    const offsetImages: Position = { x: 47, y: 10 }
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

  static uncheckAllTowerButtons() {
    ButtonTower.greenTowerButton.uncheck()
    ButtonTower.redTowerButton.uncheck()
    ButtonTower.yellowTowerButton.uncheck()
  }

  static _initializeTowerButtons() {
    ButtonTower._initializeGreenTowerButton()
    ButtonTower._initializeRedTowerButton()
    ButtonTower._initializeYellowTowerButton()

    ButtonTower.uncheckAllTowerButtons()
    ButtonTower.greenTowerButton.check()
  }
}
