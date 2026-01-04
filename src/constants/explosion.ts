import { RGBType } from '../types/rgb'

export const EXPLOSION_MAX_EMIT_TIME = 5
export const EXPLOSION_OFFSET = 25

export const EXPLOSION_SIZE = {
  ENEMY: 12,
  MAGIC_FIREBALL: 6,
  MAGIC_ICEBALL: 6,
} as const

export const EXPLOSION_COLOR = {
  ENEMY: [255, 165, 0] as RGBType,
  MAGIC_FIREBALL: [202, 191, 24] as RGBType,
  MAGIC_ICEBALL: [0, 65, 255] as RGBType,
} as const
