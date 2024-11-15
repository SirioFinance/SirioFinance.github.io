import { css } from '@emotion/react'
import { PuffLoader } from 'react-spinners'
import logoImg from '../../../assets/BrandingAssets-main/Brand/Logo.svg'
import { NETWORK_EXPLORER_URL } from '../../../util/constants'
import Success from './Success'
import Failure from './Failure'
import { Box } from '@mui/material'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Transaction = ({ transaction }) => {
  const message =
    transaction.state === 'accept'
      ? 'Transaction successfully executed'
      : transaction.state === 'reject'
      ? 'Your transaction has been REJECTED'
      : 'Proceed with transaction on your wallet and wait for network confirmation'

  return (
    <div className="transaction-modal">
      <img
        src={logoImg}
        alt=""
        style={{ height: '30px', marginBottom: '5px' }}
      />
      <p
        style={{
          marginTop: '8px',
          marginBottom: '12px',
          fontSize: '18px',
        }}
      >
        {message}
      </p>
      {transaction.state !== 'accept' && transaction.state !== 'reject' ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <PuffLoader
            color="#3251bf"
            loading={true}
            css={override}
            size={100}
          />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '15px',
          }}
        >
          {/* <div className="closeHidden"></div> */}
          {transaction.id && (
            <a
              href={`${NETWORK_EXPLORER_URL}/transaction/${transaction.id}`}
              rel="noreferrer"
              target="_blank"
              style={{
                textTransform: 'capitalize',
                color: '#3251BF',
              }}
            >
              View on block explorer
            </a>
          )}
          <Box sx={{ mt: 4 }}>
            {transaction.state === 'accept' ? <Success /> : <Failure />}
          </Box>
        </div>
      )}
    </div>
  )
}

export default Transaction
