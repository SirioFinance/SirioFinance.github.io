import { Grid } from '@mui/material'
import PaperContainer from '../DashBoardMarkets/PaperContainer'
import Help from '../Utils/Help'

export default function MarketStatusContainer({ title, children }) {
  return (
    <PaperContainer sx={{ mt: 4 }} title={title}>
      <Grid container>
        <Grid container item>
          <Grid alignItems="center" container item xs>
            Market <Help title="The token that is deposited and borrowed" />
          </Grid>
          <Grid alignItems="center" container justifyContent="center" item xs>
            Total Supplied{' '}
            <Help title="Amount of Tokens deposited with the purpose of being borrowed" />
          </Grid>
          <Grid alignItems="center" container justifyContent="center" item xs>
            Supply APR{' '}
            <Help title="Annual Interest Rate paid to suppliers for depositing their tokens" />
          </Grid>
          <Grid alignItems="center" container justifyContent="center" item xs>
            Total Borrowed <Help title="Amount of tokens already borrowed" />
          </Grid>
          <Grid alignItems="center" container justifyContent="center" item xs>
            Borrow APR{' '}
            <Help title="Annual Interest Rate paid by borrowers to borrow this token" />
          </Grid>
        </Grid>
        {children}
      </Grid>
    </PaperContainer>
  )
}
