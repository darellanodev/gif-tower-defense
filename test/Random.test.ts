import { Random } from '../src/utils/Random'

test('integerBetween, when arguments are 1 and 5, a random number between 1 and 5', () => {
  const random = Random.integerBetween(1, 5)
  const result = random >= 1 && random <= 5

  expect(result).toBeTruthy()
})
