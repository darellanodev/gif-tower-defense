import { instantiateYellowTower } from '../helpers/towers'

describe('get coreProgressBarValue', () => {
  test('when a yellow tower increases its coreProgressBar by 10, return 10', () => {
    const towerYellow = instantiateYellowTower()
    towerYellow.increaseCoreProgress(10)
    const result = towerYellow.coreProgressBarValue

    expect(result).toBe(10)
  })
  test('when a yellow tower increases its coreProgressBar and then the player upgrades it, return 0', () => {
    const towerYellow = instantiateYellowTower()
    towerYellow.increaseCoreProgress(10)
    towerYellow.upgrade()
    const result = towerYellow.coreProgressBarValue

    expect(result).toBe(0)
  })
})
