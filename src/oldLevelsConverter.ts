import { OldLevelConverter } from './utils/OldLevelConverter'
import { OldLevelConverterFiles } from './utils/OldLevelConverterFiles'
import { AllLevels } from './levels/levelsData/AllLevels'
import { Config } from './Config'

function shouldSkipLevel(
  oldLevelConverter: OldLevelConverter,
  oldLevel: string,
  limit: number,
  totalProcessed: number,
) {
  return (
    !oldLevelConverter.canConvert(Config.availableTiles) ||
    oldLevelConverter.existsLevelId(AllLevels.data, oldLevel) ||
    (limit != 0 && totalProcessed >= limit)
  )
}

function convertOldFormatLevels(limit: number) {
  const oldLevelsConverterFiles = new OldLevelConverterFiles()

  const oldLevels = oldLevelsConverterFiles.oldLevels
  const oldLevelsProcessed = oldLevelsConverterFiles.oldLevelsProcessed

  const convertedLevels: string[] = []
  const finalOldLevels: string[] = []
  let totalProcessed = 0

  for (const oldLevel of oldLevels) {
    const oldLevelConverter = new OldLevelConverter(oldLevel)

    if (shouldSkipLevel(oldLevelConverter, oldLevel, limit, totalProcessed)) {
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
