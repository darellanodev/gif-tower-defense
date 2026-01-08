import { Player } from '../../src/player/Player'
import { Tower } from '../../src/towers/Tower'
import { Position } from '../../src/types/position'
import { TowerType } from '../../src/types/towerType'
import { instantiateOrangeTile } from './orangeTile'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'
import { images } from './imagesResources'
import { TestFlags } from '../flags'

export const instantiateGreenTower = () => {
  const orangeTile = instantiateOrangeTile()
  const position: Position = { x: 10, y: 20 }
  const towerGreenCreator = TowerGreenCreator.getInstance(images)
  return towerGreenCreator.create(position, orangeTile)
}
export const instantiateRedTower = () => {
  const orangeTile = instantiateOrangeTile()
  const position: Position = { x: 10, y: 20 }
  const towerRedCreator = TowerRedCreator.getInstance(images)
  return towerRedCreator.create(position, orangeTile)
}
export const instantiateYellowTower = () => {
  const orangeTile = instantiateOrangeTile()
  const towerYellowPosition: Position = { x: 10, y: 20 }
  const player = Player.getInstance()
  const towerYellowCreator = TowerYellowCreator.getInstance(images, player)
  return towerYellowCreator.create(towerYellowPosition, orangeTile)
}
export const upgradeTowerNTimes = (tower: TowerType, nTimes: number) => {
  TestFlags.instant_upgrading = true
  for (let index = 0; index < nTimes; index++) {
    tower.upgrade()
    tower.update()
  }
  TestFlags.instant_upgrading = false
}
