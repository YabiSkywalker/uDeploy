import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function FloatingNavbar() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute', // Floats navbar
            top: 20, // Adjusts distance from the top
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%', // Adjust width as needed
            maxWidth: 900, // Limits max width
            borderRadius: '16px', // Rounded corners
            boxShadow: 3, // Adds slight shadow
            overflow: 'hidden', // Ensures rounded corners affect everything
          }}
        >
          <AppBar position="static" color="primary">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <ButtonGroup variant="contained">
                <Button>Bandera</Button>
                <Button>Product</Button>
                <Button>Connect</Button>
                <Button>About</Button>
              </ButtonGroup>

              <ButtonGroup variant="contained">
                <Button>Login</Button>

              </ButtonGroup>


            </Toolbar>
          </AppBar>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
