import { ConstGameMode } from './constants/ConstGameMode'

export class Config {
  static gameMode = ConstGameMode.TESTING
  //   static gameMode = ConstGameMode.NORMAL

  static availableTiles = ['0', '1', 'x', 'y', '2']
}
