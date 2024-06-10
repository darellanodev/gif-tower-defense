import { ButtonTower } from '../../src/hud/ButtonTower'
import { HudButtonsTowers } from '../../src/hud/HudButtonsTowers'
import { Wallet } from '../../src/player/Wallet'
import {
  greenTowerButtonImages,
  redTowerButtonImages,
  yellowTowerButtonImages,
} from './imagesResources'

export const initializeButtonTower = () => {
  ButtonTower.setImages(
    greenTowerButtonImages,
    redTowerButtonImages,
    yellowTowerButtonImages,
  )
  ButtonTower.initializeButtons()
}

export const instantiateHudButtonsTowers = () => {
  const money = 10000
  const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)

  return new HudButtonsTowers(wallet)
}
