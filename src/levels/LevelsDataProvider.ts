import { MapDataType } from '../types/mapDataType'

export class LevelsDataProvider {
  #levels: MapDataType[]

  constructor(levels: MapDataType[]) {
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
