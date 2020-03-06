import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { lightBlue } from '@material-ui/core/colors';

export const lightTheme = responsiveFontSizes(createMuiTheme({
  props: {
    MuiAppBar: {
      position: 'sticky',
    },
    MuiCard: {
      elevation: 0,
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: '#fff !important',
      },
    },
    MuiPaper: {
      root: {
        overflow: 'visible !important',
      },
    },
  },
  palette: {
    background: {
      default: '#fff',
    },
  },
}));

export const darkTheme = responsiveFontSizes(createMuiTheme({
  props: {
    MuiAppBar: {
      position: 'sticky',
    },
    MuiCard: {
      elevation: 0,
    },
  },
  palette: {
    type: 'dark',
    primary: lightBlue,
    background: {
      default: '#0a2d3e',
      paper: '#0a2d3e',
    },
  },
  typography: {
    fontFamily: 'montserrat',
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: '#0a2d3e !important',
      },
    },
    MuiPaper: {
      root: {
        overflow: 'visible !important',
      },
    },
    MuiTable: {
      root: {
        background: 'transparent !important',
      },
    },
    MuiTypography: {
      root: {
        color: grey[400],
      },
    },

    MuiCardContent: {
      root: {
        color: '#16ac9f',
      },
    },

    MuiButton: {
      outlinedPrimary: {
        color: '#16ac9f',
        border: '1px solid rgba(22, 172, 159, 0.5)',
      },
    },
  },
}));

export default {
  darkTheme,
  lightTheme,
};
