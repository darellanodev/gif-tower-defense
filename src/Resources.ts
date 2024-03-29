import { MathUtils } from './MathUtils'
import { Const } from './Const'
import { Enemy } from './Enemy'

export class Resources {
  static enemies() {
    const enemiesImages: any[] = []
    const countEnemiesAndBoss = Enemy.TOTAL_ENEMIES + 1
    MathUtils.range(1, countEnemiesAndBoss).forEach((v) => {
      enemiesImages.push(loadImage('img/enemies/' + v + '_center.png'))
      enemiesImages.push(loadImage('img/enemies/' + v + '_left.png'))
      enemiesImages.push(loadImage('img/enemies/' + v + '_right.png'))
      enemiesImages.push(loadImage('img/enemies/' + v + '_closed.png'))
    })
    return enemiesImages
  }

  static greenTower() {
    const greenTowerImages: any[] = []
    MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
      greenTowerImages.push(
        loadImage('img/towers/green_tower_upgrade_' + v + '.png'),
      )
    })
    return greenTowerImages
  }

  static redTower() {
    const redTowerImages: any[] = []
    MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
      redTowerImages.push(
        loadImage('img/towers/red_tower_upgrade_' + v + '.png'),
      )
    })
    return redTowerImages
  }

  static yellowTower() {
    const yellowTowerImages: any[] = []
    MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
      yellowTowerImages.push(
        loadImage('img/towers/yellow_tower_upgrade_' + v + '.png'),
      )
    })
    return yellowTowerImages
  }

  static tileImages() {
    return [
      loadImage('img/tiles/orange.png'),
      loadImage('img/tiles/black.png'),
      loadImage('img/tiles/end_down.png'),
      loadImage('img/tiles/end_right.png'),
      loadImage('img/tiles/end_left.png'),
      loadImage('img/tiles/end_up.png'),
      loadImage('img/tiles/start_down.png'),
      loadImage('img/tiles/start_right.png'),
      loadImage('img/tiles/start_left.png'),
      loadImage('img/tiles/start_up.png'),
      loadImage('img/tiles/crystal.png'),
    ]
  }

  static hudImages() {
    return [
      loadImage('img/hud/normal.png'),
      loadImage('img/hud/upgrading.png'),
      loadImage('img/hud/upgrading_max.png'),
    ]
  }

  static hudIconImages() {
    return [
      loadImage('img/hud/icon_green_tower_on.png'),
      loadImage('img/hud/icon_green_tower_off.png'),
      loadImage('img/hud/icon_red_tower_on.png'),
      loadImage('img/hud/icon_red_tower_off.png'),
      loadImage('img/hud/icon_yellow_tower_on.png'),
      loadImage('img/hud/icon_yellow_tower_off.png'),
    ]
  }

  static backgroundImage() {
    return loadImage('img/backgrounds/ground.jpg')
  }

  static magicFireball() {
    return loadImage('img/magics/fireball.png')
  }

  static magicIceball() {
    return loadImage('img/magics/iceball.png')
  }

  static magicUFO() {
    return loadImage('img/magics/ufo.png')
  }
}
