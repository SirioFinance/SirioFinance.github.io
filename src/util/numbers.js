export const toDecimal = (number, decimals = 2) =>
  parseFloat((number || 0).toFixed(decimals))
