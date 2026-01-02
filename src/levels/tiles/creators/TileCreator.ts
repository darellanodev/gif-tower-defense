import { TILE_CREATION_MARGIN_TOP, TILE_SIZE } from '../../../constants/tile'
import { MapDataType } from '../../../types/mapDataType'
import { TilesManager } from '../TilesManager'

export class TileCreator {
  levelMap: MapDataType | null = null

  getPosX(column: number) {
    return TILE_SIZE * column
  }

  getPosY(row: number) {
    return TILE_SIZE * row + TILE_CREATION_MARGIN_TOP
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
