// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', // Blue color for primary theme
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url(/path-to-your-image.jpg)', // Background image (or set as a color fallback)
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensure the background covers the entire screen
          backgroundColor: '#1976d2', // Fallback color in case the image doesn't load
        },
      },
    },
  },
});

export default theme;
