import { MapDataType } from '../../../types/mapDataType'

export class TileCreator {
  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30

  levelMap: MapDataType | null = null

  getPosX(column: number) {
    return TileCreator.FLOOR_SIZE * column
  }

  getPosY(row: number) {
    return TileCreator.FLOOR_SIZE * row + TileCreator.MARGIN_TOP
  }

  setLevelMap(levelMap: MapDataType) {
    this.levelMap = levelMap
  }
}
