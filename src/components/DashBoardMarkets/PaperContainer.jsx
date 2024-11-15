import { Paper, Typography } from '@mui/material'
import { padding } from '../../util/theme'

const PaperContainer = ({ children, description, sx, title }) => {
  return (
    <Paper className="clear" sx={{ padding: padding.standard, ...sx }}>
      <Typography variant="h1">{title}</Typography>
      <Typography sx={{ py: 1.5 }} variant="body1">
        {description}
      </Typography>
      {children}
    </Paper>
  )
}

export default PaperContainer
