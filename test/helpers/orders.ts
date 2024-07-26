import { getLevelMap, getPathFromMap, getValidLevelMap } from './levelMap'

export const getOrdersFromValidMap = () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  return path.makeOrders()
}

export const getOrdersFromLevelMapId = (levelId: number) => {
  const levelMap = getLevelMap(levelId)
  const path = getPathFromMap(levelMap)
  return path.makeOrders()
}
