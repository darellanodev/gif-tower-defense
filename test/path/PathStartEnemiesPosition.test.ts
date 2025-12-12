import { expect } from 'vitest'
import { ConstTile } from '../../src/constants/ConstTile'
import { PathStartEnemiesPosition } from '../../src/levels/path/PathStartEnemiesPosition'
import { getTileStartForLevel } from '../helpers/levelMap'

const topRightTileY = 80
const topRightTileX = 750

test('getEnemiesInitialPosition, levelMap 1 (serpent)', () => {
  const expected = {
    x: topRightTileX + ConstTile.SIZE,
    y: topRightTileY,
  }

  const tileStart = getTileStartForLevel(1)
  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  expect(result).toMatchObject(expected)
})

test('getEnemiesInitialPosition, levelMap 14 (one loop)', () => {
  const expected = {
    x: topRightTileX + ConstTile.SIZE,
    y: topRightTileY + ConstTile.SIZE,
  }

  const tileStart = getTileStartForLevel(14)

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  expect(result).toMatchObject(expected)
})
test('getEnemiesInitialPosition, levelMap 13 (double loop)', () => {
  const expected = {
    x: topRightTileX - ConstTile.SIZE * 7,
    y: topRightTileY - ConstTile.SIZE,
  }

  const tileStart = getTileStartForLevel(13)

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  expect(result).toMatchObject(expected)
})

test('getEnemiesInitialPosition, levelMap 15 (psycho)', () => {
  const expected = {
    x: topRightTileX - ConstTile.SIZE * 7,
    y: topRightTileY + ConstTile.SIZE * 9 + ConstTile.SIZE,
  }

  const tileStart = getTileStartForLevel(15)

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  expect(result).toMatchObject(expected)
})
