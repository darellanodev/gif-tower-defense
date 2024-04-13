import { Button } from './Button'

export class ButtonCheck extends Button {
  #isChecked: boolean = false
  check() {
    this.#isChecked = true
  }
  uncheck() {
    this.#isChecked = false
  }
  get isChecked() {
    return this.#isChecked
  }
}
