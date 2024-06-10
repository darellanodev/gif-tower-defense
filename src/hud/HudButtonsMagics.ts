import { Position } from '../types/position'
import { Image } from 'p5'
import { MagicFireball } from '../magics/MagicFireball'
import { MagicIceball } from '../magics/MagicIceball'
import { MagicUFO } from '../magics/MagicUFO'
import { ButtonMagic } from './ButtonMagic'
import { PositionUtils } from '../utils/PositionUtils'
import { PathMovement } from '../path/PathMovement'
import { MagicCollisionChecker } from '../magics/MagicCollisionChecker'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicFireballCreator } from '../magics/MagicFireballCreator'
import { MagicFireballInstancesManager } from '../magics/MagicFireballInstancesManager'
import { MagicIceballCreator } from '../magics/MagicIceballCreator'
import { MagicIceballInstancesManager } from '../magics/MagicIceballInstancesManager'
import { MagicUFOInstancesManager } from '../magics/MagicUFOInstancesManager'
import { MagicUFOCreator } from '../magics/MagicUFOCreator'

export class HudButtonsMagics {
  #magicUFOButtonImages: Image[]
  #magicFireballButtonImages: Image[]
  #magicIceballButtonImages: Image[]

  constructor(
    magicUFOButtonImages: Image[],
    magicFireballButtonImages: Image[],
    magicIceballButtonImages: Image[],
  ) {
    this.#magicUFOButtonImages = magicUFOButtonImages
    this.#magicFireballButtonImages = magicFireballButtonImages
    this.#magicIceballButtonImages = magicIceballButtonImages
  }

  #isInsideButtonsBar(position: Position) {
    const ButtonsBarRectanglePosition = { x: 0, y: 28 }
    const ButtonsBarRectangleSize = { w: 800, h: 50 }

    return PositionUtils.isInsideRectangle(
      position,
      ButtonsBarRectanglePosition,
      ButtonsBarRectangleSize,
    )
  }

  isInsideMagicsButtonsBar(position: Position) {
    if (this.#isInsideButtonsBar(position) && position.x > 495) {
      return true
    }
    return false
  }

  draw() {
    ButtonMagic.magicUFOButton.draw()
    ButtonMagic.magicFireballButton.draw()
    ButtonMagic.magicIceballButton.draw()
  }

  _instantiateMagicFireball(
    magicFireballImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    magicFireballInstancesManager: MagicFireballInstancesManager,
  ) {
    if (ButtonMagic.magicFireballButton.items === 0) {
      return
    }
    const pathMovement = new PathMovement(
      initialEnemiesPosition,
      orders,
      MagicFireball.SPEED,
    )
    ButtonMagic.magicFireballButton.removeItem()

    const magicCollisionChecker = new MagicCollisionChecker()

    const magicFireballCreator = new MagicFireballCreator(
      magicFireballInstancesManager,
      magicFireballImage,
      pathMovement,
      magicCollisionChecker,
    )
    magicFireballCreator.create()
  }

  _instantiateMagicIceBall(
    magicIceballImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    magicIceballInstancesManager: MagicIceballInstancesManager,
  ) {
    if (ButtonMagic.magicIceballButton.items === 0) {
      return
    }
    const pathMovement = new PathMovement(
      initialEnemiesPosition,
      orders,
      MagicIceball.SPEED,
    )
    ButtonMagic.magicIceballButton.removeItem()

    const magicCollisionChecker = new MagicCollisionChecker()

    const magicIceballCreator = new MagicIceballCreator(
      magicIceballInstancesManager,
      magicIceballImage,
      pathMovement,
      magicCollisionChecker,
    )
    magicIceballCreator.create()
  }

  _instantiateMagicUFO(
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    magicUFOInstancesManager: MagicUFOInstancesManager,
  ) {
    if (ButtonMagic.magicUFOButton.items === 0) {
      return
    }
    ButtonMagic.magicUFOButton.removeItem()

    const magicUFOCreator = new MagicUFOCreator(
      magicUFOImages,
      initialEnemiesPosition,
      magicUFOInstancesManager,
    )

    magicUFOCreator.create()
  }

  handleMagicButtons(
    mousePosition: Position,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    orders: number[],
    enemyInstancesManager: EnemyInstancesManager,
    magicFireballInstancesManager: MagicFireballInstancesManager,
    magicIceballInstancesManager: MagicIceballInstancesManager,
    magicUFOInstancesManager: MagicUFOInstancesManager,
  ) {
    if (ButtonMagic.magicFireballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicFireball(
        magicFireballImage,
        initialEnemiesPosition,
        orders,
        magicFireballInstancesManager,
      )
    }
    if (ButtonMagic.magicIceballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicIceBall(
        magicIceballImage,
        initialEnemiesPosition,
        orders,
        magicIceballInstancesManager,
      )
    }
    if (ButtonMagic.magicUFOButton.isMouseOver(mousePosition)) {
      this._instantiateMagicUFO(
        magicUFOImages,
        initialEnemiesPosition,
        magicUFOInstancesManager,
      )
    }
  }
}
