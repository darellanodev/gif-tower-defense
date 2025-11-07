import * as fs from 'fs'

export class OldLevelConverterFiles {
  #getLinesFromFile(path: string): string[] {
    const result: string[] = []
    const resultFile = fs.readFileSync(path, 'utf8')
    resultFile.split('\n').forEach((line: string) => {
      if (line) {
        result.push(line)
      }
    })
    return result
  }

  get oldLevels(): string[] {
    return this.#getLinesFromFile('./src/levels/levelsData/oldLevels.txt')
  }

  get oldLevelsProcessed(): string[] {
    return this.#getLinesFromFile(
      './src/levels/levelsData/oldLevelsProcessed.txt',
    )
  }

  writeOldLevelsConverted(convertedLevels: string[]) {
    fs.writeFileSync(
      './src/levels/levelsData/oldLevelsConverted.json',
      convertedLevels.join('\n'),
    )
  }
  writeOldLevels(finalOldLevels: string[]) {
    fs.writeFileSync(
      './src/levels/levelsData/oldLevels.txt',
      finalOldLevels.join('\n'),
    )
  }
  writeOldLevelsProcessed(oldLevelsProcessed: string[]) {
    fs.writeFileSync(
      './src/levels/levelsData/oldLevelsProcessed.txt',
      oldLevelsProcessed.join('\n'),
    )
  }
}
