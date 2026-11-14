import { Position } from '../types/position'
import { Size } from '../types/size'

export const ENEMY_HEALTH_BAR = {
  OFFSET_X: 10,
  OFFSET_Y: 3,
  SIZE: { w: 27, h: 7 } as Size,
  INITIAL_POSITION: { x: 0, y: 0 } as Position, // doesn't matter because later it will change with the enemy's position
} as const

// Velocity values must be multiple of the tile size (see constants). Set 1 for normal, 5 for a faster game or 25 for a fastest game
export const ENEMY_VELOCITY = {
  NORMAL: 1,
  BOSS: 0.5,
} as const

// Multiplies the enemy velocity while it leaves an ice tile. Normal and boss velocities times this factor must still divide the tile size
export const ENEMY_ICE_SPEED_FACTOR = 2

// Absolute speed of every enemy while it jumps (the legacy game used 5, the double of a normal enemy, also for bosses).
// It must divide the tile size
export const ENEMY_JUMP_SPEED = 2

// Teleport tiles (legacy game: 100 ticks shrinking and 50 ticks growing at 30 fps, doubled for 60 fps).
// The enemy shrinks during the first part of the time, it is out of the map while it is tiny and it grows again
export const ENEMY_TELEPORT = {
  DURATION: { OUT: 200, IN: 100 },
  // the magics are moved to the teleport out tile at once
  INSTANT_DURATION: { OUT: 0, IN: 0 },
  MIN_SCALE: 0.02,
  SHRINK_FRACTION: 0.45,
  GROW_FRACTION: 0.92,
} as const

export const ENEMY_STATUS = {
  ALIVE: 0,
  DEAD: 1,
} as const

export const ENEMY_CREATION_MAX_TIME = 200 // 100 when ENEMY_VELOCITY is 1. Decrement it if you speed up the game.
export const ENEMY_SHRINK_AMOUNT_FACTOR = 0.6
export const ENEMY_SIZE = 50

export const TOTAL_ENEMIES = 5

export const ENEMY_BOSS_INDEX_IMAGE = 5
