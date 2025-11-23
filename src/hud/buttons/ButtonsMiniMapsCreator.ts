import { LevelsDataProvider } from '../../levels/LevelsDataProvider'
import { MiniMap } from '../../menus/MiniMap'
import { Images } from '../../resources/Images'
import { Position } from '../../types/position'
import { ButtonMiniMap } from './ButtonMiniMap'

export class ButtonsMiniMapsCreator {
  static MINIMAPS_DISPLAYED_ROW = 5
  static STEP_X = 150
  static STEP_Y = 120

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
    const initialPositionX = position.x

    const result = []
    let row = 0
    let column = 0
    for (const levelId of levelsIds) {
      const levelMap = this.#levelsDataProvider.getById(levelId)

      result.push(
        new ButtonMiniMap(
          {
            x: position.x + column * ButtonsMiniMapsCreator.STEP_X,
            y: position.y + row * ButtonsMiniMapsCreator.STEP_Y,
          },
          Images.buttonMiniMapImages,
          new MiniMap(levelMap, mode),
        ),
      )
      column++
      if (
        column % ButtonsMiniMapsCreator.MINIMAPS_DISPLAYED_ROW === 0 &&
        isMultiRow
      ) {
        row++
        position.x = initialPositionX
        column = 0
      }
    }

    return result
  }
}
