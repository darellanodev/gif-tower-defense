import { NewsDataType } from '../../types/newsDataType'

export class NewsDataProvider {
  #news: NewsDataType[] = []

  static #instance: NewsDataProvider | null = null

  constructor() {
    if (NewsDataProvider.#instance !== null) {
      throw new Error(
        'NewsDataProvider is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    NewsDataProvider.#instance = this
  }

  static getInstance() {
    if (NewsDataProvider.#instance === null) {
      NewsDataProvider.#instance = new NewsDataProvider()
    }
    return NewsDataProvider.#instance
  }

  initNewsItems(newsItems: NewsDataType[]) {
    this.#news = newsItems
  }

  getById(id: number): NewsDataType {
    const result = this.#news.find((item: NewsDataType) => item.id == id)
    if (result === undefined) {
      throw new Error('news item is undefined')
    }
    return result
  }

  get last() {
    return this.#news.reduce((max, obj) => (obj.id > max.id ? obj : max), {
      id: 0,
      content: '',
      date: '',
    })
  }
}
