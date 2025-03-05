import * as OldLevelConverter from './utils/OldLevelConverter'
import * as fs from 'fs'
import { AllLevels } from './levels/levelsData/AllLevels'

function convertOldFormatLevels() {
  const availableTiles = ['0', '1', 'x', 'y', '2']

  const oldLevels: string[] = []
  const oldLevelsFile = fs.readFileSync(
    './src/levels/levelsData/oldLevels.txt',
    'utf8',
  )
  oldLevelsFile.split('\n').forEach((line: string) => {
    if (line) {
      oldLevels.push(line)
    }
  })

  const convertedLevels: string[] = []
  for (const oldLevel of oldLevels) {
    const oldLevelConverter = new OldLevelConverter.OldLevelConverter(oldLevel)
    if (!oldLevelConverter.canConvert(availableTiles)) {
      continue
    }
    if (oldLevelConverter.existsLevelId(AllLevels.data, oldLevel)) {
      continue
    }
    convertedLevels.push(oldLevelConverter.json)
  }
  fs.writeFileSync(
    './src/levels/levelsData/oldLevelsConverted.json',
    convertedLevels.join('\n'),
  )
}

convertOldFormatLevels()
