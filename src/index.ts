import p5 from 'p5'
import { Const } from './constants/Const'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'
import { Game } from './Game'
import { StateManager } from './StateManager'
import { MenuMain } from './MenuMain'
import { MenuSurvival } from './MenuSurvival'

let _p5: p5
let game: Game
let menuMain: MenuMain
let menuSurvival: MenuSurvival
let stateManager: StateManager

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

  stateManager = StateManager.getInstance(StateManager.STATE_MENU_MAIN)
  game = Game.getInstance(stateManager)
  menuMain = MenuMain.getInstance(stateManager)
  menuSurvival = MenuSurvival.getInstance(stateManager)
}

window.keyPressed = () => {
  game.keyPressed()
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
