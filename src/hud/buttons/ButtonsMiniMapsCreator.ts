import { LevelsDataProvider } from '../../levels/LevelsDataProvider'
import { MiniMap } from '../../menus/MiniMap'
import { Images } from '../../resources/Images'
import { MapDataType } from '../../types/mapDataType'
import { Position } from '../../types/position'
import { ButtonMiniMap } from './ButtonMiniMap'

export class ButtonsMiniMapsCreator {
  static MINIMAPS_DISPLAYED_ROW = 5
  static STEP_X = 150
  static STEP_Y = 120

  static #instance: ButtonsMiniMapsCreator | null = null

  #levelsDataProvider: LevelsDataProvider
  #row: number = 0
  #column: number = 0

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

  #createMiniMap(position: Position, levelMap: MapDataType, mode: number) {
    return new ButtonMiniMap(
      this.getPosition(position, this.#column, this.#row),
      Images.buttonMiniMapImages,
      new MiniMap(levelMap, mode),
    )
  }

  #resetRowColumn() {
    this.#row = 0
    this.#column = 0
  }

  createOneRow(levelsIds: number[], mode: number, position: Position) {
    const result = []
    this.#resetRowColumn()
    for (const levelId of levelsIds) {
      const levelMap = this.#levelsDataProvider.getById(levelId)
      result.push(this.#createMiniMap(position, levelMap, mode))
      this.#column++
    }

    return result
  }

  createMultiRows(levelsIds: number[], mode: number, position: Position) {
    const initialPositionX = position.x

    const result = []
    this.#resetRowColumn()
    for (const levelId of levelsIds) {
      const levelMap = this.#levelsDataProvider.getById(levelId)

      result.push(this.#createMiniMap(position, levelMap, mode))
      this.#column++
      if (this.#column % ButtonsMiniMapsCreator.MINIMAPS_DISPLAYED_ROW === 0) {
        this.#row++
        position.x = initialPositionX
        this.#column = 0
      }
    }

    return result
  }

  getPosition(position: Position, column: number, row: number) {
    return {
      x: position.x + column * ButtonsMiniMapsCreator.STEP_X,
      y: position.y + row * ButtonsMiniMapsCreator.STEP_Y,
    }
  }
}
