import { ProgressBar } from '../src/hud/ProgressBar'
import { Position, Size } from '../src/utils/types'

describe('get progress', () => {
  test('when it is initialy created, return zero', () => {
    const position: Position = { x: 0, y: 0 }
    const size: Size = { w: 100, h: 10 }
    const progressBar = new ProgressBar(position, size)

    const result = progressBar.progress

    expect(result).toBe(0)
  })
  test('when increase progress by 10, return 10', () => {
    const position: Position = { x: 0, y: 0 }
    const size: Size = { w: 100, h: 10 }
    const progressBar = new ProgressBar(position, size)
    progressBar.increaseProgress(10)

    const result = progressBar.progress

    expect(result).toBe(10)
  })
  test('when increase progress by 50 three times, return 100', () => {
    const position: Position = { x: 0, y: 0 }
    const size: Size = { w: 100, h: 10 }
    const progressBar = new ProgressBar(position, size)
    progressBar.increaseProgress(50)
    progressBar.increaseProgress(50)
    progressBar.increaseProgress(50)

    const result = progressBar.progress

    expect(result).toBe(100)
  })
  test('when increase progress by 20 and then we call to reinitProgress, return 0', () => {
    const position: Position = { x: 0, y: 0 }
    const size: Size = { w: 100, h: 10 }
    const progressBar = new ProgressBar(position, size)
    progressBar.increaseProgress(20)
    progressBar.reinitProgress()

    const result = progressBar.progress

    expect(result).toBe(0)
  })
})
