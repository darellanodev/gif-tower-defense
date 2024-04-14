import { Image } from 'p5'
import { Button } from './Button'
import { Position, Size } from '../utils/types'

export class ButtonMagic extends Button {
  static magicUFOButtonImages: Image[]
  static magicFireballButtonImages: Image[]
  static magicIceballButtonImages: Image[]

  static magicFireballButton: Button
  static magicIceballButton: Button
  static magicUFOButton: Button

  #isTowered: boolean = false
  Tower() {
    this.#isTowered = true
  }
  unCheck() {
    this.#isTowered = false
  }
  get isChecked() {
    return this.#isTowered
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

  static _initializeMagicUFOButton() {
    const position: Position = { x: 498, y: 28 }
    const size: Size = { w: 118, h: 50 }
    const offsetImages: Position = { x: 44, y: 3 }
    ButtonMagic.magicUFOButton = new Button(
      position,
      size,
      ButtonMagic.magicUFOButtonImages,
      offsetImages,
    )
  }

  static _initializeMagicFireballButton() {
    const position: Position = { x: 616, y: 28 }
    const size: Size = { w: 78, h: 50 }
    const offsetImages: Position = { x: 20, y: 3 }
    ButtonMagic.magicFireballButton = new Button(
      position,
      size,
      ButtonMagic.magicFireballButtonImages,
      offsetImages,
    )
  }

  static _initializeMagicIceballButton() {
    const position: Position = { x: 692, y: 28 }
    const size: Size = { w: 103, h: 50 }
    const offsetImages: Position = { x: 33, y: 3 }
    ButtonMagic.magicIceballButton = new Button(
      position,
      size,
      ButtonMagic.magicIceballButtonImages,
      offsetImages,
    )
  }

  static _initializeMagicButtons() {
    ButtonMagic._initializeMagicUFOButton()
    ButtonMagic._initializeMagicFireballButton()
    ButtonMagic._initializeMagicIceballButton()
  }

  static initializeButtons() {
    ButtonMagic._initializeMagicButtons()
  }
}
