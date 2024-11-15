import './dashboardMarkets.css'
import useGetTokens from '../../hooks/useGetTokens'
import useWalletContext from '../../hooks/useWalletContext'
import { TX_DELAY } from '../../util/constants'
import { useInvalidateAccount } from '../../hooks/useGetAccount'
import ConnectedDialog from '../Utils/ConnectedDialog'
import useDialog from '../../hooks/useDialog'
import PaperContainer from './PaperContainer'
import MarketListItem from './MarketListItem'
import SupplyListItem from './SupplyListItem'
import { Box, Stack } from '@mui/material'
import BorrowListItem from './BorrowListItem'

export default function DashBoardMarkets() {
  const dialogProps = useDialog()
  const { data: tokens } = useGetTokens()
  const { wallet } = useWalletContext()
  const { accountId, processor, provider } = wallet || {}
  const invalidateAccount = useInvalidateAccount(accountId)

  const handleAssociate = async (token) => {
    try {
      dialogProps.onRequestOpen()
      await processor.associate(provider, { token })
      setTimeout(invalidateAccount, TX_DELAY)
    } catch (e) {
      console.log('Unable to associate', e)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      mt={4}
      gap={4}
    >
      <PaperContainer
        description="If you want to deposit assets to earn passive interest or deposit collateral for your loans, click on one of the assets below and supply the quantity you desire."
        title="Supply Markets"
      >
        <Stack gap={2}>
          {tokens.map((token) => (
            <MarketListItem
              key={token.id}
              onAssociate={() => handleAssociate(token)}
              token={token}
            >
              <SupplyListItem token={token} />
            </MarketListItem>
          ))}
        </Stack>
      </PaperContainer>

      <PaperContainer
        description="If you want to deposit assets to earn passive interest or deposit collateral for your loans, click on one of the assets below and supply the quantity you desire."
        title="Borrow Markets"
      >
        <Stack gap={2}>
          {tokens.map((token) => (
            <MarketListItem
              key={token.id}
              onAssociate={() => handleAssociate(token)}
              token={token}
            >
              <BorrowListItem token={token} />
            </MarketListItem>
          ))}
        </Stack>
      </PaperContainer>

      <ConnectedDialog {...dialogProps} />
    </Box>
  )
}
