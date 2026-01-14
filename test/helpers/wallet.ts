import { Wallet } from '../../src/player/Wallet'
import { TileOrange } from '../../src/levels/tiles/TileOrange'
import { initializeButtonTower } from './buttonsTowers'
import { TOWER_ID } from '../../src/constants/tower'

export const buyGreenTower = (orangeTile: TileOrange, wallet: Wallet) => {
  initializeButtonTower()
  wallet.buyTower(orangeTile, TOWER_ID.GREEN)
  return orangeTile.getTower()
}
