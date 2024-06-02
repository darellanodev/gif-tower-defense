import { ProgressBar } from '../hud/ProgressBar'
import { Position } from '../types/position'
import { MagicIceball } from '../magics/MagicIceball'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'
import { EnemyAnimator } from './EnemyAnimator'
import { PathMovement } from '../path/PathMovement'

export class Enemy extends Obj {
  static VELOCITY = 1 // must be multiple of "this.#Const.TILE_SIZE". Set 1 for normal, 5 for a faster game or 25 for a fastest game
  static BOSS_VELOCITY = 0.5

  static STATUS_ALIVE = 0
  static STATUS_DEAD = 1
  static TOTAL_ENEMIES = 5
  static CREATION_MAX_TIME = 200 // 100 when ENEMY_VELOCITY is 1. Decrement it if you speed up the game.
  static SIZE = 50
  static REDUCTION_FACTOR = 0.6

  static numberOfEnemies = 0 // for generating IDs
  static instances: Enemy[] = []
  static waveEnemies: number = 0
  static allowCreateEnemies: boolean = true
  static createEnemyTime: number = 0

  #position: Position
  #endurance: number
  #isBoss: boolean
  #enemyAnimator: EnemyAnimator
  #pathMovement: PathMovement

  #id: number
  #healthBar: ProgressBar
  #status: number
  #winned: boolean = false
  #freezed: boolean = false
  #freezedTime: number = 0
  #reduction: number = 0
  #width: number = 50
  #height: number = 50

  constructor(
    position: Position,
    endurance: number,
    isBoss: boolean,
    id: number,
    enemyAnimator: EnemyAnimator,
    pathMovement: PathMovement,
  ) {
    super(position)

    this.#position = { ...position }
    this.#endurance = endurance
    this.#isBoss = isBoss
    this.#id = id
    this.#enemyAnimator = enemyAnimator
    this.#pathMovement = pathMovement

    this.#healthBar = new ProgressBar(
      { x: 200, y: 200 },
      { w: ProgressBar.WIDTH, h: ProgressBar.HEIGHT },
    )

    this.#status = Enemy.STATUS_ALIVE
  }

  isBoss() {
    return this.#isBoss
  }

  get endurance() {
    return this.#endurance
  }

  get id() {
    return this.#id
  }

  get dead() {
    return this.#status == Enemy.STATUS_DEAD
  }

  get alive() {
    return this.#status == Enemy.STATUS_ALIVE
  }

  get winner() {
    return this.#winned
  }

  get isAbducted() {
    return this.#reduction >= Enemy.SIZE
  }

  addDamage(shotDamage: number) {
    const damageIncrement = shotDamage / this.#endurance

    this.#healthBar.increaseProgress(damageIncrement)

    if (this.#healthBar.isFullOfProgress()) {
      this.#status = Enemy.STATUS_DEAD
    }
  }

  get damage() {
    return this.#healthBar.progress
  }

  freeze() {
    this.#freezed = true
  }

  resetWinner() {
    this.#winned = false
  }

  #reinitEnemy() {
    this.#enemyAnimator.restart()
    this.#reduction = 0
    this.#pathMovement.reinit()
  }

  dropFromUFO() {
    this.#reinitEnemy()
  }

  #reinitWinnerEnemy() {
    this.#winned = true
    this.#reinitEnemy()
  }

  #updateHealthBarPosition() {
    this.#healthBar.position = {
      x: this.position.x,
      y: this.position.y - 20,
    }
  }

  get currentDirection() {
    return this.#pathMovement.currentDirection
  }

  get orderPosition() {
    return this.#pathMovement.indexOrder
  }

  get moveCount() {
    return this.#pathMovement.moveCount
  }

  updatePosition() {
    this.position = this.#pathMovement.position
  }

  update() {
    if (this.isAbducted) {
      return
    }

    if (this.#freezed) {
      if (this.#freezedTime < MagicIceball.FREEZE_ENEMY_MAX_TIME) {
        this.#freezedTime++
      } else {
        this.#freezed = false
        this.#freezedTime = 0
      }
      return
    }

    this.#pathMovement.update()
    if (!this.#pathMovement.isAlive) {
      this.#reinitWinnerEnemy()
    }
    this.updatePosition()

    this.#enemyAnimator.update()
    this.#updateHealthBarPosition()
  }

  draw() {
    if (this.isAbducted) {
      return
    }

    P5.p5.image(
      this.#enemyAnimator.imageToDraw,
      this.position.x + this.#reduction / 2,
      this.position.y,
      this.#width - this.#reduction,
      this.#height - this.#reduction,
    )

    this.#healthBar.draw()
  }

  decrementSize() {
    if (this.#reduction < Enemy.SIZE) {
      this.#reduction += Enemy.REDUCTION_FACTOR
    }
  }

  static instantiateNormalEnemy(
    waveEnemies: number,
    initialEnemiesPosition: Position,
    wave: number,
    enemyAnimator: EnemyAnimator,
    pathMovement: PathMovement,
  ) {
    const endurance = wave * 3 + waveEnemies * 2
    const isBoss = false

    const id = Enemy.#generateId()

    Enemy.instances.push(
      new Enemy(
        initialEnemiesPosition,
        endurance,
        isBoss,
        id,
        enemyAnimator,
        pathMovement,
      ),
    )
  }

  static #generateId() {
    Enemy.numberOfEnemies++
    return Enemy.numberOfEnemies
  }

  static instantiateBoss(
    initialEnemiesPosition: Position,
    wave: number,
    enemyAnimator: EnemyAnimator,
    pathMovement: PathMovement,
  ) {
    const endurance = wave * 25
    const isBoss = true

    const id = Enemy.#generateId()

    Enemy.instances.push(
      new Enemy(
        initialEnemiesPosition,
        endurance,
        isBoss,
        id,
        enemyAnimator,
        pathMovement,
      ),
    )
  }

  static removeDeadInstances() {
    Enemy.instances = Enemy.instances.filter((enemy) => enemy.alive)
  }

  static updateInstances() {
    Enemy.instances.forEach((enemy) => {
      enemy.update()
    })
  }
}
