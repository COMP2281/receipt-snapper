import React from 'react';
import { Box } from '@mui/material';

export default function RSIcon() {
    return <Box
        component="img"
        src="/assets/logo_2048.png"
        alt="Receipt Snapper Icon"
        sx={{
            height: '50px',
            filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3))',
            pointer: 'pointer',
            transition: 'transform 0.5s',
            '&:hover': {
                transform: 'rotate(-5deg) scale(1.1)',

            },

        }}
        onClick={() => window.location.href = '/dashboard'}
    />
};