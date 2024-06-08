import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { ButtonMagic } from '../../src/hud/ButtonMagic'
import { MagicFireballInstancesManager } from '../../src/magics/MagicFireballInstancesManager'
import { MagicUFO } from '../../src/magics/MagicUFO'
import { Position } from '../../src/types/position'
import {
  clickMagicUFO,
  createMagicButton,
  initializeAllMagicButtons,
} from '../helpers/magicButtons'
import { clearMagicUFOInstances } from '../helpers/magicUFO'

test('isMouseOver, if mouse is inside the button, return true', () => {
  const buttonMagic = createMagicButton()
  const mousePosition: Position = { x: 120, y: 120 }

  const result = buttonMagic.isMouseOver(mousePosition)

  expect(result).toBeTruthy()
})

test('get items, when there is 3 magic ufos and click, return 2', () => {
  clearMagicUFOInstances()
  initializeAllMagicButtons()
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicFireballInstancesManager(
    enemyInstancesManager,
  )

  clickMagicUFO(enemyInstancesManager, magicFireballInstancesManager)

  const actual = ButtonMagic.magicUFOButton.items
  expect(actual).toBe(2)
})

test('count instances, when there is 3 magic ufos and click 5 times, return 3', () => {
  clearMagicUFOInstances()
  initializeAllMagicButtons()
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicFireballInstancesManager(
    enemyInstancesManager,
  )

  for (let index = 0; index < 5; index++) {
    clickMagicUFO(enemyInstancesManager, magicFireballInstancesManager)
  }
  const actual = MagicUFO.instances.length

  expect(actual).toBe(3)
})
