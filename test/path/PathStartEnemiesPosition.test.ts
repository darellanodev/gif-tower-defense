import { Const } from '../../src/constants/Const'
import { PathStartEnemiesPosition } from '../../src/path/PathStartEnemiesPosition'
import { getTileStartForLevel } from '../helpers/levelMap'

test('getEnemiesInitialPosition, levelMap 1 (serpent) when start direction is LEFT and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
  const tileStartPosition = { x: 750, y: 80 }
  const tileStart = getTileStartForLevel(1)
  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  const expected = {
    x: tileStartPosition.x + Const.TILE_SIZE,
    y: tileStartPosition.y,
  }
  expect(result).toMatchObject(expected)
})

test('getEnemiesInitialPosition, levelMap 14 (one loop) when start direction is LEFT and start tile is at {x:750, y:130} (y: 130 because 80 + 50), return x+=50 ({x:800, y:130})', () => {
  const topRightTileY = 80

  const tileStartPosition = { x: 750, y: topRightTileY + Const.TILE_SIZE }

  const tileStart = getTileStartForLevel(14)

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  const expected = { x: tileStartPosition.x + 50, y: tileStartPosition.y }
  expect(result).toMatchObject(expected)
})
test('getEnemiesInitialPosition, levelMap 13 (double loop) when start direction is DOWN and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
  const topRightTileY = 80
  const topRightTileX = 750

  const tileStartPosition = {
    x: topRightTileX - Const.TILE_SIZE * 7,
    y: topRightTileY,
  }

  const tileStart = getTileStartForLevel(13)

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  const expected = {
    x: tileStartPosition.x,
    y: tileStartPosition.y - Const.TILE_SIZE,
  }
  expect(result).toMatchObject(expected)
})

test('getEnemiesInitialPosition, levelMap 15 (psycho), return {x:800, y:80}', () => {
  const topRightTileY = 80
  const topRightTileX = 750

  const tileStartPosition = {
    x: topRightTileX - Const.TILE_SIZE * 7,
    y: topRightTileY + Const.TILE_SIZE * 9,
  }

  const tileStart = getTileStartForLevel(15)

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  const expected = {
    x: tileStartPosition.x,
    y: tileStartPosition.y + Const.TILE_SIZE,
  }
  expect(result).toMatchObject(expected)
})
