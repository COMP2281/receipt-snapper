import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFB74D' // A nicer orange color
        },
        secondary: {
            main: '#A37814' // A lighter orange color
        },

        // Change default colors
        text: {
            primary: '#FFFFFF',
            secondary: '#B0BEC5',
        },

        error: {
            main: '#E57373',
        },
        warning: {
            main: '#FFB74D',
        },
        info: {
            main: '#64B5F6',
        },
        success: {
            main: '#81C784',
        },

        // Change background colors
        background: {
            default: '#212121',
            paper: '#424242',
        },

        gradient: {
            primary: 'radial-gradient(circle,rgb(118, 87, 34) 0%,rgb(31, 26, 11) 100%)',
            secondary: 'radial-gradient(circle,rgb(78, 53, 12) 0%,rgb(31, 26, 11) 100%)',
        },
    },
});

export default theme;