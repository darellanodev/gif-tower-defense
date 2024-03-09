import { MapDataType } from './types'

export class LevelsDataProvider {
  #levels: MapDataType[]

  constructor(levels: MapDataType[]) {
    this.#levels = levels
  }

  getLevel(id: number): MapDataType {
    return this.#levels.find((level: MapDataType) => level.id == id)
  }
}
