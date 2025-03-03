import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FileViewer from "../components/fileViewer";

export default function Edit({ transaction }) {
    const theme = useTheme();

    return (
        <Container maxWidth={false} disableGutters sx={{ mt: -2, display: 'flex', flexDirection: { xs: "column", md: "row" }, alignItems: 'stretch', height: 'calc(100vh - 72px)', position: 'relative' }}>
            <Box sx={{
                background: theme.palette.gradient.edit,
                width: { xs: '100%', md: '100%' },
                height: { xs: '50%', md: '100%' },
                overflow: 'hidden',
                display: 'flex',
                p: 0,
                m: 0,
                textAlign: 'center',
                justifyContent: 'center',
            }}>

                <FileViewer file="assets/dev/example-receipt.png"/>

            </Box>
            <Box sx={{
                backgroundColor: '#222222',
                width: { xs: '100%', md: '50%' },
                height: { xs: '50%', md: '100%' },
                maxWidth: { xs: '100%', md: '400px' },
                p: 3,
                m: 0,
                overflowX: 'hidden',
                overflowY: 'scroll',
            }}>
                TEXT FIELDS
            </Box>
        </Container>
    );
}
