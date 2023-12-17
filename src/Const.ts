export class Const {
  static HUD_NORMAL: number = 1
  static HUD_UPGRADING: number = 2
  static HUD_UPGRADING_MAX: number = 3

  static GREEN_TOWER: number = 1
  static RED_TOWER: number = 2
  static YELLOW_TOWER: number = 3

  static GREEN_COLOR: [number, number, number] = [75, 185, 35]
  static RED_COLOR: [number, number, number] = [185, 35, 35]
  static YELLOW_COLOR: [number, number, number] = [202, 191, 24]

  static COST_UPGRADE_GREEN_TOWER: number[] = [50, 75, 125, 300, 1000, 2000]
  static COST_UPGRADE_RED_TOWER: number[] = [100, 150, 250, 500, 1300, 3000]
  static COST_UPGRADE_YELLOW_TOWER: number[] = [
    700, 2500, 7500, 22000, 67000, 200000,
  ]

  static LEFT_DIRECTION: number = 1
  static RIGHT_DIRECTION: number = 2
  static UP_DIRECTION: number = 3
  static DOWN_DIRECTION: number = 4

  static TILE_SIZE: number = 50

  static UPGRADE_MAX_LEVEL: number = 5

  static TOTAL_TOWER_UPGRADES: number = 5
  static TOTAL_ENEMIES: number = 5
  static CANVAS_WIDTH: number = 800
  static CANVAS_HEIGHT: number = 580
  static HUD_HEIGHT: number = 84
  static KEY_1: number = 49
  static KEY_2: number = 50
  static KEY_3: number = 51

  static CREATE_ENEMY_MAX_TIME = 100
}
