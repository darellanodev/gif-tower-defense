import { MapDataType } from '../types/mapDataType'

export class LevelsDataProvider {
  #levels: MapDataType[] = []

  static #instance: LevelsDataProvider | null = null

  constructor() {
    if (LevelsDataProvider.#instance !== null) {
      throw new Error(
        'LevelsDataProvider is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    LevelsDataProvider.#instance = this
  }

  static getInstance() {
    if (LevelsDataProvider.#instance === null) {
      LevelsDataProvider.#instance = new LevelsDataProvider()
    }
    return LevelsDataProvider.#instance
  }

  initLevels(levels: MapDataType[]) {
    this.#levels = levels
  }

  getLevel(id: number): MapDataType {
    const result = this.#levels.find((level: MapDataType) => level.id == id)
    if (result === undefined) {
      throw new Error('level is undefined')
    }
    return result
  }
}
