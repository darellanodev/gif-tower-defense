import { LevelsData } from '../levels/LevelsData'
import { LevelsDataProvider } from '../levels/LevelsDataProvider'
import { MiniMap } from '../MiniMap'
import { Images } from '../resources/Images'
import { Position } from '../types/position'
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

  createForLevelIds(
    levelsIds: number[],
    mode: number,
    position: Position,
  ): ButtonMiniMap[] {
    const stepX = 150

    const result = []
    let i = 0
    for (const levelId of levelsIds) {
      const levelMap = this.#levelsDataProvider.getById(levelId)

      result.push(
        new ButtonMiniMap(
          { x: position.x + i * stepX, y: position.y },
          Images.buttonMiniMapImages,
          new MiniMap(levelMap, mode),
        ),
      )
      i++
    }

    return result
  }
}
