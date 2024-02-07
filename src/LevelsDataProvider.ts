import { MapDataType } from './types'
import { Const } from './Const'

export class LevelsDataProvider {
  levels: MapDataType[]

  constructor(levels: MapDataType[]) {
    this.levels = levels
  }

  getLevel(id: number) {
    const levelData = this.levels.find((level: MapDataType) => level.id == id)

    const result = {
      rowsMap: levelData.rowsMap,
      startDirection: levelData.startDirection,
      endDirection: levelData.endDirection,
      money: levelData.money,
    }

    return result
  }
}
