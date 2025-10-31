import { LevelsDataProvider } from '../../levels/LevelsDataProvider'
import { MiniMap } from '../../MiniMap'
import { Images } from '../../resources/Images'
import { Position } from '../../types/position'
import { ButtonMiniMap } from './ButtonMiniMap'

export class ButtonsMiniMapsCreator {
  static #instance: ButtonsMiniMapsCreator | null = null

  #levelsDataProvider: LevelsDataProvider

  constructor(levelsDataProvider: LevelsDataProvider) {
    if (ButtonsMiniMapsCreator.#instance !== null) {
      throw new Error(
        'ButtonsMiniMapsCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#levelsDataProvider = levelsDataProvider

    // assign the singleton instance
    ButtonsMiniMapsCreator.#instance = this
  }
  static getInstance(levelsDataProvider: LevelsDataProvider) {
    if (ButtonsMiniMapsCreator.#instance === null) {
      ButtonsMiniMapsCreator.#instance = new ButtonsMiniMapsCreator(
        levelsDataProvider,
      )
    }
    return ButtonsMiniMapsCreator.#instance
  }

  createOneRow(levelsIds: number[], mode: number, position: Position) {
    return this.#create(levelsIds, mode, position, false)
  }

  createMultiRows(levelsIds: number[], mode: number, position: Position) {
    return this.#create(levelsIds, mode, position, true)
  }

  #create(
    levelsIds: number[],
    mode: number,
    position: Position,
    isMultiRow: boolean,
  ): ButtonMiniMap[] {
    const stepX = 150
    const stepY = 120
    const initialPositionX = position.x

    const result = []
    let row = 0
    let column = 0
    for (const levelId of levelsIds) {
      const levelMap = this.#levelsDataProvider.getById(levelId)

      result.push(
        new ButtonMiniMap(
          { x: position.x + column * stepX, y: position.y + row * stepY },
          Images.buttonMiniMapImages,
          new MiniMap(levelMap, mode),
        ),
      )
      column++
      if (column % 5 === 0 && isMultiRow) {
        row++
        position.x = initialPositionX
        column = 0
      }
    }

    return result
  }
}
