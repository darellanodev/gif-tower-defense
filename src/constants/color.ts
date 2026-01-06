import { RGBType } from '../types/rgb'

export const COLOR = {
  GRAY: [50, 50, 50] as RGBType,
  GREEN: [75, 185, 35] as RGBType,
  YELLOW: [202, 191, 24] as RGBType,
  RED: [185, 35, 35] as RGBType,
  BACKGROUND: 'skyblue',
} as const

export const INFLUENCE_AREA_ALPHA = {
  FILL: 50,
  STROKE: 120,
} as const
