import { ProgressBar } from '../hud/ProgressBar'
import { Position } from '../utils/types'
import { Random } from '../utils/Random'
import { Image } from 'p5'
import { MagicIceball } from '../magics/MagicIceball'
import { Const } from '../constants/Const'
import { ConstDirection } from '../constants/ConstDirection'
import { Player } from '../Player'
import { ExplosionEnemy } from '../explosions/ExplosionEnemy'
import { Images } from '../resources/Images'
import { Path } from './Path'
import { MathUtils } from '../utils/MathUtils'
import { P5 } from '../utils/P5'

export class Enemy {
  static VELOCITY = 1 // must be multiple of "this.#Const.TILE_SIZE". Set 1 for normal, 5 for a faster game or 25 for a fastest game
  static BOSS_VELOCITY = 0.5
  static INDEX_BOSS_IN_ENEMIES_IMAGES = 5
  static CHANGE_EYES_MAX_TIME = 50
  static EXTEND_CLOSED_EYES_MAX_TIME = 20
  static MIN_TIME_TO_CLOSE = 50
  static MAX_TIME_TO_CLOSE = 200
  static EYES_CENTER = 0
  static EYES_LEFT = 1
  static EYES_RIGHT = 2
  static EYES_CLOSED = 3
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

  #images: Image[]
  #startPosition: Position
  #orders: number[]
  #endurance: number
  #isBoss: boolean

  #id: number
  #imgIndex: number
  #imgIndexBeforeEyesClosed: number
  #eyesSequence: number[]
  #healthBar: ProgressBar
  #status: number
  #position: Position
  #currentDirection: number
  #moveCount: number = 0
  #indexOrder: number = 0
  #changeEyesTime: number = 0
  #indexEyesSecuence: number = 0
  #closeEyesTime: number = 0
  #extendClosedEyesTime: number = 0
  #randomCloseEyes: number = 0
  #winned: boolean = false
  #freezed: boolean = false
  #freezedTime: number = 0
  #reduction: number = 0
  #width: number = 50
  #height: number = 50

  constructor(
    images: Image[],
    startPosition: Position,
    orders: number[],
    endurance: number,
    isBoss: boolean,
  ) {
    this.#images = images
    this.#startPosition = { ...startPosition }
    this.#orders = orders
    this.#endurance = endurance
    this.#isBoss = isBoss

    // generate Id
    Enemy.numberOfEnemies++
    this.#id = Enemy.numberOfEnemies

    this.#eyesSequence = [
      Enemy.EYES_LEFT,
      Enemy.EYES_CENTER,
      Enemy.EYES_RIGHT,
      Enemy.EYES_CENTER,
    ]

