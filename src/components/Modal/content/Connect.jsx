import useWalletContext from '../../../hooks/useWalletContext'
import Button from '../../Utils/Button'
import Grid from '@mui/material/Grid'

const Connect = ({ onClose }) => {
  const { providers } = useWalletContext()

  return (
    <div className="popup-wallet-container">
      <h3>Connect Wallet</h3>
      <div className="wallets-container">
        <Grid container spacing={1}>
          {providers.map((provider) => (
            <Grid item key={provider.name} xs={12} md={6}>
              <button
                onClick={() =>
                  provider.connect({ callback: onClose, current: false })
                }
              >
                <img src={provider.image} alt={provider.name} />
                <p>{provider.name}</p>
              </button>
            </Grid>
          ))}
        </Grid>
      </div>
      <h3 style={{ marginTop: '10px' }}>Pair with Code</h3>
      <div style={{ width: '100%' }}>
        <Grid container spacing={1}>
          {providers.map((provider) => {
            return (
              !!provider.getPairingString && (
                <Grid item key={provider.name} xs={12}>
                  <Button
                    onClick={async () =>
                      navigator.clipboard.writeText(
                        await provider.getPairingString()
                      )
                    }
                    style={{ width: '100%' }}
                    type="secondary-btn"
                  >
                    <p>Copy Pairing Code</p>
                  </Button>
                </Grid>
              )
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

export default Connect
