export const isIncluded = (
  bigGroupElements: number[],
  smallGroupElements: number[],
) => {
  if (
    bigGroupElements.length === 0 ||
    smallGroupElements.length > bigGroupElements.length
  ) {
    return false
  }

  let i = 0
  for (const smallGroupElement of smallGroupElements) {
    if (bigGroupElements[i] !== smallGroupElement) {
      return false
    }
    i++
  }

  return true
}
