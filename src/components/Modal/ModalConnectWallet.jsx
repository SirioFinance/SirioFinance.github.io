import { useState } from 'react'
import {
  alpha,
  Button as MuiButton,
  Divider,
  Link,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import InventoryIcon from '@mui/icons-material/Inventory'
import StoreIcon from '@mui/icons-material/Store'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import useWalletContext from '../../hooks/useWalletContext'
import useDialog from '../../hooks/useDialog'
import { NETWORK_EXPLORER_URL } from '../../util/constants'
import ConnectedDialog from '../Utils/ConnectedDialog'
import Button from '../Utils/Button'

const DEFAULT_STATE = {
  anchorEl: null,
  open: false,
}

export default function ModalConnectWallet() {
  const [state, setState] = useState(DEFAULT_STATE)
  const { anchorEl, open } = state
  const { wallet } = useWalletContext()
  const dialogProps = useDialog()

  const { accountDisplay, accountId } = wallet || {}

  return (
    <>
      <Button
        onClick={
          accountId
            ? (event) =>
                setState((prev) => ({
                  ...prev,
                  anchorEl: event.target,
                  open: true,
                }))
            : dialogProps.onRequestOpen
        }
      >
        {accountDisplay || 'Connect Wallet'}
      </Button>

      <ConnectedDialog {...dialogProps} />

      <Popover
        open={open}
        onClose={() => setState((prev) => ({ ...prev, open: false }))}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.5,
            overflow: 'inherit',
            border: (theme) => `solid 1px ${alpha('#919EAB', 0.08)}`,
            width: 220,
            fontFamily: 'gilroy',
          },
        }}
      >
        {accountId && (
          <Stack spacing={1} alignItems="center" sx={{ pt: 1, pb: 2 }}>
            <Link
              color="inherit"
              target="_blank"
              href={`${NETWORK_EXPLORER_URL}/account/${accountDisplay}`}
              rel="noreferrer noopener nofollow"
            >
              <Typography
                align="center"
                style={{ wordWrap: 'break-word' }}
                variant="body2"
                sx={{ width: 180, color: 'text.secondary' }}
              >
                {accountDisplay}
              </Typography>
            </Link>
            <Stack direction="row" spacing={1}>
              <MuiButton
                variant="contained"
                onClick={() => {
                  wallet.disconnect()
                  setState((prev) => ({ ...prev, open: false }))
                }}
                size="small"
              >
                Logout
              </MuiButton>
              <CopyToClipboard text={accountId} onCopy={() => {}}>
                <MuiButton variant="outlined" size="small">
                  Copy
                </MuiButton>
              </CopyToClipboard>
            </Stack>
          </Stack>
        )}
      </Popover>
    </>
  )
}
