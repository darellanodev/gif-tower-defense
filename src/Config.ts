import { MODE } from './constants/mode'

export class Config {
  static gameMode = MODE.TESTING
  static availableTiles = [
    '0',
    '1',
    'x',
    'y',
    '2',
    's',
    'c',
    '5',
    '6',
    '7',
    'p',
    'q',
  ]
  static oldLevelsConverterLimit = 0 // set zero to process all
}
