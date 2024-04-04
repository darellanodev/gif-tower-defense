import { MathUtils } from './MathUtils'
import { Const } from './Const'
import { Enemy } from './Enemy'
import { P5 } from './P5'

export class Resources {
  static enemies() {
    const enemiesImages: any[] = []
    const countEnemiesAndBoss = Enemy.TOTAL_ENEMIES + 1
    MathUtils.range(1, countEnemiesAndBoss).forEach((v) => {
      enemiesImages.push(P5.p5.loadImage('img/enemies/' + v + '_center.png'))
      enemiesImages.push(P5.p5.loadImage('img/enemies/' + v + '_left.png'))
      enemiesImages.push(P5.p5.loadImage('img/enemies/' + v + '_right.png'))
      enemiesImages.push(P5.p5.loadImage('img/enemies/' + v + '_closed.png'))
    })
    return enemiesImages
  }

  static greenTower() {
    const greenTowerImages: any[] = []
    MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
      greenTowerImages.push(
        P5.p5.loadImage('img/towers/green_tower_upgrade_' + v + '.png'),
      )
    })
    return greenTowerImages
  }

  static redTower() {
    const redTowerImages: any[] = []
    MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
      redTowerImages.push(
        P5.p5.loadImage('img/towers/red_tower_upgrade_' + v + '.png'),
      )
    })
    return redTowerImages
  }

  static yellowTower() {
    const yellowTowerImages: any[] = []
    MathUtils.range(0, Const.UPGRADE_MAX_LEVEL).forEach((v) => {
      yellowTowerImages.push(
        P5.p5.loadImage('img/towers/yellow_tower_upgrade_' + v + '.png'),
      )
    })
    return yellowTowerImages
  }

  static tileImages() {
    return [
      P5.p5.loadImage('img/tiles/orange.png'),
      P5.p5.loadImage('img/tiles/black.png'),
      P5.p5.loadImage('img/tiles/end_down.png'),
      P5.p5.loadImage('img/tiles/end_right.png'),
      P5.p5.loadImage('img/tiles/end_left.png'),
      P5.p5.loadImage('img/tiles/end_up.png'),
      P5.p5.loadImage('img/tiles/start_down.png'),
      P5.p5.loadImage('img/tiles/start_right.png'),
      P5.p5.loadImage('img/tiles/start_left.png'),
      P5.p5.loadImage('img/tiles/start_up.png'),
      P5.p5.loadImage('img/tiles/crystal.png'),
    ]
  }

  static hudImages() {
    return [
      P5.p5.loadImage('img/hud/normal.png'),
      P5.p5.loadImage('img/hud/upgrading.png'),
      P5.p5.loadImage('img/hud/upgrading_max.png'),
    ]
  }

  static hudIconImages() {
    return [
      P5.p5.loadImage('img/hud/icon_green_tower_on.png'),
      P5.p5.loadImage('img/hud/icon_green_tower_off.png'),
      P5.p5.loadImage('img/hud/icon_red_tower_on.png'),
      P5.p5.loadImage('img/hud/icon_red_tower_off.png'),
      P5.p5.loadImage('img/hud/icon_yellow_tower_on.png'),
      P5.p5.loadImage('img/hud/icon_yellow_tower_off.png'),
    ]
  }

  static backgroundImage() {
    return P5.p5.loadImage('img/backgrounds/ground.jpg')
  }

  static magicFireball() {
    return P5.p5.loadImage('img/magics/fireball.png')
  }

  static magicIceball() {
    return P5.p5.loadImage('img/magics/iceball.png')
  }

  static magicUFO() {
    return P5.p5.loadImage('img/magics/ufo.png')
  }
}
