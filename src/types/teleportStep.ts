import { Position } from './position'

// The enemy that arrives at the teleport in tile is moved to the position of the teleport out tile.
// The following orders continue from there.
export type TeleportStep = {
  to: Position
}
