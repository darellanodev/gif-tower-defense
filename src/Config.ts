import { ConstGameMode } from './constants/ConstGameMode'

export class Config {
  static gameMode = ConstGameMode.TESTING
  static availableTiles = ['0', '1', 'x', 'y', '2']
  static oldLevelsConverterLimit = 0 // set zero to process all
}
