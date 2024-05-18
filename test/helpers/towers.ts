import { Player } from '../../src/player/Player'
import { Tower } from '../../src/towers/Tower'
import { TowerGreen } from '../../src/towers/TowerGreen'
import { TowerRed } from '../../src/towers/TowerRed'
import { TowerYellow } from '../../src/towers/TowerYellow'
import { Position, TowerType } from '../../src/utils/types'
import { instantiateOrangeTile } from './orangeTile'

export const instantiateGreenTower = () => {
  const orangeTile = instantiateOrangeTile()
  const position: Position = { x: 10, y: 20 }
  return TowerGreen.instantiate(position, orangeTile)
}
export const instantiateRedTower = () => {
  const orangeTile = instantiateOrangeTile()
  const position: Position = { x: 10, y: 20 }
  return TowerRed.instantiate(position, orangeTile)
}
export const instantiateYellowTower = () => {
  const orangeTile = instantiateOrangeTile()
  const towerYellowPosition: Position = { x: 10, y: 20 }
  const player = new Player()
  return TowerYellow.instantiate(towerYellowPosition, orangeTile, player)
}
export const upgradeTowerNTimes = (tower: TowerType, nTimes: number) => {
  Tower.INSTANT_UPGRADING = true
  for (let index = 0; index < nTimes; index++) {
    tower.upgrade()
    tower.update()
  }
  Tower.INSTANT_UPGRADING = false
}
