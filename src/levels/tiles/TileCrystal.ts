import { Image } from 'p5'
import { Obj } from '../../Obj'
import { Position } from '../../types/position'
import { ProgressBar } from '../../hud/progressbar/ProgressBar'
import { CRYSTAL } from '../../constants/crystal'
import { TILE_SIZE } from '../../constants/tile'
import { P5 } from '../../utils/P5'

// A crystal is a fixed target placed on a tile. Only the green towers shoot it. When it is destroyed the
// tile becomes a buildable (orange) tile and the player gets money and score.
export class TileCrystal extends Obj {
  #img: Image | null
  #healthBar: ProgressBar

  constructor(img: Image | null, position: Position) {
    super(position)
    this.#img = img
    this.#healthBar = new ProgressBar(
      {
        x: position.x + CRYSTAL.HEALTH_BAR.OFFSET_X,
        y: position.y + CRYSTAL.HEALTH_BAR.OFFSET_Y,
      },
      CRYSTAL.HEALTH_BAR.SIZE,
    )
  }

  get isDead() {
    return this.#healthBar.isFullOfProgress()
  }

  // damage received, from 0 to 100
  get damage() {
    return this.#healthBar.progress
  }

  get reward() {
    return (
      Math.floor(CRYSTAL.MAX_HEALTH / CRYSTAL.REWARD_DIVISOR) -
      CRYSTAL.REWARD_DISCOUNT
    )
  }

  get score() {
    return this.reward * CRYSTAL.SCORE_FACTOR
  }

  addDamage(shotDamage: number) {
    this.#healthBar.increaseProgress((shotDamage * 100) / CRYSTAL.MAX_HEALTH)
  }

  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    if (this.#img !== null) {
      P5.p5.image(
        this.#img,
        this.position.x / scale + startOffsetX,
        this.position.y / scale + startOffsetY,
        TILE_SIZE / scale,
        TILE_SIZE / scale,
      )
    }
    if (this.damage > 0 && !this.isDead) {
      this.#healthBar.draw()
    }
  }
}
