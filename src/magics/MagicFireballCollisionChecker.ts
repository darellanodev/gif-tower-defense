import { Enemy } from '../enemies/Enemy'
import { ExplosionMagicFireball } from '../particles/explosions/ExplosionMagicFireball'
import { TestFlags } from '../../test/flags'
import { MagicCollisionChecker } from './MagicCollisionChecker'
import { MagicFireball } from './MagicFireball'
import { PathMovement } from '../levels/path/PathMovement'

export class MagicFireballCollisionChecker {
  #magicCollisionChecker: MagicCollisionChecker
  #pathMovement: PathMovement
  constructor(
    magicCollisionChecker: MagicCollisionChecker,
    pathMovement: PathMovement,
  ) {
    this.#magicCollisionChecker = magicCollisionChecker
    this.#pathMovement = pathMovement
  }

  #checkCollision(magicFireball: MagicFireball, enemy: Enemy) {
    if (
      this.#magicCollisionChecker.shouldCollide(
        enemy,
        this.#pathMovement.indexOrder,
      )
    ) {
      this.handleCollision(magicFireball, enemy)
    }
  }

  check(magicFireball: MagicFireball, enemies: Enemy[]) {
    enemies.forEach((enemy) => {
      if (!enemy.isAbducted) {
        this.#checkCollision(magicFireball, enemy)
      }
    })
  }

  handleCollision(magicFireball: MagicFireball, enemy: Enemy) {
    magicFireball.addDamage(enemy)
    this.#magicCollisionChecker.setToIgnoreList(enemy)
    if (!TestFlags.disableExplosion) {
      ExplosionMagicFireball.instantiate(enemy.position)
    }
  }
}
