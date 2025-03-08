import React from "react";
import { Typography } from "@mui/material";

export default function PageTitle({ title }) {
    return (
        <Typography variant="h4" sx={{
            marginBottom: '14px',
            fontWeight: 500,
        }}>
            {title}
        </Typography>
    );
}