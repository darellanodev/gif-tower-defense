import { expect } from 'vitest'
import { ConstTest } from '../../src/constants/ConstTest'
import { MiniMap } from '../../src/menus/MiniMap'
import { getButtonsMiniMapsCreator } from '../helpers/hud'

ConstTest.DISABLE_LOADING_IMAGES = true
const levelsIds = [1, 1, 1, 1, 1, 1]
const initialPosition = { x: 100, y: 200 }
const buttonsMiniMapsCreator = getButtonsMiniMapsCreator()

test('createMultiRows, when we pass six levels Ids, then the 6th button minimap is in the second row', () => {
  const buttonsMiniMaps = buttonsMiniMapsCreator.createMultiRows(
    levelsIds,
    MiniMap.TYPE_TEXT_DOWN,
    initialPosition,
  )
  const result = buttonsMiniMaps.at(-1)?.position.y
  const expected = 320
  expect(result).toBe(expected)
})

test('createMultiRows, when we pass six levels Ids, when we look at the y position of the 5th level is the same as the first minimap button', () => {
  const buttonsMiniMaps = buttonsMiniMapsCreator.createMultiRows(
    levelsIds,
    MiniMap.TYPE_TEXT_DOWN,
    initialPosition,
  )
  const result = buttonsMiniMaps[4]?.position.y
  const expected = 200
  expect(result).toBe(expected)
})

test('createMultiRows, when we pass six levels Ids, the x position of the 6th level is the same as the first minimap button', () => {
  const buttonsMiniMaps = buttonsMiniMapsCreator.createMultiRows(
    levelsIds,
    MiniMap.TYPE_TEXT_DOWN,
    initialPosition,
  )
  const result = buttonsMiniMaps.at(-1)?.position.x
  const expected = 100
  expect(result).toBe(expected)
})

test('createOneRow, when we pass six levels Ids, the y position of the 6th level is the same as the y position of the first minimap button', () => {
  const buttonsMiniMaps = buttonsMiniMapsCreator.createOneRow(
    levelsIds,
    MiniMap.TYPE_TEXT_DOWN,
    initialPosition,
  )
  const result = buttonsMiniMaps.at(-1)?.position.y
  const expected = 200
  expect(result).toBe(expected)
})

test('createOneRow, when we pass six levels Ids, the y position of the 6th level is greater than he y position of the 5th element', () => {
  const buttonsMiniMaps = buttonsMiniMapsCreator.createOneRow(
    levelsIds,
    MiniMap.TYPE_TEXT_DOWN,
    initialPosition,
  )
  const lastElement = buttonsMiniMaps.at(-1)
  const previousElement = buttonsMiniMaps.at(-2)

  if (lastElement === undefined || previousElement === undefined) {
    throw new Error('lastElement or previousElement is undefined')
  }
  const result = lastElement.position.x > previousElement.position.x
  expect(result).toBeTruthy()
})
