export const isIncluded = (
  bigGroupElements: number[],
  smallGroupElements: number[],
) => {
  let result = true

  if (
    bigGroupElements.length === 0 ||
    smallGroupElements.length > bigGroupElements.length
  ) {
    result = false
  }

  let i = 0
  for (const smallGroupElement of smallGroupElements) {
    if (bigGroupElements[i] !== smallGroupElement) {
      result = false
      break
    }
    i++
  }

  return result
}
