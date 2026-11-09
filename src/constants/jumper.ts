// A jumper tile makes the enemies jump straight, in the direction they arrived, over some tiles.
// The symbol tells the distance and the image: 5 -> 2 tiles, 6 -> 3 tiles, 7 -> 4 tiles
export const JUMPER = {
  SYMBOLS: ['5', '6', '7'] as string[],
  DISTANCE_BY_SYMBOL: { '5': 2, '6': 3, '7': 4 } as Record<string, number>,
  // index of jumper1.png, jumper2.png and jumper3.png in Resources.tileImages
  IMAGE_INDEX_BY_SYMBOL: { '5': 11, '6': 12, '7': 13 } as Record<
    string,
    number
  >,
  // legacy game: the enemy grows while it is in the air. Pixels at the top of the jump, by distance
  PEAK_GROWTH_BY_DISTANCE: { 2: 6, 3: 25, 4: 65 } as Record<number, number>,
} as const
