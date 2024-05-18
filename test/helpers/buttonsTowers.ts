import { ButtonTower } from '../../src/hud/ButtonTower'

export const initializeButtonTower = () => {
  const BtnTowerGreenImages: any[] = [null, null, null]
  const BtnTowerRedImages: any[] = [null, null, null]
  const BtnTowerYellowImages: any[] = [null, null, null]
  ButtonTower.setImages(
    BtnTowerGreenImages,
    BtnTowerRedImages,
    BtnTowerYellowImages,
  )
  ButtonTower.initializeButtons()
}
