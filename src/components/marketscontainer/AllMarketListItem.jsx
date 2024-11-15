import { Grid } from '@mui/material'
import MinItem from './ListItemWithMin'
import { toDecimal } from '../../util/numbers'

export default function MarketListItem({
  title,
  img,
  supply,
  supplyApy,
  totalBorrow,
  supplyMin,
  totalBorrowMin,
  borrowApy,
}) {
  return (
    <Grid container item>
      <Grid alignItems="center" container item xs>
        <img
          src={img}
          style={{ height: '30px', marginRight: 5, width: '30px' }}
        />
        {title}
      </Grid>
      <MinItem
        max={`${toDecimal(supply, 4)}`}
        min={`${toDecimal(supplyMin, 4)} USD`}
      />
      <MinItem max={`${toDecimal(supplyApy, 4)} %`} />
      <MinItem
        max={`${toDecimal(totalBorrow, 4)}`}
        min={`${toDecimal(totalBorrowMin, 4)} USD`}
      />
      <Grid
        alignItems="center"
        container
        item
        justifyContent="center"
        xs
      >{`${toDecimal(borrowApy, 4)} %`}</Grid>
    </Grid>
  )
}
