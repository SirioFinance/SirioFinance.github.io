import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { colors } from '../../util/theme'

export const TooltipType = {
  DEFAULT: 'default',
  GREY: 'grey',
}

const GreyTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: colors.grey,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: colors.grey,
    color: colors.black,
  },
}))

const Tooltip = ({ type, ...other }) => {
  const TooltipComponent = type === TooltipType.GREY ? GreyTooltip : MuiTooltip
  return <TooltipComponent {...other} />
}

export default Tooltip
