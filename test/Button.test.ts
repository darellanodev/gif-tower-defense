import { Button } from '../src/buttons/Button'
import { ButtonCheck } from '../src/buttons/ButtonCheck'
import { Position, Size } from '../src/utils/types'

test('isMouseOver, if mouse is inside the button, return true', () => {
  const images: any[] = [null, null]
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const button = new Button(buttonPosition, buttonSize, images)
  const mousePosition: Position = { x: 120, y: 120 }

  const result = button.isMouseOver(mousePosition)

  expect(result).toBeTruthy()
})
test('isChecked, if clicked and the last status was unchecked, return true', () => {
  const images: any[] = [null, null]
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonCheck = new ButtonCheck(buttonPosition, buttonSize, images)

  buttonCheck.check()
  const result = buttonCheck.isChecked

  expect(result).toBeTruthy()
})
test('isChecked, if clicked and the last status was unchecked and then uncheck the button, return false', () => {
  const images: any[] = [null, null]
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const buttonCheck = new ButtonCheck(buttonPosition, buttonSize, images)

  buttonCheck.check()
  buttonCheck.uncheck()
  const result = buttonCheck.isChecked

  expect(result).toBeFalsy()
})
