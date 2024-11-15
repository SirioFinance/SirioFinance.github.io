import Logo from '../../assets/BrandingAssets-main/Brand/LogoWhite.svg'
import './header.css'
import { NavLink } from 'react-router-dom'
import Tooltip from '../Utils/Tooltip'
import ModalConnectWallet from '../Modal/ModalConnectWallet'
import { IconButton, Menu, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import theme from '../../util/theme'
import { MenuItem, Typography } from '@mui/material'
import DashboardIcon from '../../assets/BrandingAssets-main/Icons/dashboard.svg'
import AnalyticsIcon from '../../assets/BrandingAssets-main/Icons/analytics.svg'
import StakeIcon from '../../assets/BrandingAssets-main/Icons/stake.svg'
import VoteIcon from '../../assets/BrandingAssets-main/Icons/vote.svg'
import LiquidationIcon from '../../assets/BrandingAssets-main/Icons/liquidation.svg'

const menuItems = [
  { icon: DashboardIcon, link: '/app', name: 'Dashboard' },
  { icon: AnalyticsIcon, link: '/app/analytics', name: 'Analytics' },
  {
    disabled: true,
    icon: StakeIcon,
    link: '/app/stake',
    name: 'Stake',
  },
  { disabled: true, icon: VoteIcon, link: '/app/vote', name: 'Vote' },
  // { icon: LiquidationIcon, link: '/app/liquidation', name: 'Liquidation' },
]

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  const handleClose = () => setAnchorEl(null)
  const menuItemSx = { typography: 'body2', py: 2, px: 2.5 }

  return (
    <header>
      {isSmall && (
        <>
          <IconButton onClick={(event) => setAnchorEl(event.target)}>
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          {!!anchorEl && (
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleClose}
              onClick={handleClose}
            >
              {menuItems.map(({ disabled, icon, link, name }) => (
                <MenuItem
                  component={NavLink}
                  key={name}
                  sx={menuItemSx}
                  to={disabled ? undefined : link}
                >
                  <img src={icon} height={20} width={20} />
                  <Typography variant="s3" style={{ marginLeft: '10px' }}>
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
        </>
      )}

      <img className="logo" src={Logo} alt="sirio" />

      {!isSmall && (
        <nav>
          {menuItems.map(({ disabled, link, name }) => {
            const children = (
              <button key={name}>
                <NavLink to={disabled ? undefined : link}>{name}</NavLink>
              </button>
            )
            return disabled ? (
              <Tooltip key={name} title="Available Soon.">
                {children}
              </Tooltip>
            ) : (
              children
            )
          })}
        </nav>
      )}

      <div className="button">
        <ModalConnectWallet />
      </div>
    </header>
  )
}
