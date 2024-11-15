import { Box, Typography } from '@mui/material'
import Tooltip from './Tooltip'
import Image from 'mui-image'

const TokenIcon = ({ size, token }) => {
  const dimension = size === 'small' ? 30 : 40

  return (
    <Tooltip title={token.isHbar ? 'HBAR' : token.id}>
      <Box
        alignItems="center"
        display="inline-flex"
        justifyContent="center"
        gap={1}
      >
        <Image
          src={token.icon}
          alt={token.id}
          height={dimension}
          width={dimension}
        />
        <Typography variant="h6">{token.name}</Typography>
      </Box>
    </Tooltip>
  )
}

export default TokenIcon
