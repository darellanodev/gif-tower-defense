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
  static buttonPauseImages: (Image | null)[]
  static magicUFOButtonImages: Image[]
  static magicFireballButtonImages: Image[]
  static magicIceballButtonImages: Image[]
  static backgroundImage: Image
  static enemiesImages: Image[]
  static magicFireballImage: Image
  static magicIceballImage: Image
  static magicUFOImages: Image[]
  static coreImage: Image
  static menuMain: Image
  static menuSurvival: Image
  static buttonMiniMapImages: Image[]

  static buttonSurvivalImages: Image[]
  static buttonEditorImages: Image[]
  static buttonMenuMainImages: Image[]
  static buttonTodaysImages: Image[]

  static buttonPagesImages: Image[]

  static _loadButtons() {
    Images.towerGreenButtonImages = Resources.towerGreenButtonImages()
    Images.towerRedButtonImages = Resources.towerRedButtonImages()
    Images.towerYellowButtonImages = Resources.towerYellowButtonImages()
    Images.buttonPauseImages = Resources.pauseButtonImages()
    Images.magicUFOButtonImages = Resources.magicUFOButtonImages()
    Images.magicFireballButtonImages = Resources.magicFireballButtonImages()
    Images.magicIceballButtonImages = Resources.magicIceballButtonImages()
    Images.buttonMiniMapImages = Resources.buttonMiniMapImages()
    Images.buttonSurvivalImages = Resources.buttonSurvivalImages()
    Images.buttonEditorImages = Resources.buttonEditorImages()
    Images.buttonMenuMainImages = Resources.buttonMenuMainImages()
    Images.buttonTodaysImages = Resources.buttonTodaysImages()
    Images.buttonPagesImages = Resources.buttonPageImages()
  }
  static _loadMagics() {
    Images.magicFireballImage = Resources.magicFireball()
    Images.magicIceballImage = Resources.magicIceball()
    Images.magicUFOImages = Resources.magicUFO()
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
    Images.coreImage = Resources.coreImage()
  }

  static _loadMenu() {
    Images.menuMain = Resources.menuMain()
    Images.menuSurvival = Resources.menuSurvival()
  }

  static getForEnemy(id: number) {
    const ImagesRange = [id * 4, (id + 1) * 4]
    return Images.enemiesImages.slice(...ImagesRange)
  }

  static loadAll() {
    Images._loadMenu()
    Images._loadMagics()
    Images._loadTowers()
    Images._loadButtons()
    Images._loadOthers()
  }
}
