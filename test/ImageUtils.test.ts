import { ImageUtils } from '../src/ImageUtils'

describe('Get an enemyImage', () => {
  test('for enemy 0 should return 0, 4', () => {
    const expected = [0, 4]
    const result = ImageUtils.getRangeImagesOfEnemy(0)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 1 should return 4, 8', () => {
    const expected = [4, 8]
    const result = ImageUtils.getRangeImagesOfEnemy(1)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 2 should return 8, 12', () => {
    const expected = [8, 12]
    const result = ImageUtils.getRangeImagesOfEnemy(2)

    expect(result).toStrictEqual(expected)
  })
})
