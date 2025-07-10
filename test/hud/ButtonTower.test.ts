import { expect } from 'vitest'
import { ButtonTower } from '../../src/hud/ButtonTower'
import { Position } from '../../src/types/position'
import { Size } from '../../src/types/size'
import { images } from '../helpers/imagesResources'
import { Button } from '../../src/hud/Button'

test('isChecked, if clicked and the last status was unchecked, return true', () => {
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonTower = new Button(buttonPosition, buttonSize, images)
  buttonTower.check()

  const result = buttonTower.checked

  expect(result).toBeTruthy()
})
test('isChecked, if clicked and the last status was unchecked and then uncheck the button, return false', () => {
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonTower = new Button(buttonPosition, buttonSize, images)
  buttonTower.check()
  buttonTower.uncheck()

  const result = buttonTower.checked

  expect(result).toBeFalsy()
})
