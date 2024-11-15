export const getRepayFn = (token) =>
  token.isHbar ? 'repayBorrowNative' : 'repayBorrow'

export const getSupplyFn = (token) =>
  token.isHbar ? 'supplyUnderlyingNative' : 'supplyUnderlying'

export const getTokenAbi = (token) =>
  token.isHbar ? 'HBARProtocol' : 'SFProtocolToken'
