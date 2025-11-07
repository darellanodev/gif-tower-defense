import { OldLevelConverter } from './utils/OldLevelConverter'
import { OldLevelConverterFiles } from './utils/OldLevelConverterFiles'
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
    const oldLevelConverter = new OldLevelConverter(oldLevel)

    if (!oldLevelConverter.canConvert(availableTiles)) {
      finalOldLevels.push(oldLevel)
      continue
    }
    if (oldLevelConverter.existsLevelId(AllLevels.data, oldLevel)) {
      finalOldLevels.push(oldLevel)
      continue
    }
    if (limit != 0 && totalProcessed >= limit) {
      finalOldLevels.push(oldLevel)
      continue
    }

    convertedLevels.push(oldLevelConverter.json)
    oldLevelsProcessed.push(oldLevel)

    totalProcessed++
  }
  oldLevelsConverterFiles.writeOldLevelsConverted(convertedLevels)
  oldLevelsConverterFiles.writeOldLevels(finalOldLevels)
  oldLevelsConverterFiles.writeOldLevelsProcessed(oldLevelsProcessed)

  console.log(
    `The limit is set to ${limit}. Total levels processed: ${totalProcessed}`,
  )
}

// Configuration
const limit = 0 // set zero to process all

convertOldFormatLevels(limit)