    this.#healthBar = new ProgressBar(
      { x: 200, y: 200 },
      { w: ProgressBar.WIDTH, h: ProgressBar.HEIGHT },
    )

    this.#position = { ...this.#startPosition }
    this.#currentDirection = this.#orders[this.#indexOrder]

    this.#imgIndex = Enemy.EYES_CENTER
    this.#imgIndexBeforeEyesClosed = Enemy.EYES_CENTER
    this.#status = Enemy.STATUS_ALIVE
  }

  isBoss() {
    return this.#isBoss
  }

  static instantiateNormalEnemy(
    images: Image[],
    waveEnemies: number,
    orders: number[],
    initialEnemiesPosition: Position,
    wave: number,
  ) {
    const endurance = wave * 3 + waveEnemies * 2
    const isBoss = false

    Enemy.instances.push(
      new Enemy(images, initialEnemiesPosition, orders, endurance, isBoss),
    )
  }

  static instantiateBoss(
    images: Image[],
    orders: number[],
    initialEnemiesPosition: Position,
    wave: number,
  ) {
    const endurance = wave * 25
    const isBoss = true

    Enemy.instances.push(
      new Enemy(images, initialEnemiesPosition, orders, endurance, isBoss),
    )
  }

  get currentDirection() {
    return this.#currentDirection
  }

  get endurance() {
    return this.#endurance
  }

  get id() {
    return this.#id
  }

  get position() {
    return this.#position
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

  get orderPosition() {
    return this.#indexOrder
  }

  addDamage(shotDamage: number) {
    const damageIncrement = shotDamage / this.#endurance

    this.#healthBar.increaseProgress(damageIncrement)

    if (this.#healthBar.isFullOfProgress()) {
      this.#status = Enemy.STATUS_DEAD
    }
  }

  freeze() {
    this.#freezed = true
  }

  resetWinner() {
    this.#winned = false
  }

  #reinitEnemy() {
    this.#moveCount = 0
    this.#indexOrder = 0
    this.#changeEyesTime = 0
    this.#indexEyesSecuence = 0
    this.#closeEyesTime = 0
    this.#extendClosedEyesTime = 0
    this.#currentDirection = this.#orders[this.#indexOrder]
    this.#position = { ...this.#startPosition }
    this.#setRandomTimeMaxForClosingEyes()
  }

  dropFromUFO() {
    this.#reduction = 0
    this.#reinitEnemy()
  }

  #reinitWinnerEnemy() {
    this.#winned = true
    this.#reinitEnemy()
  }

  #move() {
    const velocity = this.#isBoss ? Enemy.BOSS_VELOCITY : Enemy.VELOCITY

    switch (this.#currentDirection) {
      case ConstDirection.LEFT:
        this.#position.x = this.#position.x - velocity
        break

      case ConstDirection.RIGHT:
        this.#position.x = this.#position.x + velocity
        break

      case ConstDirection.UP:
        this.#position.y = this.#position.y - velocity
        break

      case ConstDirection.DOWN:
        this.#position.y = this.#position.y + velocity
        break
    }

    this.#moveCount = this.#moveCount + velocity
  }

  get moveCount() {
    return this.#moveCount
  }

  #updateHealthBarPosition() {
    this.#healthBar.position = {
      x: this.#position.x,
      y: this.#position.y - 20,
    }
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

    this.#move()

    if (this.#moveCount === Const.TILE_SIZE) {
      this.#moveCount = 0
      this.#indexOrder++
      if (this.#indexOrder == this.#orders.length) {
        this.#reinitWinnerEnemy()
      } else {
        this.#currentDirection = this.#orders[this.#indexOrder]
      }
    }

    this.#changeEyes()
    this.#updateHealthBarPosition()
  }

  #hasOpenEyes() {
    return this.#imgIndex != Enemy.EYES_CLOSED
  }

  #moveEyesInSequence() {
    this.#changeEyesTime++

    if (this.#changeEyesTime > Enemy.CHANGE_EYES_MAX_TIME) {
      this.#changeEyesTime = 0
      this.#indexEyesSecuence++
      if (this.#indexEyesSecuence == this.#eyesSequence.length) {
        this.#indexEyesSecuence = 0
      }

      this.#imgIndex = this.#eyesSequence[this.#indexEyesSecuence]
    }
  }

  #setRandomTimeMaxForClosingEyes() {
    this.#randomCloseEyes = Random.integerBetween(
      Enemy.MIN_TIME_TO_CLOSE,
      Enemy.MAX_TIME_TO_CLOSE,
    )
  }

  #changeEyes() {
    if (this.#hasOpenEyes()) {
      this.#closeEyesTime++

      if (this.#closeEyesTime > this.#randomCloseEyes) {
        this.#closeEyesTime = 0
        this.#setRandomTimeMaxForClosingEyes()
        this.#imgIndexBeforeEyesClosed = this.#imgIndex
        this.#imgIndex = Enemy.EYES_CLOSED
      }

      this.#moveEyesInSequence()
    } else {
      this.#extendClosedEyesTime++

      if (this.#extendClosedEyesTime > Enemy.EXTEND_CLOSED_EYES_MAX_TIME) {
        this.#extendClosedEyesTime = 0
        this.#imgIndex = this.#imgIndexBeforeEyesClosed
      }
    }
  }

  get isAbducted() {
    return this.#reduction >= Enemy.SIZE
  }

  draw() {
    if (this.isAbducted) {
      return
    }

    P5.p5.image(
      this.#images[this.#imgIndex],
      this.#position.x + this.#reduction / 2,
      this.#position.y,
      this.#width - this.#reduction,
      this.#height - this.#reduction,
    )

    this.#healthBar.draw()
  }

  static removeDeadInstances() {
    Enemy.instances = Enemy.instances.filter((enemy) => enemy.alive)
  }

  static updateInstances() {
    Enemy.instances.forEach((enemy) => {
      enemy.update()
    })
  }

  static handleWinners() {
    let gameStatus = Const.GAME_STATUS_PLAYING
    const winnerEnemies = Enemy.instances.filter((enemy) => enemy.winner)
    winnerEnemies.forEach((enemy) => {
      Player.lives--
      if (Player.lives <= 0) {
        gameStatus = Const.GAME_STATUS_GAME_OVER
      }
      enemy.resetWinner()
    })
    return gameStatus
  }

  static handleExplosionEnemys() {
    const deadEnemies: Enemy[] = Enemy.instances.filter((enemy) => enemy.dead)
    deadEnemies.forEach((enemy) => {
      ExplosionEnemy.instantiate(enemy.position)

      const $increasedMoney = enemy.endurance * Const.MONEY_MULTIPLICATOR
      Player.increaseMoney($increasedMoney)
      Player.increaseScore($increasedMoney * 2)
    })
  }

  static handleNewEnemyCreation() {
    if (Enemy.allowCreateEnemies) {
      if (Enemy.waveEnemies < Enemy.TOTAL_ENEMIES) {
        Enemy.createEnemyTime++
        if (Enemy.createEnemyTime === Enemy.CREATION_MAX_TIME) {
          Enemy.createEnemyTime = 0

          Enemy.instantiateNormalEnemy(
            Images.enemiesImages.slice(
              ...MathUtils.getTwoNumbersFourTimes(Enemy.waveEnemies),
            ),
            Enemy.waveEnemies,
            Path.orders,
            Path.initialEnemiesPosition,
            Player.wave,
          )

          Enemy.waveEnemies++
        }
      } else {
        Enemy.allowCreateEnemies = false
        Enemy.waveEnemies = 0
      }
    }
  }

  static updateEnemies() {
    Enemy.handleNewEnemyCreation()
    Enemy.handleExplosionEnemys()
    Enemy.removeDeadInstances()
    Enemy.updateInstances()

    return Enemy.handleWinners()
  }

  decrementSize() {
    if (this.#reduction < Enemy.SIZE) {
      this.#reduction += Enemy.REDUCTION_FACTOR
    }
  }
}
