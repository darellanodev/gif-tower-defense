import { expect } from 'vitest'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { HudButtonsMagics } from '../../src/hud/buttons/HudButtonsMagics'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { MagicUFOCreator } from '../../src/magics/creators/MagicUFOCreator'
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
  const magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  const magicIceballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  const magicUFOInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  MagicUFOCreator.clearInstance()
  clickMagicUFO(
    enemyInstancesManager,
    magicFireballInstancesManager,
    magicIceballInstancesManager,
    magicUFOInstancesManager,
  )

  const actual = HudButtonsMagics.magicUFOButton.items
  expect(actual).toBe(2)
})

test('count instances, when there is 3 magic ufos and click 5 times, return 3', () => {
  initializeAllMagicButtons()
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  const magicIceballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  const magicUFOInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  MagicUFOCreator.clearInstance()
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
