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

  #isMagicColliding(enemy: Enemy, indexOrder: number) {
    const distanceBetween = Math.abs(indexOrder - enemy.orderPosition)
    return indexOrder >= enemy.orderPosition && distanceBetween < 1
  }

  checkCollision(enemy: Enemy, indexOrder: number) {
    if (enemy.dead || enemy.winner) {
      return false
    }

    if (this.#hasPreviouslyCollided(enemy)) {
      return false
    }

    if (this.#isMagicColliding(enemy, indexOrder)) {
      return true
    }

    return false
  }
}
