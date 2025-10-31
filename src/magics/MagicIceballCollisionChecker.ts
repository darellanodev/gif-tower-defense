import { Enemy } from '../enemies/Enemy'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { PathMovement } from '../levels/path/PathMovement'
import { MagicIceball } from './MagicIceball'
import { ExplosionMagicIceball } from '../explosions/ExplosionMagicIceball'

export class MagicIceballCollisionChecker {
  #magicCollisionChecker: MagicCollisionChecker
  #pathMovement: PathMovement
  constructor(
    magicCollisionChecker: MagicCollisionChecker,
    pathMovement: PathMovement,
  ) {
    this.#magicCollisionChecker = magicCollisionChecker
    this.#pathMovement = pathMovement
  }
  check(magicIceball: MagicIceball, enemies: Enemy[]) {
    enemies.forEach((enemy) => {
      if (!enemy.isAbducted) {
        if (
          this.#magicCollisionChecker.checkCollision(
            enemy,
            this.#pathMovement.indexOrder,
          )
        ) {
          this.handleCollision(magicIceball, enemy)
        }
      }
    })
  }

  handleCollision(magicIceball: MagicIceball, enemy: Enemy) {
    magicIceball.freeze(enemy)
    this.#magicCollisionChecker.setToIgnoreList(enemy)
    ExplosionMagicIceball.instantiate(enemy.position)
  }
}
