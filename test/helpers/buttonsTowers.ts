import { HudButtonsTowers } from '../../src/hud/buttons/HudButtonsTowers'
import { Wallet } from '../../src/player/Wallet'
import { ConstGameMode } from '../../src/constants/ConstGameMode'

export const initializeButtonTower = () => {
  HudButtonsTowers.initializeButtons()
}

export const instantiateHudButtonsTowers = () => {
  Wallet.clearInstance()
  const money = 10000
  const wallet = Wallet.getInstance(ConstGameMode.NORMAL, money)

  return new HudButtonsTowers(wallet)
}
