import { ENEMY_TELEPORT } from '../../constants/enemy'

export const TELEPORT_PHASE = {
  // the enemy shrinks in the teleport in tile and waits there
  OUT: 'out',
  // the enemy has been moved to the teleport out tile and it grows again
  IN: 'in',
} as const

export type TeleportPhase = (typeof TELEPORT_PHASE)[keyof typeof TELEPORT_PHASE]

export type TeleportDuration = { OUT: number; IN: number }

// Size of the enemy, from 0 to 1, while it teleports (1 when it is not teleporting)
export const getTeleportScale = (
  phase: TeleportPhase | null,
  time: number,
  duration: TeleportDuration,
) => {
  if (phase === null) {
    return 1
  }

  if (phase === TELEPORT_PHASE.OUT) {
    const shrinkTime = duration.OUT * ENEMY_TELEPORT.SHRINK_FRACTION
    if (shrinkTime <= 0) {
      return ENEMY_TELEPORT.MIN_SCALE
    }
    return Math.max(ENEMY_TELEPORT.MIN_SCALE, 1 - time / shrinkTime)
  }

  const growTime = duration.IN * ENEMY_TELEPORT.GROW_FRACTION
  if (growTime <= 0) {
    return 1
  }
  return Math.min(1, ENEMY_TELEPORT.MIN_SCALE + time / growTime)
}
