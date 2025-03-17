import { MapDataType } from '../types/mapDataType'
export class SorterLevels {
  #levels: MapDataType[]
  constructor(levels: MapDataType[]) {
    this.#levels = levels
  }
  sort(): MapDataType[] {
    return this.#levels.sort((a, b) => a.id - b.id)
  }
}
