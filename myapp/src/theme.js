import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E6AE2C'
    },
    secondary: {
      main: '#a37814'
    },


    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },

    // Change background colors
    background: {
      default: '#111111',
    },
  },
});

export default theme;