import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change this to your preferred primary color
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0', // Change this to your preferred secondary color
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    // You can customize other colors as well
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
    // You can also add custom colors
    custom: {
      main: '#ff5722',
    },
    // Change background colors
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  // You can also customize typography, spacing, breakpoints, etc.
});

export default theme;