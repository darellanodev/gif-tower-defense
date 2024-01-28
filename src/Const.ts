export class Const {
  static HUD_NORMAL = 0
  static HUD_UPGRADING = 1
  static HUD_UPGRADING_MAX = 2

  static GREEN_TOWER = 1
  static RED_TOWER = 2
  static YELLOW_TOWER = 3

  static GREEN_COLOR = [75, 185, 35]
  static RED_COLOR = [185, 35, 35]
  static YELLOW_COLOR = [202, 191, 24]

  static DAMAGE_UPGRADE_GREEN_TOWER = [1, 2, 4, 8, 16, 32]

  static COST_UPGRADE_GREEN_TOWER = [50, 75, 125, 300, 1000, 2000]
  static COST_UPGRADE_RED_TOWER = [100, 150, 250, 500, 1300, 3000]
  static COST_UPGRADE_YELLOW_TOWER = [700, 2500, 7500, 22000, 67000, 200000]

  static GREEN_TOWER_UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static RED_TOWER_UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static YELLOW_TOWER_UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]

  static LEFT_DIRECTION = 1
  static RIGHT_DIRECTION = 2
  static UP_DIRECTION = 3
  static DOWN_DIRECTION = 4

  static TILE_SIZE = 50

  static UPGRADE_MAX_LEVEL = 5

  static TOTAL_TOWER_UPGRADES = 5
  static TOTAL_ENEMIES = 5
  static CANVAS_WIDTH = 800
  static CANVAS_HEIGHT = 580
  static HUD_HEIGHT = 84
  static KEY_1 = 49
  static KEY_2 = 50
  static KEY_3 = 51

  static CREATE_ENEMY_MAX_TIME = 100 // 100 when ENEMY_VELOCITY is 1. Decrement it if you speed up the game.

  static TOWER_OFFSET = 5

  static GREEN_TOWER_INFLUENCE_AREA = 150
  static RED_TOWER_INFLUENCE_AREA = 240
  static YELLOW_TOWER_INFLUENCE_AREA = 290

  static ALPHA_INFLUENCE_AREA_FILL = 50
  static ALPHA_INFLUENCE_AREA_STROKE = 120

  static ENEMY_VELOCITY = 1 // must be multiple of "this.Const.TILE_SIZE". Set 1 for normal, 5 for a faster game or 25 for a fastest game
  static BOSS_VELOCITY = 0.5

  static ENEMY_CHANGE_EYES_MAX_TIME = 50

  static ENEMY_EXTEND_CLOSED_EYES_MAX_TIME = 20
  static ENEMY_MIN_TIME_TO_CLOSE = 50
  static ENEMY_MAX_TIME_TO_CLOSE = 200

  static ENEMY_EYES_CENTER = 0
  static ENEMY_EYES_LEFT = 1
  static ENEMY_EYES_RIGHT = 2
  static ENEMY_EYES_CLOSED = 3

  static ENEMY_STATUS_ALIVE = 0
  static ENEMY_STATUS_DEAD = 1

  static PROGRESSBAR_WIDTH = 27
  static PROGRESSBAR_HEIGHT = 7

  static ENEMY_EXPLOSION_MAX_EMIT_TIME = 5
  static EXPLOSION_OFFSET = 25

  static GAME_STATUS_PLAYING = 0
  static GAME_STATUS_GAME_OVER = 1

  static WAVE_PROGRESS_DELAY = 10
  static BOSS_PROGRESS_DELAY = 30

  static MONEY_MULTIPLICATOR = 10
}
