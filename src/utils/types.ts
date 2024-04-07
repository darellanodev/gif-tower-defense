import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'

export interface Position {
  x: number
  y: number
}

export interface Size {
  w: number
  h: number
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
