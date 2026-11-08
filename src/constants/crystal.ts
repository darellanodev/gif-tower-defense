import { Size } from '../types/size'

export const CRYSTAL = {
  // the health is in damage units, the same ones that the towers use (laser damage per update...)
  MAX_HEALTH: 500,
  // reward in money and score when it is destroyed: floor(MAX_HEALTH / 5) - 25 = 75 (legacy game values)
  REWARD_DIVISOR: 5,
  REWARD_DISCOUNT: 25,
  SCORE_FACTOR: 1,
  // index of crystal.png in Resources.tileImages
  IMAGE_INDEX: 10,
  HEALTH_BAR: {
    OFFSET_X: 5,
    OFFSET_Y: 21,
    SIZE: { w: 40, h: 6 } as Size,
  },
} as const
