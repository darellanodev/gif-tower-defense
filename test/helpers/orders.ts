import { getPathFromMap, getValidLevelMap } from './levelMap'

export const getOrders = () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  return path.makeOrders()
}
