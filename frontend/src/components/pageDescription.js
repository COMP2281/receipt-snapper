import React from "react";
import { Box, Typography } from "@mui/material";

export default function PageDescription({ text, sx }) {
    return (
        <Box sx={{...sx}}>
            <Typography>
                {text}
            </Typography>
        </Box>
    );
}