import { Image } from 'p5'
import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'
import { ButtonGreenTowerCreator } from './ButtonGreenTowerCreator'

export class ButtonTower extends Button {
  static greenTowerButton: ButtonTower
  static redTowerButton: ButtonTower
  static yellowTowerButton: ButtonTower

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

  set on(isOn: boolean) {
    this.#isOn = isOn
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
    ButtonGreenTowerCreator._initializeGreenTowerButton()
    ButtonTower._initializeRedTowerButton()
    ButtonTower._initializeYellowTowerButton()

    ButtonTower.uncheckAllTowerButtons()
    ButtonTower.greenTowerButton.check()
  }
}
