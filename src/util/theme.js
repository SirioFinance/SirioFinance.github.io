import { tooltipClasses } from '@mui/material/Tooltip'
import { createTheme } from '@mui/material/styles'

export const borderRadius = {
  standard: '13px',
}

export const colors = {
  black: '#000',
  blue: '#2650e8',
  darkGrey: '#a9a9a9a',
  fadedWhite: 'rgba(255,255,255,0.3)',
  grey: '#cecece',
  lightGrey: '#ececec',
  red: 'red',
  white: '#fff',
}

export const padding = {
  standard: '20px',
}

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: 15,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.white,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.darkGrey,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 15,

          '&.clear': {
            backgroundColor: 'transparent',
            border: `2px solid ${colors.white}`,
            color: colors.white,
          },

          '&.grey': {
            backgroundColor: colors.fadedWhite,
            color: colors.white,
            overflow: 'hidden',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        slotProps: {
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                {
                  marginTop: '0px',
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                {
                  marginBottom: '0px',
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                {
                  marginLeft: '0px',
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                {
                  marginRight: '0px',
                },
            },
          },
        },
      },
      styleOverrides: {
        arrow: {
          color: colors.blue,
        },
        tooltip: {
          fontFamily: 'Gilroy-Regular',

          '& a': {
            color: colors.white,
            textDecoration: 'underline',
          },
        },
        tooltipArrow: {
          backgroundColor: colors.blue,
          borderRadius: '10px',
          color: colors.white,
          fontSize: '14px',
          lineHeight: '1.4em',
          padding: '10px 10px',
          textAlign: 'center',
        },
      },
    },
  },
  typography: {
    body1: {
      fontSize: '1rem',
    },
    fontFamily: 'Gilroy-Thin',
    fontWeightRegular: 900,
    h1: {
      fontFamily: 'Gilroy-Bold',
      fontSize: '1.4rem',
      fontWeight: 900,
    },
    h6: {
      fontFamily: 'Gilroy-Bold',
      fontSize: '1.1rem',
      fontWeight: 900,
    },
    subtitle1: {
      fontFamily: 'Gilroy-Thin',
      fontSize: '0.8rem',
      fontWeight: 400,
    },
  },
})

export default theme
