export const MISSILE_OUTER_DIAMETER = 11
export const MISSILE_INNER_DIAMETER = 6
export const MISSILE_VELOCITY = 1.5

export const MISSILE_STATUS = {
  ALIVE: 0,
  DEAD: 1,
} as const

export const TOWER_IMAGE_OFFSET = {
  X: 3,
  Y: 4,
} as const

export const TOWER_CREATION_OFFSET = {
  X: 5,
  Y: 5,
} as const

export const TOWER_PROGRESS_BAR_OFFSET = {
  X: 15,
  Y: 25,
} as const

export const TOWER_UPGRADE = {
  INCREMENT: 1,
  MAX_LEVEL: 5,
} as const

export const TOWER_GREEN_UPGRADE = {
  PROFIT_SELL: [30, 35, 65, 220, 900, 1880],
  DAMAGE: [1, 2, 4, 6, 12, 24],
  COST: [50, 75, 125, 300, 1000, 2000],
  INFLUENCE_AREA: [150, 180, 220, 300, 400, 550],
} as const
