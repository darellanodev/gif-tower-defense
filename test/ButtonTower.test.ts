import { ButtonTower } from '../src/buttons/ButtonTower'
import { Position, Size } from '../src/utils/types'

test('isChecked, if clicked and the last status was unchecked, return true', () => {
  const images: any[] = [null, null]
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonTower = new ButtonTower(buttonPosition, buttonSize, images)

  buttonTower.check()
  const result = buttonTower.isChecked

  expect(result).toBeTruthy()
})
test('isChecked, if clicked and the last status was unchecked and then uncheck the button, return false', () => {
  const images: any[] = [null, null]
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonTower = new ButtonTower(buttonPosition, buttonSize, images)

  buttonTower.check()
  buttonTower.uncheck()
  const result = buttonTower.isChecked

  expect(result).toBeFalsy()
})
