import { Box, Divider, Stack, Typography } from '@mui/material'
import TokenIcon from '../Utils/TokenIcon'
import useDialog from '../../hooks/useDialog'
import useGetUserTokenData from '../../hooks/useGetUserTokenData'
import useGetUserTokenBalance from '../../hooks/useGetUserTokenBalance'
import ModalSupply from '../Modal/ModalSupply'
import { toDecimal } from '../../util/numbers'

const SupplyListItem = ({ token }) => {
  const supplyDialogProps = useDialog()
  const { data: userTokenData } = useGetUserTokenData(token)
  const { data: tokenBalance } = useGetUserTokenBalance(token)

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      onClick={supplyDialogProps.onRequestOpen}
      spacing={{ xs: 2 }}
    >
      <TokenIcon token={token} />
      <Box display="flex" justifyContent={{ sm: 'flex-end', xs: 'center' }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Stack alignItems="center" gap={1}>
            <span>{toDecimal(userTokenData.sapy, 4)}%</span>
            <Typography component="span" textAlign="center" variant="body2">
              Supply APY
            </Typography>
          </Stack>
          <Stack alignItems="center" gap={1}>
            <span>{toDecimal(tokenBalance, 4)}</span>
            <Typography component="span" textAlign="center" variant="body2">
              Wallet Balance
            </Typography>
          </Stack>
          <Stack alignItems="center" gap={1}>
            <span>{toDecimal(userTokenData.supply, 4)}</span>
            <Typography component="span" textAlign="center" variant="body2">
              Supplied
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <ModalSupply
        {...supplyDialogProps}
        token={token}
        userTokenData={userTokenData}
      />
    </Stack>
  )
}

export default SupplyListItem
