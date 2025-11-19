import { ButtonPage } from './buttons/ButtonPage'
import { Images } from '../resources/Images'
import { Position } from '../types/position'

export class Paginator {
  static MAX_LEVELS_DISPLAYED: number = 10

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

  #btnHasNumberLabel(btnPage: ButtonPage) {
    return !isNaN(parseInt(btnPage.label))
  }

  #isCurrentActiveBtn(btnPage: ButtonPage) {
    return this.#active === parseInt(btnPage.label)
  }

  #shouldPaintDisabledBtn(btnPage: ButtonPage): boolean {
    return this.#btnHasNumberLabel(btnPage) && this.#isCurrentActiveBtn(btnPage)
  }

  #drawBtnPage(btnPage: ButtonPage) {
    if (this.#shouldPaintDisabledBtn(btnPage)) {
      btnPage.drawOff()
      return
    }
    btnPage.draw()
  }

  draw() {
    for (const btnPage of this.#btnsPages) {
      this.#drawBtnPage(btnPage)
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
    if (
      this.#currentPagesGroup >
      this.#levelsPages / Paginator.MAX_LEVELS_DISPLAYED
    ) {
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

  #getNumberedLabels(pagesGroup: number): string[] {
    const result = []
    const offset =
      Paginator.MAX_LEVELS_DISPLAYED * pagesGroup -
      Paginator.MAX_LEVELS_DISPLAYED

    for (let i = 0 + offset; i < Paginator.MAX_LEVELS_DISPLAYED + offset; i++) {
      if (i < this.#levelsPages) {
        result.push(`${i + 1}`)
      }
    }
    return result
  }

  getLabels(pagesGroup: number): string[] {
    const result: string[] = []

    result.push('<<')
    result.push(...this.#getNumberedLabels(pagesGroup))
    result.push('>>')

    return result
  }
}
