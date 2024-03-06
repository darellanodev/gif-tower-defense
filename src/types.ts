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

export type ConstType = {
  GRAY_COLOR: RGBType

  LEFT_DIRECTION: number
  RIGHT_DIRECTION: number
  UP_DIRECTION: number
  DOWN_DIRECTION: number

  TILE_SIZE: number

  UPGRADE_MAX_LEVEL: number

  CANVAS_WIDTH: number
  CANVAS_HEIGHT: number
  HUD_HEIGHT: number
  KEY_1: number
  KEY_2: number
  KEY_3: number

  TOWER_OFFSET: number

  ALPHA_INFLUENCE_AREA_FILL: number
  ALPHA_INFLUENCE_AREA_STROKE: number

  EXPLOSION_OFFSET: number

  GAME_STATUS_PLAYING: number
  GAME_STATUS_GAME_OVER: number

  WAVE_PROGRESS_DELAY: number
  BOSS_PROGRESS_DELAY: number

  ID_LEVEL_VALID_FOR_UNIT_TESTING: number
  ID_LEVEL_INVALID_FOR_UNIT_TESTING: number

  DELAY_UPGRADE_MULTIPLIER: number

  MAGIC_STATUS_ALIVE: number
  MAGIC_STATUS_DEAD: number
}
