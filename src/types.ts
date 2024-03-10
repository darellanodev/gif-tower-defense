import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'

export interface Position {
  x: number
  y: number
}

export type RGBType = [number, number, number]

export type TowerType = TowerGreen | TowerRed | TowerYellow

export type MapDataType = {
  id: number
  title: string
  comments: string
  rowsMap: string[]
  money: number
  startDirection: number
  endDirection: number
}
