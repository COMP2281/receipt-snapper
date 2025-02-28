import React from 'react';
import { CssBaseline } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { AppBar, Toolbar, Box } from '@mui/material';
import RSIcon from './icons.js';

export default function Navbar() {
    return (
        <AppBar position="fixed" sx={{ bgcolor: 'background.paper' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ mr: 2 }}>
                        <RSIcon />
                    </Box>
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>
                        Receipt Snapper
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
