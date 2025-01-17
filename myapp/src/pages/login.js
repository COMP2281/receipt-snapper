import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Footer from '../components/footer';

function loginButton() {
  return <Button variant="contained">Login</Button>;
}

export default function Login() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <h1>Receipt Snapper</h1>
        {loginButton()}
      </ Box>
    </Container>
  );
}