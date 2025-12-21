import { EnemyAnimator } from '../enemies/EnemyEyesAnimator'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'

export class TodayEnemies {
  #enemiesAnimators: EnemyAnimator[] = []
  constructor(enemiesAnimators: EnemyAnimator[]) {
    this.#enemiesAnimators = enemiesAnimators
  }

  draw() {
    const position: Position = { x: 20, y: 460 }
    const size: Size = { w: 50, h: 50 }
    const marginX = 59
    let counter = 0
    for (const enemyAnimator of this.#enemiesAnimators) {
      P5.p5.image(
        enemyAnimator.imageToDraw,
        position.x + counter * marginX,
        position.y,
        size.w,
        size.h,
      )
      counter++
    }
  }
}
