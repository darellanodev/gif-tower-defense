import { LevelsData } from '../levels/LevelsData'
import { LevelsDataProvider } from '../levels/LevelsDataProvider'
import { MiniMap } from '../MiniMap'
import { Images } from '../resources/Images'
import { Position } from '../types/position'
import { ButtonMiniMap } from './ButtonMiniMap'

export class ButtonsMiniMapsCreator {
  static #instance: ButtonsMiniMapsCreator | null = null

  constructor() {
    if (ButtonsMiniMapsCreator.#instance !== null) {
      throw new Error(
        'ButtonsMiniMapsCreator is a singleton class, use getInstance to get the instance',
      )
    }
    // assign the singleton instance
    ButtonsMiniMapsCreator.#instance = this
  }
  static getInstance() {
    if (ButtonsMiniMapsCreator.#instance === null) {
      ButtonsMiniMapsCreator.#instance = new ButtonsMiniMapsCreator()
    }
    return ButtonsMiniMapsCreator.#instance
  }

  createForLevelIds(
    levelsIds: number[],
    mode: number,
    position: Position,
  ): ButtonMiniMap[] {
    const stepX = 150

    const levelDataProvider = new LevelsDataProvider(LevelsData.data)

    const result = []
    let i = 0
    for (const levelId of levelsIds) {
      const levelMap = levelDataProvider.getLevel(levelId)
      if (levelMap === undefined) {
        throw new Error(`Level with id ${levelId} is undefined`)
      }

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
