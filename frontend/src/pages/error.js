import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import RSIcon from "../components/icons";

export default function Error({ code }) {
    if (!code) {
        code = "Unknown";
    }

    const errors = {
        404: "Page not found",
        500: "Internal server error",
        503: "Service unavailable",
    };

    const errorText = errors[code] || "An error occurred";

    return (
        <Container
            maxWidth="xs"
            sx={{
                mt: 4,
                mb: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#222222',
                    boxShadow: 2,
                    borderRadius: 2,
                    p: 3,
                    width: '100%',
                    border: '1px solid #444444'
                }}
            >
                <RSIcon></RSIcon>
                <Typography variant="h4" sx={{ mt: 0 }}>Error {code}</Typography>
                <Typography variant="body1">{errorText}</Typography>
                <Button variant="contained" href="/" sx={{ mt: 2 }}>Go to Login</Button>
            </Box>
        </Container>
    );
}