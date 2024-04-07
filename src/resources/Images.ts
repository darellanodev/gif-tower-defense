import { Image } from 'p5'
import { Resources } from './Resources'

export class Images {
  static tileImages: Image[]
  static greenTowerImages: Image[]
  static redTowerImages: Image[]
  static yellowTowerImages: Image[]
  static hudImages: Image[]
  static hudIconImages: Image[]
  static backgroundImage: Image
  static enemiesImages: Image[]
  static magicFireballImage: Image
  static magicIceballImage: Image
  static magicUFOImage: Image

  static loadAll() {
    Images.greenTowerImages = Resources.greenTower()
    Images.redTowerImages = Resources.redTower()
    Images.yellowTowerImages = Resources.yellowTower()
    Images.enemiesImages = Resources.enemies()
    Images.tileImages = Resources.tileImages()
    Images.hudImages = Resources.hudImages()
    Images.hudIconImages = Resources.hudIconImages()
    Images.backgroundImage = Resources.backgroundImage()
    Images.magicFireballImage = Resources.magicFireball()
    Images.magicIceballImage = Resources.magicIceball()
    Images.magicUFOImage = Resources.magicUFO()
  }
}
