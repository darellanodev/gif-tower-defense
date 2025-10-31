import { Wallet } from '../../src/player/Wallet'
import { TileOrange } from '../../src/levels/tiles/TileOrange'
import { TowerGreen } from '../../src/towers/TowerGreen'
import { initializeButtonTower } from './buttonsTowers'

export const buyGreenTower = (orangeTile: TileOrange, wallet: Wallet) => {
  initializeButtonTower()
  wallet.buyTower(orangeTile, TowerGreen.ID)
  return orangeTile.getTower()
}
