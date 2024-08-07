export class Const {
  static TILE_SIZE = 50
  static MAX_WAVE_ENEMIES = 5
  static UPGRADE_MAX_LEVEL = 5
  static CANVAS_WIDTH = 800
  static CANVAS_HEIGHT = 580
  static KEY_1 = 49
  static KEY_2 = 50
  static KEY_3 = 51
  static TOWER_OFFSET = 5
  static EXPLOSION_OFFSET = 25
  static GAME_STATUS_PLAYING = 0
  static GAME_STATUS_GAME_OVER = 1
  static WAVE_PROGRESS_DELAY = 35
  static BOSS_PROGRESS_DELAY = Const.WAVE_PROGRESS_DELAY * 6
  static MONEY_MULTIPLICATOR = 6
  static DELAY_UPGRADE_MULTIPLIER = 5
  static MAGIC_STATUS_ALIVE = 0
  static MAGIC_STATUS_DEAD = 1
  static SCALE_MINIMAP = 7 // 1 = 100%, 2 = 50%, ...
}
