import { ButtonTower } from '../src/hud/ButtonTower'
import { Position, Size } from '../src/utils/types'
import { images } from './helpers/imagesResources'

test('isChecked, if clicked and the last status was unchecked, return true', () => {
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonTower = new ButtonTower(buttonPosition, buttonSize, images)

  buttonTower.check()
  const result = buttonTower.isChecked

  expect(result).toBeTruthy()
})
test('isChecked, if clicked and the last status was unchecked and then uncheck the button, return false', () => {
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonTower = new ButtonTower(buttonPosition, buttonSize, images)

  buttonTower.check()
  buttonTower.uncheck()
  const result = buttonTower.isChecked

  expect(result).toBeFalsy()
})
