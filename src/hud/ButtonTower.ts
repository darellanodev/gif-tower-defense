import { Image } from 'p5'
import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'
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

  static INDEX_IMAGE_OFF_HOVER = 3

  #isChecked: boolean = false
  #isOn: boolean = false

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

  drawOffHover() {
    P5.p5.image(
      this.images[ButtonTower.INDEX_IMAGE_OFF_HOVER],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }

  get isMouseInsideAndNotChecked(): boolean {
    return (
      this.isMouseOver({ x: P5.p5.mouseX, y: P5.p5.mouseY }) && !this.#isChecked
    )
  }

  #drawOn() {
    if (this.isMouseInsideAndNotChecked) {
      this.drawOnHover()
    } else {
      this.drawOn()
    }
  }
  #drawOff() {
    if (this.isMouseInsideAndNotChecked) {
      this.drawOffHover()
    } else {
      this.drawOff()
    }
  }

  draw() {
    if (this.#isOn) {
      this.#drawOn()
    } else {
      this.#drawOff()
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

  static initializeButtons() {
    ButtonTower._initializeTowerButtons()
  }

  static uncheckAllTowerButtons() {
    ButtonTower.greenTowerButton.uncheck()
    ButtonTower.redTowerButton.uncheck()
    ButtonTower.yellowTowerButton.uncheck()
  }

  static _initializeTowerButtons() {
    ButtonGreenTowerCreator._initializeGreenTowerButton()
    ButtonRedTowerCreator._initializeRedTowerButton()
    ButtonYellowTowerCreator._initializeYellowTowerButton()

    ButtonTower.uncheckAllTowerButtons()
    ButtonTower.greenTowerButton.check()
  }
}
