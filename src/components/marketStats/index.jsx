import { useEffect, useState } from 'react'
import MarketIndividualStats from '../marketIndividualStats'
import './style.css'
import useGetTokens from '../../hooks/useGetTokens'

const MarketStats = ({ data, isPending }) => {
  const { data: tokens } = useGetTokens()

  const [supplyAmt, setSupplyAmt] = useState('$4.97M')
  const [borrowAmt, setBorrowAmt] = useState('$1.81M')
  function calcMarket() {
    let supply_amount = 0
    let borrow_amount = 0
    let supply_data = []
    let borrow_data = []

    for (const { name } of tokens) {
      supply_amount +=
        (data[name].supply + data[name].borrow) * data[name].price
      borrow_amount += data[name].borrow * data[name].price
    }
    setSupplyAmt(`$ ${Math.floor(supply_amount) / 1000}K`)
    setBorrowAmt(`$ ${Math.floor(borrow_amount) / 1000}K`)
    for (const { name } of tokens) {
      const s_percent =
        Math.floor(
          ((data[name].supply * data[name].price) / supply_amount) * 10000
        ) / 100
      const b_percent =
        Math.floor(
          ((data[name].borrow * data[name].price) / borrow_amount) * 10000
        ) / 100
      supply_data.push({ name, per: s_percent ? s_percent : 0 })
      borrow_data.push({ name, per: b_percent ? b_percent : 0 })
    }
    setSupplyMarkets(supply_data)
    setBorrowMarkets(borrow_data)
  }
  useEffect(() => {
    if (data && tokens.length) {
      calcMarket()
    }
  }, [data, tokens])
  const [borrowMarkets, setBorrowMarkets] = useState([])
  const [supplyMarkets, setSupplyMarkets] = useState([])
  return (
    <>
      <div className="global-stats-container">
        <MarketIndividualStats
          amount={supplyAmt}
          header="Supply Market"
          isPending={isPending}
          markets={supplyMarkets}
        />
        <MarketIndividualStats
          amount={borrowAmt}
          header="Borrow Market"
          isPending={isPending}
          markets={borrowMarkets}
        />
      </div>
    </>
  )
}

export default MarketStats
