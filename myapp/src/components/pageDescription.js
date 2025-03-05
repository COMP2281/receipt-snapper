import React from "react";
import { Typography } from "@mui/material";

export default function PageDescription({ text, sx }) {
    return (
        <Typography sx={{
            sx
        }}>
            {text}
        </Typography>
    );
}