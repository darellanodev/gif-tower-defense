import { MapDataType } from '../../../types/mapDataType'
import { TilesManager } from '../TilesManager'

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

  create(tilesManager: TilesManager) {
    let rowCount = 0
    this.levelMap!.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.processRow(tilesManager, trimmedRow, rowCount)
    })
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    //To implement in child classes
  }
}
