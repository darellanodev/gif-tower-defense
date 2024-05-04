import { Const } from '../src/constants/Const'
import { ConstTest } from '../src/constants/ConstTest'
import { Path } from '../src/enemies/Path'
import { LevelsData } from '../src/levels/LevelsData'
import { LevelsDataProvider } from '../src/levels/LevelsDataProvider'
import { Magic } from '../src/magics/Magic'
import { MagicFireball } from '../src/magics/MagicFireball'
import { TileGenerator } from '../src/tiles/TileGenerator'

const instantiateMagicFireball = (orders: number[]) => {
  MagicFireball.instances = []
  const image: any = null
  const initialPosition = { x: 100, y: 200 }

  MagicFireball.instantiate(image, initialPosition, orders)
}

const getTileGeneratorFromMap = () => {
  const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

  const levelMap = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING,
  )

  if (levelMap === undefined) {
    throw new Error('Map invalid')
  }

  const mapimages: any[] = [null, null, null]

  return new TileGenerator(levelMap, mapimages)
}

const getPathFromMap = () => {
  const tileGenerator = getTileGeneratorFromMap()
  const pathTiles = tileGenerator.pathTiles
  const startTile = tileGenerator.startTile
  const endTile = tileGenerator.endTile

  return new Path(startTile, endTile, pathTiles)
}

const updateToReachTheEndOfTheMap = (orders: number[]) => {
  const maxIterations = (Const.TILE_SIZE / Magic.SPEED) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    MagicFireball.updateInstances()
  }
}

test('position, when the magicfireball is recently created and update instances, new positions is different', () => {
  const path = getPathFromMap()
  const orders = path.makeOrders()
  instantiateMagicFireball(orders)

  const initialPosition = {
    x: MagicFireball.instances[0].getX(),
    y: MagicFireball.instances[0].getY(),
  }

  MagicFireball.updateInstances()

  const newPosition = {
    x: MagicFireball.instances[0].getX(),
    y: MagicFireball.instances[0].getY(),
  }

  expect(newPosition).not.toBe(initialPosition)
})

test('isAlive, when the magicfireball is recently created, return true', () => {
  const path = getPathFromMap()
  const orders = path.makeOrders()
  instantiateMagicFireball(orders)

  const result = MagicFireball.instances[0].isAlive
  expect(result).toBeTruthy()
})

test('reachEnd, when the magicfireball is recently created, return false', () => {
  const path = getPathFromMap()
  const orders = path.makeOrders()
  instantiateMagicFireball(orders)
  updateToReachTheEndOfTheMap(orders)

  const result = MagicFireball.instances[0].isAlive()
  expect(result).toBeFalsy()
})
