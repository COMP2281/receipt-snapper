import * as React from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Footer from '../components/footer';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

export default function Login() {
  const theme = useTheme();

<<<<<<< HEAD
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Incorrect Email or Password');
      }

      const data = await response.json();
      // Save the token in local storage or state management
      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.first_name);
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    }
  };

=======
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
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
<<<<<<< HEAD
          {error && <p style={{ color: 'red', marginTop: '-13px' }}>{error}</p>}
=======
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              mt: 2
            }}
<<<<<<< HEAD
            onSubmit={handleSubmit}
=======
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
          >
            <TextField 
              label="Email" 
              type="email" 
              required 
<<<<<<< HEAD
              value={email}
              onChange={(e) => setEmail(e.target.value)}
=======
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
            />
            <TextField 
              label="Password" 
              type="password" 
              required 
<<<<<<< HEAD
              value={password}
              onChange={(e) => setPassword(e.target.value)}
=======
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
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