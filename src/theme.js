import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D1F0ED', // Deep Teal
        },
        secondary: {
            main: '#FFD5D5', // Soft Coral
        },
        background: {
            default: '#F5F5F5', // Light Gray
            paper: '#FFFFFF',    // White
        },
        text: {
            primary: '#36454F',   // Charcoal
            secondary: '#C8A2C8', // Lavender
            message: '#2F4858'
        },
        action: {
            active: '#98FF98', // Mint Green
        },
    },
    typography: {
        fontFamily: 'Nunito, sans-serif',
    },
});


export default theme;