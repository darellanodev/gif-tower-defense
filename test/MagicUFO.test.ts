import { MagicUFO } from '../src/magics/MagicUFO'
import { getPathFromMap } from './helpers/map'

const clearMagicUFOInstances = () => {
  MagicUFO.instances = []
}
const instantiateMagicUFO = (orders: number[]) => {
  const image: any = null
  const initialPosition = { x: 100, y: 200 }

  MagicUFO.instantiate(image, initialPosition, orders)
}

test('id, when three Magic UFOs are created, last UFO has id = 3', () => {
  const path = getPathFromMap()
  const orders = path.makeOrders()
  clearMagicUFOInstances()
  instantiateMagicUFO(orders)
  instantiateMagicUFO(orders)
  instantiateMagicUFO(orders)
  const result = MagicUFO.instances[2].id

  expect(result).toBe(3)
})
