import { Image } from 'p5'
import { Position, Size } from '../utils/types'
import { P5 } from '../utils/P5'

export class Button {
  static INDEX_IMAGE_ON = 0
  static INDEX_IMAGE_OFF = 1

  static magicUFOButtonImages: Image[]
  static magicFireballButtonImages: Image[]
  static magicIceballButtonImages: Image[]

  static magicFireballButton: Button
  static magicIceballButton: Button
  static magicUFOButton: Button

  position: Position
  size: Size
  images: Image[]
  offsetImages: Position
  constructor(
    position: Position,
    size: Size,
    images: Image[],
    offsetImages: Position = { x: 0, y: 0 },
  ) {
    this.position = { ...position }
    this.size = { ...size }
    this.images = images
    this.offsetImages = { ...offsetImages }
  }

  static setImages(
    magicUFOButtonImages: Image[],
    magicFireballButtonImages: Image[],
    magicIceballButtonImages: Image[],
  ) {
    Button.magicUFOButtonImages = magicUFOButtonImages
    Button.magicFireballButtonImages = magicFireballButtonImages
    Button.magicIceballButtonImages = magicIceballButtonImages
  }

  static _initializeMagicUFOButton() {
    const position: Position = { x: 498, y: 28 }
    const size: Size = { w: 118, h: 50 }
    const offsetImages: Position = { x: 44, y: 3 }
    Button.magicUFOButton = new Button(
      position,
      size,
      Button.magicUFOButtonImages,
      offsetImages,
    )
  }

  static _initializeMagicFireballButton() {
    const position: Position = { x: 616, y: 28 }
    const size: Size = { w: 78, h: 50 }
    const offsetImages: Position = { x: 20, y: 3 }
    Button.magicFireballButton = new Button(
      position,
      size,
      Button.magicFireballButtonImages,
      offsetImages,
    )
  }

  static _initializeMagicIceballButton() {
    const position: Position = { x: 692, y: 28 }
    const size: Size = { w: 103, h: 50 }
    const offsetImages: Position = { x: 33, y: 3 }
    Button.magicIceballButton = new Button(
      position,
      size,
      Button.magicIceballButtonImages,
      offsetImages,
    )
  }

  static _initializeMagicButtons() {
    Button._initializeMagicUFOButton()
    Button._initializeMagicFireballButton()
    Button._initializeMagicIceballButton()
  }

  static initializeButtons() {
    Button._initializeMagicButtons()
  }

  drawON() {
    P5.p5.image(
      this.images[Button.INDEX_IMAGE_ON],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }
  drawOFF() {
    P5.p5.image(
      this.images[Button.INDEX_IMAGE_OFF],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }

  isMouseOver(mousePosition: Position): boolean {
    let insideX = false
    let insideY = false
    if (
      mousePosition.x >= this.position.x &&
      mousePosition.x <= this.position.x + this.size.w
    ) {
      insideX = true
    }
    if (
      mousePosition.y >= this.position.y &&
      mousePosition.y <= this.position.y + this.size.h
    ) {
      insideY = true
    }
    if (insideX && insideY) {
      return true
    }
    return false
  }
}
