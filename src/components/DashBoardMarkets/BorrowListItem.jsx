import { Box, Divider, Stack, Typography } from '@mui/material'
import TokenIcon from '../Utils/TokenIcon'
import useDialog from '../../hooks/useDialog'
import useGetUserTokenData from '../../hooks/useGetUserTokenData'
import ModalBorrow from '../Modal/ModalBorrow'
import { toDecimal } from '../../util/numbers'

const BorrowListItem = ({ token }) => {
  const borrowDialogProps = useDialog()
  const { data: userTokenData } = useGetUserTokenData(token)

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      onClick={borrowDialogProps.onRequestOpen}
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
            <span>{toDecimal(userTokenData.bapy, 4)}%</span>
            <Typography component="span" textAlign="center" variant="body2">
              Borrow APY
            </Typography>
          </Stack>
          <Stack alignItems="center" gap={1}>
            <span>{toDecimal(userTokenData.borrow, 4)}</span>
            <Typography component="span" textAlign="center" variant="body2">
              Borrow Balance
            </Typography>
          </Stack>
          {userTokenData.available >= 0 && (
            <Stack alignItems="center" gap={1}>
              <span>{toDecimal(userTokenData.available, 4)}</span>
              <Typography component="span" textAlign="center" variant="body2">
                Available
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>

      <ModalBorrow
        {...borrowDialogProps}
        token={token}
        userTokenData={userTokenData}
      />
    </Stack>
  )
}

export default BorrowListItem
