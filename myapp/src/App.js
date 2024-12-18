import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function footerText() {
  return <>
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"

    >

      Development Version by Durham University COMP Group 21 - 2024

    </Typography>
  </>;
}

function loginButton() {
  return <Button variant="contained">Login</Button>;
}

export default function App() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <h1>Receipt Snapper</h1>
        {loginButton()}
        {footerText()}
      </ Box>
    </Container>
  );
}