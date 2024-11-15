import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import Tooltip from './Tooltip'

const Help = ({ type, ...other }) => (
  <Tooltip type={type} {...other}>
    <IconButton style={{ color: 'white' }}>
      <HelpIcon />
    </IconButton>
  </Tooltip>
)

export default Help
