import { HudButtonsTowers } from '../../src/hud/buttons/HudButtonsTowers'
import { Wallet } from '../../src/player/Wallet'
import { MODE } from '../../src/constants/mode'

export const initializeButtonTower = () => {
  HudButtonsTowers.initializeButtons()
}

export const instantiateHudButtonsTowers = () => {
  Wallet.clearInstance()
  const money = 10000
  const wallet = Wallet.getInstance(MODE.NORMAL, money)

  return new HudButtonsTowers(wallet)
}
