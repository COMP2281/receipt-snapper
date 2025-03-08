import React, { useState } from 'react';
import { Container, Typography, AppBar, Toolbar, Box, Button, IconButton, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import RSIcon from './icons.js';
export default function Navbar() {
    const theme = useTheme();

    const location = useLocation();

    const isLoggedIn = location.pathname !== '/';

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const renderButtons = () => (
        <>
            <Button color="inherit" onClick={() => window.location.href = '/dashboard'}>Dashboard</Button>
            <Button color="inherit" onClick={() => window.location.href = '/card-data'}>Card Data</Button>
            <Button color="inherit" onClick={() => window.location.href = '/'}>Logout</Button>
        </>
    );

    return (
        <>
            <Box // Screen darkening overlay when hamburger menu is expanded
                sx={{  
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: theme.zIndex.drawer - 1,
                    transition: 'opacity 0.3s ease-in-out',
                    opacity: isExpanded ? 1 : 0,
                    pointerEvents: isExpanded ? 'auto' : 'none', // Allow clicks only when expanded
                }}
                onClick={handleToggle}
            />
            
            <AppBar position="fixed" sx={{
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.47)',
                background: theme.palette.gradient.navbar
            }}>
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            paddingTop: '7px',
                            paddingLeft: { xs: '8px', sm: '24px' },
                            paddingRight: { xs: '8px', sm: '24px' },
                        }}
                    >
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', paddingBottom: '7px' }}>
                            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                <RSIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
                            </Box>
                            <Typography variant="h4" sx={{
                                color: 'inherit',
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 500,
                                fontSize: { xs: '1.25rem', sm: '2rem' }
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
                                        <MenuIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} /> {/* Adjust icon size for extra small screens */}
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
        </>
    );
}
