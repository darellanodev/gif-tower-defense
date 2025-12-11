export class ArrayRange {
  static get(start: number, stop: number) {
    return Array.from(
      { length: stop - start + 1 },
      (value, index) => index + start,
    )
  }
}
