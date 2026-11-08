export const TILE_SIZE = 50
export const TILE_CREATION_MARGIN_TOP = 30
export const TILE_SYMBOL = {
  START: 'x',
  END: 'y',
  ORANGE: '0',
  PATH: '1',
  BLACK: '2',
  ICE: 's',
  CRYSTAL: 'c',
} as const

export const ICE_TILE_COLOR = [0, 158, 158, 120] as const // r, g, b, alpha
