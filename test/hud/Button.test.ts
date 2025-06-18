import { expect } from 'vitest'
import { Button } from '../../src/hud/Button'
import { Position } from '../../src/types/position'
import { Size } from '../../src/types/size'
import { images } from '../helpers/imagesResources'

const buttonPosition: Position = { x: 100, y: 100 }
const buttonSize: Size = { w: 50, h: 50 }
const button = new Button(buttonPosition, buttonSize, images)

const fourImages: any[] = [null, null, null, null]
const buttonFourImages = new Button(buttonPosition, buttonSize, fourImages)

const sixImages: any[] = [null, null, null, null, null, null]
const buttonSixImages = new Button(buttonPosition, buttonSize, sixImages)

test('isMouseInside, if it is inside the button, return true', () => {
  const mousePosition: Position = { x: 120, y: 130 }
  const result = button.isMouseInside(mousePosition)

  expect(result).toBeTruthy()
})

test('isMouseInside, if the mouse position is outside the button in the x coordinate by the right, return false', () => {
  const mousePosition: Position = { x: 155, y: 130 }
  const result = button.isMouseInside(mousePosition)

  expect(result).toBeFalsy()
})

test('isMouseInside, if the mouse position is outside the button in the x coordinate by the left, return false', () => {
  const mousePosition: Position = { x: 99, y: 130 }
  const result = button.isMouseInside(mousePosition)

  expect(result).toBeFalsy()
})

test('isMouseInside, if the mouse position is outside the button in the y coordinate by the top, return false', () => {
  const mousePosition: Position = { x: 120, y: 99 }
  const result = button.isMouseInside(mousePosition)

  expect(result).toBeFalsy()
})

test('isMouseInside, if the mouse position is outside the button in the y coordinate by the top, return false', () => {
  const mousePosition: Position = { x: 120, y: 155 }
  const result = button.isMouseInside(mousePosition)

  expect(result).toBeFalsy()
})

test('getStateDraw, if the mouse position is inside the button and the button has 4 images, return INDEX_IMAGE_ON_HOVER', () => {
  const mousePosition: Position = { x: 120, y: 130 }

  const result = buttonFourImages.getStateDraw(mousePosition)
  expect(result).toBe(Button.INDEX_IMAGE_ON_HOVER)
})

test('getStateDraw, if the mouse position is outside the button and the button has 4 images, return INDEX_IMAGE_ON', () => {
  const mousePosition: Position = { x: 160, y: 130 }

  const result = buttonFourImages.getStateDraw(mousePosition)
  expect(result).toBe(Button.INDEX_IMAGE_ON)
})
