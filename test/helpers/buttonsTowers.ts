import { HudButtonsTowers } from '../../src/hud/HudButtonsTowers'
import { Wallet } from '../../src/player/Wallet'

export const initializeButtonTower = () => {
  HudButtonsTowers.initializeButtons()
}

export const instantiateHudButtonsTowers = () => {
  Wallet.clearInstance()
  const money = 10000
  const wallet = Wallet.getInstance(Wallet.GAME_NORMAL_MODE, money)

  return new HudButtonsTowers(wallet)
}
