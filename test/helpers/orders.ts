import { getPathFromMap, getValidLevelMap } from './levelMap'

export const getOrdersFromValidMap = () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  return path.makeOrders()
}
