export class OldLevelConverter {
  #oldLevelData: string
  #newLevelData: any
  // example of an oldLevelData: "(12,'question','ocliboy','0000000000000000,x111111111111110,0000002222220010,0111020000002010,0101000022220010,0101000020000010,0101000000000010,0101000020000010,0101111111111110,0y00000000000000@1,3,50,450,150',1297020179,'127.0.0.1',0,288,3),"
  constructor(oldLevelData: string) {
    this.#oldLevelData = oldLevelData
    this.#convert()
  }
  #convert() {
    this.#newLevelData = {
      author: this.#extractAuthor(),
      id: this.#extractId(),
      title: this.#extractTitle(),
      comments: 'comments are not set yet',
      rowsmap: this.#extractRowsmap(),
      money: this.#extractMoney(),
      startDirection: this.#extractStartDirection(),
    }
  }
  #extractAuthor() {
    const arr = this.#oldLevelData.split(',')
    return arr[2].replace(/'/g, '').trim()
  }
  #extractTitle() {
    const arr = this.#oldLevelData.split(',')
    return arr[1].replace(/'/g, '').trim()
  }
  #extractId() {
    const arr = this.#oldLevelData.split(',')
    const str = arr[0].replace(/\(/g, '').trim()
    return Number.parseInt(str)
  }
  #getMapParts() {
    const arr = this.#oldLevelData.split("'")
    return arr[5].split('@')
  }
  #extractRowsmap() {
    const levelmap = this.#getMapParts()[0].trim()
    return levelmap.split(',')
  }
  #getMapData() {
    const datamap = this.#getMapParts()[1].trim()
    return datamap.split(',')
  }
  #extractMoney() {
    const datamapParts = this.#getMapData()
    return Number.parseInt(datamapParts[4])
  }
  #extractStartDirection() {
    const datamapParts = this.#getMapData()
    return Number.parseInt(datamapParts[1])
  }

  get author() {
    return this.#newLevelData.author
  }
  get id() {
    return this.#newLevelData.id
  }
  get title() {
    return this.#newLevelData.title
  }
  get comments() {
    return this.#newLevelData.comments
  }
  get rowsmap() {
    return this.#newLevelData.rowsmap
  }
  get money() {
    return this.#newLevelData.money
  }
  get startDirection() {
    return this.#newLevelData.startDirection
  }
}
