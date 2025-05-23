import p5 from 'p5'
import { Const } from './constants/Const'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'
import { Game } from './Game'
import { StateManager } from './StateManager'
import { MenuMain } from './MenuMain'
import { MenuSurvival } from './MenuSurvival'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { AllLevels } from './levels/levelsData/AllLevels'
import { ButtonsMiniMapsCreator } from './hud/ButtonsMiniMapsCreator'
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
  levelsDataProvider.initLevels(AllLevels.data)

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
    levelsDataProvider,
  )
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
