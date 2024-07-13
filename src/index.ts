import p5 from 'p5'
import { Const } from './constants/Const'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'
import { Game } from './Game'
import { StateManager } from './StateManager'
import { Menu } from './Menu'

let _p5: p5
let game: Game
let menu: Menu
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
  game.mouseClicked()
}

window.setup = () => {
  P5.p5.createCanvas(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT)

  disableContextualMenu()

  game = Game.getInstance()
  menu = Menu.getInstance()
  stateManager = new StateManager()
}

window.keyPressed = () => {
  game.keyPressed()
}

window.draw = () => {
  if (stateManager.isPlay) {
    game.update()
    game.draw()
  } else if (stateManager.isMenu) {
    menu.draw()
  }
}
