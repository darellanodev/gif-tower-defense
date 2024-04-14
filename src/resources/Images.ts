import { Image } from 'p5'
import { Resources } from './Resources'

export class Images {
  static tileImages: Image[]
  static greenTowerImages: Image[]
  static redTowerImages: Image[]
  static yellowTowerImages: Image[]
  static hudImages: Image[]
  static towerGreenButtonImages: Image[]
  static towerRedButtonImages: Image[]
  static towerYellowButtonImages: Image[]
  static magicUFOButtonImages: Image[]
  static magicFireballButtonImages: Image[]
  static magicIceballButtonImages: Image[]
  static backgroundImage: Image
  static enemiesImages: Image[]
  static magicFireballImage: Image
  static magicIceballImage: Image
  static magicUFOImage: Image

  static _loadButtons() {
    Images.towerGreenButtonImages = Resources.towerGreenButtonImages()
    Images.towerRedButtonImages = Resources.towerRedButtonImages()
    Images.towerYellowButtonImages = Resources.towerYellowButtonImages()
    Images.magicUFOButtonImages = Resources.magicUFOButtonImages()
    Images.magicFireballButtonImages = Resources.magicFireballButtonImages()
    Images.magicIceballButtonImages = Resources.magicIceballButtonImages()
  }
  static _loadMagics() {
    Images.magicFireballImage = Resources.magicFireball()
    Images.magicIceballImage = Resources.magicIceball()
    Images.magicUFOImage = Resources.magicUFO()
  }
  static _loadTowers() {
    Images.greenTowerImages = Resources.greenTower()
    Images.redTowerImages = Resources.redTower()
    Images.yellowTowerImages = Resources.yellowTower()
  }
  static _loadOthers() {
    Images.enemiesImages = Resources.enemies()
    Images.tileImages = Resources.tileImages()
    Images.hudImages = Resources.hudImages()
    Images.backgroundImage = Resources.backgroundImage()
  }

  static loadAll() {
    Images._loadMagics()
    Images._loadTowers()
    Images._loadButtons()
    Images._loadOthers()
  }
}
