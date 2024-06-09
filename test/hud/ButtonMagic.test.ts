import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { ButtonMagic } from '../../src/hud/ButtonMagic'
import { MagicFireballInstancesManager } from '../../src/magics/MagicFireballInstancesManager'
import { MagicIceballInstancesManager } from '../../src/magics/MagicIceballInstancesManager'
import { MagicUFO } from '../../src/magics/MagicUFO'
import { MagicUFOInstancesManager } from '../../src/magics/MagicUFOInstancesManager'
import { Position } from '../../src/types/position'
import {
  clickMagicUFO,
  createMagicButton,
  initializeAllMagicButtons,
} from '../helpers/magicButtons'

test('isMouseOver, if mouse is inside the button, return true', () => {
  const buttonMagic = createMagicButton()
  const mousePosition: Position = { x: 120, y: 120 }

  const result = buttonMagic.isMouseOver(mousePosition)

  expect(result).toBeTruthy()
})

test('get items, when there is 3 magic ufos and click, return 2', () => {
  initializeAllMagicButtons()
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicFireballInstancesManager(
    enemyInstancesManager,
  )
  const magicIceballInstancesManager = new MagicIceballInstancesManager(
    enemyInstancesManager,
  )
  const magicUFOInstancesManager = new MagicUFOInstancesManager(
    enemyInstancesManager,
  )

  clickMagicUFO(
    enemyInstancesManager,
    magicFireballInstancesManager,
    magicIceballInstancesManager,
    magicUFOInstancesManager,
  )

  const actual = ButtonMagic.magicUFOButton.items
  expect(actual).toBe(2)
})

test('count instances, when there is 3 magic ufos and click 5 times, return 3', () => {
  initializeAllMagicButtons()
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicFireballInstancesManager(
    enemyInstancesManager,
  )
  const magicIceballInstancesManager = new MagicIceballInstancesManager(
    enemyInstancesManager,
  )
  const magicUFOInstancesManager = new MagicUFOInstancesManager(
    enemyInstancesManager,
  )

  for (let index = 0; index < 5; index++) {
    clickMagicUFO(
      enemyInstancesManager,
      magicFireballInstancesManager,
      magicIceballInstancesManager,
      magicUFOInstancesManager,
    )
  }
  const actual = magicUFOInstancesManager.getAll().length

  expect(actual).toBe(3)
})
