import { Enemy } from '../enemies/Enemy'

export class MagicCollisionChecker {
  #touchedEnemiesIds: number[] = []
  constructor() {}

  setToIgnoreList(enemy: Enemy) {
    this.#touchedEnemiesIds.push(enemy.id)
  }

  #hasPreviouslyCollided(enemy: Enemy) {
    const found = this.#touchedEnemiesIds.find((id) => id === enemy.id)
    return found !== undefined
  }

  checkCollision(enemy: Enemy, indexOrder: number) {
    if (enemy.dead || enemy.winner) {
      return false
    }

    if (this.#hasPreviouslyCollided(enemy)) {
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
