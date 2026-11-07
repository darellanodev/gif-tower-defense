import { DIRECTION } from '../../constants/direction'

export type WalkableNeighbours = {
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

// the tile to check first is the first one of this list (same order than the legacy game)
const DIRECTIONS_PRIORITY = [
  DIRECTION.LEFT,
  DIRECTION.RIGHT,
  DIRECTION.UP,
  DIRECTION.DOWN,
]

const OPPOSITE_DIRECTION: Record<number, number> = {
  [DIRECTION.LEFT]: DIRECTION.RIGHT,
  [DIRECTION.RIGHT]: DIRECTION.LEFT,
  [DIRECTION.UP]: DIRECTION.DOWN,
  [DIRECTION.DOWN]: DIRECTION.UP,
}

const isWalkableInDirection = (
  direction: number,
  walkable: WalkableNeighbours,
) => {
  const walkableByDirection: Record<number, boolean> = {
    [DIRECTION.LEFT]: walkable.left,
    [DIRECTION.RIGHT]: walkable.right,
    [DIRECTION.UP]: walkable.up,
    [DIRECTION.DOWN]: walkable.down,
  }
  return walkableByDirection[direction]
}

// Port of the legacy game rule (compruebadireccion):
// 1. keep the current direction while the tile ahead is walkable.
// 2. otherwise turn to the first walkable neighbour in the order left, right, up, down, but never go back.
// 3. when there is no way to go (dead end) return null: the enemy stops for a moment and, as it has no
//    current direction anymore (null), the next time it can also go back.
export const getNextDirection = (
  currentDirection: number | null,
  walkable: WalkableNeighbours,
): number | null => {
  if (
    currentDirection !== null &&
    isWalkableInDirection(currentDirection, walkable)
  ) {
    return currentDirection
  }

  const nextDirection = DIRECTIONS_PRIORITY.find(
    (direction) =>
      isWalkableInDirection(direction, walkable) &&
      (currentDirection === null ||
        direction !== OPPOSITE_DIRECTION[currentDirection]),
  )

  return nextDirection ?? null
}
