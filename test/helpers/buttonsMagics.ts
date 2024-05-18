import { HudButtonsMagics } from '../../src/hud/HudButtonsMagics'
import {
  magicFireballButtonImages,
  magicIceballButtonImages,
  magicUFOButtonImages,
} from './imagesResources'

export const instantiateHudButtonsMagics = () => {
  return new HudButtonsMagics(
    magicUFOButtonImages,
    magicFireballButtonImages,
    magicIceballButtonImages,
  )
}
