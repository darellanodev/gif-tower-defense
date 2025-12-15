export const ENEMY_HEALTH_BAR = {
  OFFSET_X: 10,
  OFFSET_Y: 3,
  SIZE: { w: 27, h: 7 },
} as const

// Velocity values must be multiple of the tile size (see constants). Set 1 for normal, 5 for a faster game or 25 for a fastest game
export const ENEMY_VELOCITY = {
  NORMAL: 1,
  BOSS: 0.5,
}

export const ENEMY_STATUS = {
  ALIVE: 0,
  DEAD: 1,
}

export const ENEMY_CREATION_MAX_TIME = 200 // 100 when ENEMY_VELOCITY is 1. Decrement it if you speed up the game.
export const ENEMY_SHRINK_AMOUNT_FACTOR = 0.6
export const ENEMY_SIZE = 50

export const TOTAL_ENEMIES = 5
