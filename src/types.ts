import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'

export interface Position {
  x: number
  y: number
}

export type RGBType = [number, number, number]

export type TowerType = GreenTower | RedTower | YellowTower

export type MapDataType = {
  id: number
  title: string
  comments: string
  rowsMap: string[]
  money: number
  startDirection: number
  endDirection: number
}
