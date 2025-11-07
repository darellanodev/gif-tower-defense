import * as OldLevelConverter from './utils/OldLevelConverter'
import { OldLevelConverterFiles } from './utils/OldLevelConverterFiles'
import * as fs from 'fs'
import { AllLevels } from './levels/levelsData/AllLevels'

function convertOldFormatLevels(limit: number) {
  const availableTiles = ['0', '1', 'x', 'y', '2']

  const oldLevelsConverterFiles = new OldLevelConverterFiles()

  const oldLevels = oldLevelsConverterFiles.oldLevels
  const oldLevelsProcessed = oldLevelsConverterFiles.oldLevelsProcessed

  const convertedLevels: string[] = []
  const finalOldLevels: string[] = []
  let totalProcessed = 0
  for (const oldLevel of oldLevels) {
    let finalOldLevel = oldLevel
    const oldLevelConverter = new OldLevelConverter.OldLevelConverter(oldLevel)
    if (!oldLevelConverter.canConvert(availableTiles)) {
      finalOldLevels.push(finalOldLevel)
      continue
    }
    if (oldLevelConverter.existsLevelId(AllLevels.data, oldLevel)) {
      finalOldLevels.push(finalOldLevel)
      continue
    }
    if (limit != 0 && totalProcessed >= limit) {
      finalOldLevels.push(finalOldLevel)
      continue
    }
    convertedLevels.push(oldLevelConverter.json)
    oldLevelsProcessed.push(finalOldLevel)
    totalProcessed++
  }
  fs.writeFileSync(
    './src/levels/levelsData/oldLevelsConverted.json',
    convertedLevels.join('\n'),
  )
  fs.writeFileSync(
    './src/levels/levelsData/oldLevels.txt',
    finalOldLevels.join('\n'),
  )
  fs.writeFileSync(
    './src/levels/levelsData/oldLevelsProcessed.txt',
    oldLevelsProcessed.join('\n'),
  )
  console.log(
    `The limit is set to ${limit}. Total levels processed: ${totalProcessed}`,
  )
}

// Configuration
const limit = 0 // set zero to process all

convertOldFormatLevels(limit)
