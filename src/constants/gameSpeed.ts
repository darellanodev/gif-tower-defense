import { Position } from '../types/position'

// Number of game updates executed on every frame, in the order they are selected with the S key
export const GAME_SPEEDS = [1, 2, 4] as const

export const GAME_SPEED_INDICATOR_POSITION: Position = { x: 306, y: 72 }
