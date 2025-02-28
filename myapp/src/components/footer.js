import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        bgcolor: 'background.paper',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Development Version by Durham University COMP Group 21 - 2024
      </Typography>
    </Box>
  );
}
