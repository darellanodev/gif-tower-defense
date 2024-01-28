import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'

export type RGBType = [number, number, number]

export type TowerType = GreenTower | RedTower | YellowTower

export type ConstType = {
  HUD_NORMAL: number
  HUD_UPGRADING: number
  HUD_UPGRADING_MAX: number

  GREEN_TOWER: number
  RED_TOWER: number
  YELLOW_TOWER: number

  GREEN_COLOR: number[]
  RED_COLOR: number[]
  YELLOW_COLOR: number[]

  DAMAGE_UPGRADE_GREEN_TOWER: number[]

  COST_UPGRADE_GREEN_TOWER: number[]
  COST_UPGRADE_RED_TOWER: number[]
  COST_UPGRADE_YELLOW_TOWER: number[]

  GREEN_TOWER_UPGRADE_INFLUENCE_AREA: number[]
  RED_TOWER_UPGRADE_INFLUENCE_AREA: number[]
  YELLOW_TOWER_UPGRADE_INFLUENCE_AREA: number[]

  LEFT_DIRECTION: number
  RIGHT_DIRECTION: number
  UP_DIRECTION: number
  DOWN_DIRECTION: number

  TILE_SIZE: number

  UPGRADE_MAX_LEVEL: number

  TOTAL_TOWER_UPGRADES: number
  TOTAL_ENEMIES: number
  CANVAS_WIDTH: number
  CANVAS_HEIGHT: number
  HUD_HEIGHT: number
  KEY_1: number
  KEY_2: number
  KEY_3: number

  CREATE_ENEMY_MAX_TIME: number

  TOWER_OFFSET: number

  GREEN_TOWER_INFLUENCE_AREA: number
  RED_TOWER_INFLUENCE_AREA: number
  YELLOW_TOWER_INFLUENCE_AREA: number

  ALPHA_INFLUENCE_AREA_FILL: number
  ALPHA_INFLUENCE_AREA_STROKE: number

  ENEMY_VELOCITY: number
  BOSS_VELOCITY: number

  ENEMY_CHANGE_EYES_MAX_TIME: number

  ENEMY_EXTEND_CLOSED_EYES_MAX_TIME: number
  ENEMY_MIN_TIME_TO_CLOSE: number
  ENEMY_MAX_TIME_TO_CLOSE: number

  ENEMY_EYES_CENTER: number
  ENEMY_EYES_LEFT: number
  ENEMY_EYES_RIGHT: number
  ENEMY_EYES_CLOSED: number

  ENEMY_STATUS_ALIVE: number
  ENEMY_STATUS_DEAD: number

  PROGRESSBAR_WIDTH: number
  PROGRESSBAR_HEIGHT: number

  ENEMY_EXPLOSION_MAX_EMIT_TIME: number
  EXPLOSION_OFFSET: number

  GAME_STATUS_PLAYING: number
  GAME_STATUS_GAME_OVER: number

  WAVE_PROGRESS_DELAY: number
  BOSS_PROGRESS_DELAY: number
}
