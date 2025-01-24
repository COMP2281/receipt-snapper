import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Footer from '../components/footer';

export default function Login() {
  return (
    <>
      <CssBaseline />
      <Container>
        <h1>Login</h1>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" href="/dashboard">Login</Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}