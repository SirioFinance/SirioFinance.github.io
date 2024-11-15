import BigNumber from 'bignumber.js/bignumber.mjs'

export const getDecimalNumber = (decimal, value) => {
  return new BigNumber(value || 0).div(`1e${decimal}`).toNumber()
}

export const getTokenNumber = (token, value) => {
  return getDecimalNumber(token.decimal, value)
}
