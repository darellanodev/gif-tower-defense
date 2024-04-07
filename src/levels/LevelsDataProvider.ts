import { MapDataType } from '../utils/types'

export class LevelsDataProvider {
  #levels: MapDataType[]

  constructor(levels: MapDataType[]) {
    this.#levels = levels
  }

  getLevel(id: number): MapDataType | undefined {
    return this.#levels.find((level: MapDataType) => level.id == id)
  }
}
