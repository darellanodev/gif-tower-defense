import { Image } from 'p5'
import { Button } from './Button'
import { ButtonMagicUFOCreator } from './ButtonMagicUFOCreator'
import { ButtonMagicFireballCreator } from './ButtonMagicFireballCreator'
import { ButtonMagicIceballCreator } from './ButtonMagicIceballCreator'

export class ButtonMagic extends Button {
  static magicUFOButtonImages: Image[]
  static magicFireballButtonImages: Image[]
  static magicIceballButtonImages: Image[]

  static magicFireballButton: Button
  static magicIceballButton: Button
  static magicUFOButton: Button

  static setImages(
    magicUFOButtonImages: Image[],
    magicFireballButtonImages: Image[],
    magicIceballButtonImages: Image[],
  ) {
    ButtonMagic.magicUFOButtonImages = magicUFOButtonImages
    ButtonMagic.magicFireballButtonImages = magicFireballButtonImages
    ButtonMagic.magicIceballButtonImages = magicIceballButtonImages
  }

  static _initializeMagicButtons() {
    ButtonMagicUFOCreator._initializeMagicUFOButton()
    ButtonMagicFireballCreator._initializeMagicFireballButton()
    ButtonMagicIceballCreator._initializeMagicIceballButton()
  }

  static initializeButtons() {
    ButtonMagic._initializeMagicButtons()
  }
}
