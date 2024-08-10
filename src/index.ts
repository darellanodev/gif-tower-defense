import p5 from 'p5'
import { Const } from './constants/Const'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'
import { Game } from './Game'
import { StateManager } from './StateManager'
import { MenuMain } from './MenuMain'
import { MenuSurvival } from './MenuSurvival'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { LevelsData } from './levels/LevelsData'
import { ButtonsMiniMapsCreator } from './hud/ButtonsMiniMapsCreator'
import { OldLevelConverter } from './utils/OldLevelConverter'
import { NewsDataProvider } from './news/NewsDataProvider'
import { NewsData } from './news/NewsData'

let _p5: p5
let game: Game
let menuMain: MenuMain
let menuSurvival: MenuSurvival
let stateManager: StateManager
let levelsDataProvider: LevelsDataProvider
let buttonsMiniMapsCreator: ButtonsMiniMapsCreator
let newsDataProvider: NewsDataProvider

// ugly hack: remove the extra canvas created
window.addEventListener('load', () => {
  const defaultCanvas1 = document.getElementById('defaultCanvas1')
  if (defaultCanvas1) {
    defaultCanvas1.remove()
  }
})

declare global {
  interface Window {
    setup: () => void
    draw: () => void
    preload: () => void
    keyPressed: () => void
    mouseClicked: () => void
  }
}

window.preload = () => {
  _p5 = new p5((p: p5) => {})
  P5.init(_p5)
  Images.loadAll()
}

function disableContextualMenu() {
  for (let element of <any>document.getElementsByClassName('p5Canvas')) {
    element.addEventListener('contextmenu', (e: any) => {
      e.preventDefault()
      window.mouseClicked()
    })
  }
}

// this function is here temporarily to help converting old format levels into their new format.
function convertOldFormatLevels() {
  const availableTiles = ['0', '1', 'x', 'y']
  const oldLevels = [
    `(8,'cross','ocliboy','000y000000000000,0001000000000000,0001022011111100,0001022010000100,0001000010220100,0001111110220100,0000000000000100,0000002201111100,0000002201000000,000000000x000000@4,4,150,0,150',1296995313,'127.0.0.1',0,217,2),`,
    `(9,'animal','ocliboy','0000000000000000,0000000000000000,y11111100111111x,0000001001000000,0111111001111110,0100000000000010,0100111111110010,0100100000010010,0111100000011110,0000000000000000@2,2,0,100,150',1296995501,'127.0.0.1',0,290,8),`,
    `(10,'happy','ocliboy','0000000000000000,011111111111111x,0100000000000000,0100022000022000,0100022000022000,0100000000000000,0102200000000220,0100020000002000,0100002222220000,0y00000000000000@2,3,50,450,150',1296995678,'127.0.0.1',0,242,3),`,
    `(11,'walls','ocliboy','0000000000000000,0111101110222220,0122101010222220,0122101010000000,0122111010111110,0122000010100010,0122000010101110,0111100010101000,000010001110111y,0000x00000000000@4,1,750,400,150',1296996417,'127.0.0.1',0,261,4),`,
    `(12,'question','ocliboy','0000000000000000,x111111111111110,0000002222220010,0111020000002010,0101000022220010,0101000020000010,0101000000000010,0101000020000010,0101111111111110,0y00000000000000@1,3,50,450,150',1297020179,'127.0.0.1',0,288,3),`,
    `(15,'psycho','ocliboy','000y000011100000,0011000110110000,0110001100011000,0100011000001000,0100010000111000,0100010000100000,0110110111111110,0010100100100010,0011100110111110,00000000x0000000@4,4,150,0,150',1297021259,'127.0.0.1',0,152,3),`,
    `(16,'threeloops','ocliboy','0000000000000000,0111111000111000,0102201101101000,0111111111111200,0002221222122200,0002111112110000,0001121010011000,2211021110001122,2110022000000112,2y000000000000x2@4,3,50,450,150',1297021477,'127.0.0.1',0,98,2),`,
    `(22,'irreal','ocliboy','111111011101110x,0111111121112111,1111012101210101,1101110121012121,1111112101210101,0111110111011121,1112011101110111,1010201020102012,1112021101110111,y101111111112111@2,2,0,450,150',1297772379,'83.56.250.148',0,73,3),`,
    `(26,'castle','ocliboy','211y111111112222,2121222222211222,2111110201111102,2221012221012122,2111110201112102,2121222222222122,2111112021112102,2221212021212122,2021112021111102,22222222222x2222@4,4,150,0,150',1297864030,'83.56.248.156',0,120,4),`,
  ]

  for (const oldLevel of oldLevels) {
    const oldLevelConverter = new OldLevelConverter(oldLevel)
    if (oldLevelConverter.canConvert(availableTiles)) {
      console.log(oldLevelConverter.json)
    }
  }
}

window.mouseClicked = () => {
  switch (stateManager.state) {
    case StateManager.STATE_PLAY_SURVIVAL:
      game.mouseClicked()
      break
    case StateManager.STATE_MENU_MAIN:
      menuMain.mouseClicked()
      break
    case StateManager.STATE_MENU_SURVIVAL:
      menuSurvival.mouseClicked()
      break
    default:
      break
  }
}

window.setup = () => {
  P5.p5.createCanvas(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT)

  disableContextualMenu()

  newsDataProvider = NewsDataProvider.getInstance()
  newsDataProvider.initNewsItems(NewsData.data)

  levelsDataProvider = LevelsDataProvider.getInstance()
  levelsDataProvider.initLevels(LevelsData.data)

  buttonsMiniMapsCreator =
    ButtonsMiniMapsCreator.getInstance(levelsDataProvider)

  stateManager = StateManager.getInstance(StateManager.STATE_MENU_MAIN)
  game = Game.getInstance(stateManager, levelsDataProvider)
  menuMain = MenuMain.getInstance(
    stateManager,
    buttonsMiniMapsCreator,
    game,
    newsDataProvider,
  )
  menuSurvival = MenuSurvival.getInstance(
    stateManager,
    buttonsMiniMapsCreator,
    game,
  )

  // the following code is here temporarily to convert old levels to their new format
  convertOldFormatLevels()
}

window.keyPressed = () => {
  switch (stateManager.state) {
    case StateManager.STATE_PLAY_SURVIVAL:
      game.keyPressed()
      break

    default:
      break
  }
}

window.draw = () => {
  switch (stateManager.state) {
    case StateManager.STATE_PLAY_SURVIVAL:
      game.update()
      game.draw()
      break
    case StateManager.STATE_MENU_MAIN:
      menuMain.draw()
      break
    case StateManager.STATE_MENU_SURVIVAL:
      menuSurvival.draw()
      break
    default:
      break
  }
}
