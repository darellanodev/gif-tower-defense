import { MapDataType } from './types'

export class LevelsDataProvider {
  levels: MapDataType[]

  constructor(levels: MapDataType[]) {
    this.levels = levels
  }

  getLevel(id: number) {
    const levelData = this.levels.find((level: MapDataType) => level.id == id)

    let result =
      levelData.row01 +
      ',\n' +
      levelData.row02 +
      ',\n' +
      levelData.row03 +
      ',\n' +
      levelData.row04 +
      ',\n' +
      levelData.row05 +
      ',\n' +
      levelData.row06 +
      ',\n' +
      levelData.row07 +
      ',\n' +
      levelData.row08 +
      ',\n' +
      levelData.row09 +
      ',\n' +
      levelData.row10 +
      '@3,2,-50,450,150'

    return result
  }
}
