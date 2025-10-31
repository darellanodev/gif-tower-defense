import { ButtonPage } from './buttons/ButtonPage'
import { Images } from '../resources/Images'
import { Position } from '../types/position'

export class Paginator {
  #levelsPages: number
  #btnsPages: ButtonPage[] = []
  #currentPagesGroup: number
  #active: number
  constructor(levelsPages: number) {
    this.#active = 1
    this.#levelsPages = levelsPages
    this.#currentPagesGroup = 1
    this.#createButtons()
  }

  #createButtons() {
    const labels = this.getLabels(this.#currentPagesGroup)
    let i = 1
    const result = []
    for (const label of labels) {
      result.push(
        new ButtonPage(
          { x: 20 + i * 32, y: 520 },
          Images.buttonPagesImages,
          { w: 32, h: 32 },
          { x: 0, y: 0 },
          label,
        ),
      )
      i++
    }
    this.#btnsPages = result
  }

  set active(value: number) {
    this.#active = value
  }

  draw() {
    for (const btnPage of this.#btnsPages) {
      if (!isNaN(parseInt(btnPage.label))) {
        if (this.#active === parseInt(btnPage.label)) {
          btnPage.drawOff()
          continue
        }
      }
      btnPage.draw()
    }
  }

  mouseClicked(mousePosition: Position): string | null {
    for (const btnPage of this.#btnsPages) {
      if (btnPage.isMouseOver(mousePosition)) {
        return btnPage.label
      }
    }
    return null
  }

  nextPagesGroup() {
    if (this.#currentPagesGroup > this.#levelsPages / 10) {
      return
    }
    this.#currentPagesGroup++
    this.#createButtons()
  }
  previousPagesGroup() {
    if (this.#currentPagesGroup === 1) {
      return
    }
    this.#currentPagesGroup--
    this.#createButtons()
  }

  getLabels(pagesGroup: number): string[] {
    const maxLevelsDisplay = 10
    const result: string[] = []
    result.push('<<')

    const offset = 10 * pagesGroup - 10

    for (let i = 0 + offset; i < maxLevelsDisplay + offset; i++) {
      if (i < this.#levelsPages) {
        result.push(`${i + 1}`)
      }
    }

    result.push('>>')

    return result
  }
}
