import { JUMPER } from '../constants/jumper'

// Pixels that an enemy grows while it jumps (legacy game): 0 at the beginning and at the end of the jump and
// the maximum in the middle. The maximum depends on the jump distance.
export const getJumpGrowth = (progress: number, jumpDistance: number) => {
  const peakGrowth = JUMPER.PEAK_GROWTH_BY_DISTANCE[jumpDistance] ?? 0
  const clampedProgress = Math.min(1, Math.max(0, progress))
  return peakGrowth * 4 * clampedProgress * (1 - clampedProgress)
}
