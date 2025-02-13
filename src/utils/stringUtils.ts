export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const normalizeString = (string: string) => {
  return string.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}
