import React from "react";
import { Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

<Box sx={{ mt: 0, height: '100%' }}></Box>
export default function Edit({ transaction }) {
    const theme = useTheme();

    const docs = [
        { uri: "/assets/dev/example-receipt.png"},
    ];

    return (
        <Container maxWidth={false} disableGutters sx={{ mt: -2, display: 'flex', flexDirection: { xs: "column", md: "row" }, alignItems: 'stretch', height: 'calc(100vh - 72px)', position: 'relative' }}>
            <Box sx={{
                background: theme.palette.gradient.edit,
                width: { xs: '100%', md: '100%' },
                height: { xs: '50%', md: '100%' },
                overflow: 'hidden',
                display: 'flex',
                p: 3,
                m: 0,
                textAlign: 'center',
                justifyContent: 'center',
            }}>
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} theme=
                    {{
                        primary: theme.palette.primary.main,
                        secondary: theme.palette.secondary.main,
                        disableThemeScrollbar: true,
                        disableGutters: true,
                    }}
                    config=
                    {{
                        header: {
                            disableHeader: true,
                        },
                        sidebar: {
                            disableSidebar: true,
                        },
                        page: {
                            disablePage: true,
                        },
                        controls: {
                            disableControls: false,
                        },
                        search: {
                            disableSearch: true,
                        },
                        navigation: {
                            disableNavigation: false,
                        },
                        rotation: {
                            disableRotation: false,
                        },
                        zoom: {
                            disableZoom: false,
                        },

                    }}
                />
                
                
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
