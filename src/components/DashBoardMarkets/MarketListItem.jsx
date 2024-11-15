import { Box, Paper } from '@mui/material'
import useWalletContext from '../../hooks/useWalletContext'
import useGetUserTokenAssociated from '../../hooks/useGetUserTokenAssociated'
import { colors, padding } from '../../util/theme'

const MarketListItem = ({ children, onAssociate, token }) => {
  const { wallet } = useWalletContext()
  const { accountId } = wallet || {}
  const { id: tokenId, isHbar } = token
  const associated = useGetUserTokenAssociated(accountId, tokenId, isHbar)

  const wrapper =
    associated && accountId ? (
      <Box
        sx={{
          cursor: 'pointer',
          padding: padding.standard,
        }}
      >
        {children}
      </Box>
    ) : (
      <Box
        sx={{
          cursor: 'pointer',
          padding: padding.standard,
          position: 'relative',
          '&:hover .associateButton': {
            transition: 'all 0.4s ease',
            opacity: 1,
          },
        }}
      >
        {children}
        <Box
          className="associateButton"
          sx={{
            alignItems: 'center',
            backgroundColor: `${colors.blue}EF`,
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            left: 0,
            opacity: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
          onClick={(event) => {
            event.stopPropagation()
            onAssociate()
          }}
        >
          <p>
            {accountId
              ? 'Click to associate token.'
              : 'Connect wallet to begin.'}
          </p>
        </Box>
      </Box>
    )

  return (
    <Paper className="grey" sx={{ '&:hover': { boxShadow: 3 } }}>
      {wrapper}
    </Paper>
  )
}

export default MarketListItem
