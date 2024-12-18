import { Container, Typography } from '@mui/material';
import { AppBar, Toolbar } from '@mui/material';
import RSIcon from './rsicon';

export default function Navbar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <RSIcon />
                    <Typography
                        variant="h4"
                    >
                        Receipt Snapper
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

