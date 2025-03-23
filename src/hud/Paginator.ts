import { ButtonPage } from '../hud/ButtonPage'
import { Images } from '../resources/Images'
import { Position } from '../types/position'

export class Paginator {
  #levelsPages: number
  #btnsPages: ButtonPage[] = []
  #currentPagesGroup: number
  constructor(levelsPages: number) {
    this.#levelsPages = levelsPages
    this.#currentPagesGroup = 1
    const labels = this.getLabels(this.#currentPagesGroup)
    let i = 1
    for (const label of labels) {
      this.#btnsPages.push(
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
  }

  draw() {
    for (const btnPage of this.#btnsPages) {
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

  getLabels(currentPagesGroup: number): string[] {
    const maxLevelsDisplay = 10
    const result: string[] = []
    result.push('<<')

    if (this.#levelsPages > maxLevelsDisplay) {
      for (let i = 0; i < maxLevelsDisplay; i++) {
        result.push(`${i + 1}`)
      }
    } else {
      for (let i = 0; i < maxLevelsDisplay; i++) {
        result.push(`${i + 1}`)
      }
    }

    result.push('>>')

    return result
  }
}
