import React from 'react';
import { CssBaseline } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { AppBar, Toolbar, Box } from '@mui/material';
import RSIcon from './icons.js';
import { useLocation } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
export default function Navbar() {
    const location = useLocation();

    const isLoggedIn = location.pathname !== '/';

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const renderButtons = () => (
        <>
            <Button color="inherit">Dashboard</Button>
            <Button color="inherit">Card Data</Button>
            <Button color="inherit">Logout</Button>
        </>
    );

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        transition: 'padding 0.3s ease-in-out',
                        paddingTop: '7px', // Add padding to the top
                    }}
                >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                            <RSIcon />
                        </Box>
                        <Typography variant="h4" sx={
                            { 
                                color: 'inherit',
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            Receipt Snapper
                        </Typography>
                        {isLoggedIn && (
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                                {renderButtons()}
                            </Box>
                        )}
                        {isLoggedIn && (
                            <Box sx={{ display: { xs: 'block', md: 'none' }, alignItems: 'center' }}>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
                {isLoggedIn && (
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexDirection: 'column',
                            width: '100%',
                            mt: {
                                xs: 1,
                                sm: 0,
                            },
                            transition: 'max-height 0.3s ease-in-out, padding-bottom 0.3s ease-in-out',
                            maxHeight: isExpanded ? '200px' : '0px',
                            overflow: 'hidden',
                            paddingBottom: isExpanded ? '10px' : '0px', // Add padding to the bottom
                        }}
                    >
                        {renderButtons()}
                    </Box>
                )}
            </Container>
        </AppBar>
    );
}
