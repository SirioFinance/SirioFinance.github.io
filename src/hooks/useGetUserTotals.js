import { useMemo } from 'react'

const useGetUserTotals = (tokens, userTokensData) => {
  const {
    borrowAmount = 0,
    borrowLimit = 0,
    collateralBal = 0,
    netApy = 0,
    supplyAmount = 0,
    utilization = 0,
  } = useMemo(() => {
    function calcApy() {
      let supplyAmount = 0
      let supply_interest = 0
      let borrow_interest = 0
      let borrowAmount = 0
      let collateralBal = 0

      for (const { borrowCap, name } of tokens) {
        const data = userTokensData[name]
        const borrowPrice = data.borrow * data.price
        const supplyPrice = data.supply * data.price

        supplyAmount += supplyPrice || 0
        supply_interest += (supplyPrice * data.sapy) / 100 || 0
        borrow_interest += (borrowPrice * data.bapy) / 100 || 0
        borrowAmount += borrowPrice || 0
        collateralBal += (supplyPrice * borrowCap) / 100 || 0
      }

      const netApy =
        supplyAmount > 0
          ? ((supply_interest - borrow_interest) / supplyAmount) * 100
          : 0
      const availableBorrowAmount =
        userTokensData.HBAR.available * userTokensData.HBAR.price

      return {
        borrowAmount,
        borrowLimit: (borrowAmount / supplyAmount) * 100 || 0,
        collateralBal,
        netApy,
        supplyAmount,
        utilization: availableBorrowAmount
          ? 100 -
            (availableBorrowAmount / (availableBorrowAmount + borrowAmount)) *
              100
          : supplyAmount
          ? 100
          : 0,
      }
    }

    if (userTokensData && tokens.length) {
      return calcApy()
    }
    return {}
  }, [tokens, userTokensData])

  return {
    borrowAmount,
    borrowLimit,
    collateralBal,
    netApy,
    supplyAmount,
    utilization,
  }
}

export default useGetUserTotals
