import { instantiateProgressBar } from '../helpers/progressBar'

describe('get progress', () => {
  test('when it is initialy created, return zero', () => {
    const progressBar = instantiateProgressBar()
    const result = progressBar.progress

    expect(result).toBe(0)
  })
  test('when increase progress by 10, return 10', () => {
    const progressBar = instantiateProgressBar()
    progressBar.increaseProgress(10)

    const result = progressBar.progress

    expect(result).toBe(10)
  })
  test('when increase progress by 50 three times, return 100', () => {
    const progressBar = instantiateProgressBar()
    progressBar.increaseProgress(50)
    progressBar.increaseProgress(50)
    progressBar.increaseProgress(50)

    const result = progressBar.progress

    expect(result).toBe(100)
  })
  test('when increase progress by 20 and then we call to reinitProgress, return 0', () => {
    const progressBar = instantiateProgressBar()
    progressBar.increaseProgress(20)
    progressBar.reinitProgress()

    const result = progressBar.progress

    expect(result).toBe(0)
  })
})
