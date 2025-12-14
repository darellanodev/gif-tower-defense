import { AllLevels } from './levels/levelsData/AllLevels'
import { MapDataType } from './types/mapDataType'
import { SorterLevels } from './utils/SorterLevels'
import * as fs from 'fs'

function getHeaderCode() {
  return `
  import { MapDataType } from '../../types/mapDataType'
  import { DIRECTION } from '../../constants/direction'

  // cSpell:disable

  export class AllLevels {
    static data: MapDataType[] = `
}

function getFooterCode() {
  return `

  // cSpell:enable
  `
}

function sortLevels(levels: MapDataType[]) {
  const sorterLevels = new SorterLevels(levels)
  const sortedLevels = sorterLevels.sort()

  let result: string[] = []
  for (const level of sortedLevels) {
    result.push(`
      {
        id: ${level.id},
        title: '${level.title}',
        author: '${level.author}',
        comments: '${level.comments}',
        rowsMap: [
          '${level.rowsMap[0]}',
          '${level.rowsMap[1]}',
          '${level.rowsMap[2]}',
          '${level.rowsMap[3]}',
          '${level.rowsMap[4]}',
          '${level.rowsMap[5]}',
          '${level.rowsMap[6]}',
          '${level.rowsMap[7]}',
          '${level.rowsMap[8]}',
          '${level.rowsMap[9]}',
        ],
        money: ${level.money},
        startDirection: ${level.startDirection},
        endDirection: ${level.endDirection},
      },`)
  }

  fs.writeFileSync(
    './src/levels/levelsData/AllLevelsSorted.ts',
    `${getHeaderCode()}[${result.join('')}]${getFooterCode()}`,
  )
}

sortLevels(AllLevels.data)
