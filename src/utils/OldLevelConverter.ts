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
      author: this.extractAuthor(),
      id: this.extractId(),
      title: this.extractTitle(),
      rowsmap: this.extractRowsmap(),
    }
  }
  extractAuthor() {
    const arr = this.#oldLevelData.split(',')
    return arr[2].replace(/'/g, '').trim()
  }
  extractTitle() {
    const arr = this.#oldLevelData.split(',')
    return arr[1].replace(/'/g, '').trim()
  }
  extractId() {
    const arr = this.#oldLevelData.split(',')
    const str = arr[0].replace(/\(/g, '').trim()
    return Number.parseInt(str)
  }
  extractRowsmap() {
    const arr = this.#oldLevelData.split("'")
    const levelmapParts = arr[5].split('@')
    const levelmap = levelmapParts[0].trim()

    return levelmap.split(',')
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
    return 'comments are not set yet'
  }
  get rowsmap() {
    return this.#newLevelData.rowsmap
  }
}
