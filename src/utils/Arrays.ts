export class Arrays {
  static range(start: number, stop: number) {
    return Array.from(
      { length: stop - start + 1 },
      (value, index) => index + start,
    )
  }

  static getTwoNumbersFourTimes(number: number) {
    return [number * 4, (number + 1) * 4]
  }
}
