import { NewsDataProvider } from '../../src/news/NewsDataProvider'
import { NewsDataTesting } from '../../src/news/NewsDataTesting'

const newsDataProvider = NewsDataProvider.getInstance()
newsDataProvider.initNewsItems(NewsDataTesting.data)

test('return the news item with id 1', () => {
  const newsItem = newsDataProvider.getById(1)
  const result = newsItem.id

  expect(result).toBe(1)
})

test('get the last news item', () => {
  const result = newsDataProvider.last

  const expected = {
    id: 3,
    content: 'gif tower defense has now a news section',
    date: '09-08-2024',
  }

  expect(result).toStrictEqual(expected)
})
