import * as React from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Footer from '../components/footer';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

export default function Login() {
  const theme = useTheme();

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          mt: 4,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: '#222222',
            boxShadow: 2,
            borderRadius: 2,
            p: 3,
            width: '100%',
            textAlign: 'center',
            border: '1px solid #444444'
          }}
        >
          <h1 style={{ marginTop: 0 }}>Login</h1>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              mt: 2
            }}
          >
            <TextField 
              label="Email" 
              type="email" 
              required 
            />
            <TextField 
              label="Password" 
              type="password" 
              required 
            />
            <Button 
              variant="contained" 
              type="submit"
            >
              Login
            </Button>
          </Box>
        </Box>
        <Button sx={{
          mt: 2,
          color: theme.palette.dev.main,
          background: theme.palette.dev.bg

        }} onClick={() => {
          window.location.href = '/dashboard';
        }}>
        Skip to Dashboard (DEV)
        </Button>
        <Button sx={{
          mt: 2,
          color: theme.palette.dev.main,
          background: theme.palette.dev.bg

        }} onClick={() => {
          window.location.href = '/edit';
        }}>
        Skip to Edit (DEV)
        </Button>
      </Container>
      <Footer />
    </>
  );
}