import { Enemy } from '../enemies/Enemy'

export class MagicCollisionChecker {
  #touchedEnemiesIds: number[] = []
  constructor() {}

  setToIgnoreList(enemy: Enemy) {
    this.#touchedEnemiesIds.push(enemy.id)
  }

  checkCollision(enemy: Enemy, indexOrder: number) {
    if (enemy.dead || enemy.winner) {
      return false
    }

    const found = this.#touchedEnemiesIds.find((id) => id === enemy.id)
    if (found !== undefined) {
      return false
    }

    const fireballPos = indexOrder
    const enemyPos = enemy.orderPosition
    const distanceBetween = Math.abs(fireballPos - enemyPos)

    if (fireballPos >= enemyPos && distanceBetween < 1) {
      return true
    }

    return false
  }
}
