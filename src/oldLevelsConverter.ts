import { OldLevelConverter } from './utils/OldLevelConverter'
import { OldLevelConverterFiles } from './utils/OldLevelConverterFiles'

function convertOldFormatLevels(limit: number) {
  const oldLevelsConverterFiles = new OldLevelConverterFiles()

  const oldLevels = oldLevelsConverterFiles.oldLevels
  const oldLevelsProcessed = oldLevelsConverterFiles.oldLevelsProcessed

  const convertedLevels: string[] = []
  const finalOldLevels: string[] = []
  let totalProcessed = 0

  for (const oldLevel of oldLevels) {
    const oldLevelConverter = new OldLevelConverter(oldLevel)

    if (oldLevelConverter.shouldSkipLevel(limit, totalProcessed)) {
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
