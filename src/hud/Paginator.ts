import { ButtonPage } from '../hud/ButtonPage'
import { Images } from '../resources/Images'
import { Position } from '../types/position'

export class Paginator {
  #levelsPages: number
  #btnsPages: ButtonPage[] = []
  constructor(levelsPages: number) {
    this.#levelsPages = levelsPages

    const maxLevelsDisplay = 10

    // add the next button to navigate to the next group of pages
    this.#btnsPages.push(
      new ButtonPage(
        { x: 20, y: 520 },
        Images.buttonPagesImages,
        { w: 32, h: 32 },
        { x: 0, y: 0 },
        '<<',
      ),
    )

    if (this.#levelsPages > maxLevelsDisplay) {
      for (let i = 0; i < maxLevelsDisplay; i++) {
        const buttonPage = new ButtonPage(
          { x: 20 + (i + 1) * 32, y: 520 },
          Images.buttonPagesImages,
          { w: 32, h: 32 },
          { x: 0, y: 0 },
          `${i + 1}`,
        )
        this.#btnsPages.push(buttonPage)
      }
    } else {
      for (let i = 0; i < maxLevelsDisplay; i++) {
        const buttonPage = new ButtonPage(
          { x: 20 + (i + 1) * 32, y: 520 },
          Images.buttonPagesImages,
          { w: 32, h: 32 },
          { x: 0, y: 0 },
          `${i + 1}`,
        )
        this.#btnsPages.push(buttonPage)
      }
    }

    // add the next button to navigate to the next group of pages
    this.#btnsPages.push(
      new ButtonPage(
        { x: 20 + (maxLevelsDisplay + 1) * 32, y: 520 },
        Images.buttonPagesImages,
        { w: 32, h: 32 },
        { x: 0, y: 0 },
        '>>',
      ),
    )
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
}
