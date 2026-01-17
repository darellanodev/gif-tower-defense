export const MAGIC_STATUS = {
  ALIVE: 0,
  DEAD: 1,
} as const

export const MAGIC_SPEED = {
  FIREBALL: 10,
  ICEBALL: 10,
  UFO: 2,
} as const

export const MAGIC_FIREBALL_DAMAGE = 500
export const MAGIC_ICEBALL_FREEZE_ENEMY_MAX_TIME = 500

export const MAGIC_UFO_OFFSET = {
  COLLISION_Y: 50,
  Y: 25,
} as const

export const MAGIC_UFO_RAY_IMG = {
  INDEX: 1,
  OFFSET_X: 2,
  OFFSET_Y: 30,
} as const

export const MAGIC_UFO_IMG_INDEX = 0
export const MAGIC_UFO_MAX_TIME_ABDUCT = 20
export const MAGIC_UFO_OUT_OF_SCREEN_Y = -50
