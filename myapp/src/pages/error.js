import React from "react";
import { Container, Typography } from "@mui/material";

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
        <Container>
            <Typography variant="h1">Error {code}</Typography>
            <Typography variant="body1">{errorText}</Typography>
        </Container>
    );
}