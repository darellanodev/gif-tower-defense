import { Image } from 'p5'
import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'
import { ButtonMagicUFOCreator } from './ButtonMagicUFOCreator'
import { ButtonMagicFireballCreator } from './ButtonMagicFireballCreator'

export class ButtonMagic extends Button {
  static magicUFOButtonImages: Image[]
  static magicFireballButtonImages: Image[]
  static magicIceballButtonImages: Image[]

  static magicFireballButton: ButtonMagic
  static magicIceballButton: ButtonMagic
  static magicUFOButton: ButtonMagic

  static magicTotalUFOItems: number = 3
  static magicTotalFireballItems: number = 2
  static magicTotalIceballItems: number = 2

  #items: number
  #offsetItems: Position

  constructor(
    position: Position,
    size: Size,
    images: Image[],
    offsetImages: Position,
    items: number,
    offsetItems: Position = { x: 0, y: 0 },
  ) {
    super(position, size, images, offsetImages)
    this.#items = items
    this.#offsetItems = offsetItems
  }

  removeItem() {
    this.#items--
  }

  get items() {
    return this.#items
  }

  draw() {
    if (this.#items > 0) {
      if (this.isMouseOver({ x: P5.p5.mouseX, y: P5.p5.mouseY })) {
        this.drawOnHover()
      } else {
        this.drawOn()
      }
    } else {
      this.drawOff()
    }
    P5.p5.text(
      this.#items,
      this.position.x + this.#offsetItems.x,
      this.position.y + this.#offsetItems.y,
    )
  }

  static setImages(
    magicUFOButtonImages: Image[],
    magicFireballButtonImages: Image[],
    magicIceballButtonImages: Image[],
  ) {
    ButtonMagic.magicUFOButtonImages = magicUFOButtonImages
    ButtonMagic.magicFireballButtonImages = magicFireballButtonImages
    ButtonMagic.magicIceballButtonImages = magicIceballButtonImages
  }

  static _initializeMagicIceballButton() {
    const position: Position = { x: 692, y: 28 }
    const size: Size = { w: 103, h: 50 }
    const offsetImages: Position = { x: 33, y: 3 }
    const offsetItems: Position = { x: 77, y: 47 }
    ButtonMagic.magicIceballButton = new ButtonMagic(
      position,
      size,
      ButtonMagic.magicIceballButtonImages,
      offsetImages,
      ButtonMagic.magicTotalIceballItems,
      offsetItems,
    )
  }

  static _initializeMagicButtons() {
    ButtonMagicUFOCreator._initializeMagicUFOButton()
    ButtonMagicFireballCreator._initializeMagicFireballButton()
    ButtonMagic._initializeMagicIceballButton()
  }

  static initializeButtons() {
    ButtonMagic._initializeMagicButtons()
  }
}
