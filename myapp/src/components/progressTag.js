import { Box, Typography } from "@mui/material";
import React from "react";
import { darken } from "@mui/material";

export default function ProgressTag({ text, color, progress }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 120,
                height: 30,
                borderRadius: 5,
                background: darken(color, 0.8),
                mt: 1,
                ml: 'auto',
                mr: 'auto',
                overflow: 'hidden',
                position: 'relative',
            }}>
            <Box
                sx={{
                    width: `${progress}%`,
                    height: '100%',
                    borderRadius: '0px',
                    background: darken(color, 0.1),
                    boxShadow: '2px 0px 8px rgba(0, 0, 0, .7)',
                }}
            />
            <Typography
                sx={{
                    width: '100%',
                    position: 'absolute',
                    textAlign: 'center',
                    color: 'white',
                    filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.3))',
                }}>
                {text}
            </Typography>
        </Box>
    );
}