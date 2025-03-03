import { Box, Container } from "@mui/material";
import React from "react";
import { IconButton } from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useState } from "react";

export default function FileViewer( { file } ) {
    const fileUrl = file;

    const [scale, setScale] = useState(1);

    const handleZoomIn = () => {
        setScale(prevScale => Math.min(prevScale + 0.1, 3));
    };

    const handleZoomOut = () => {
        setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
    };


    const [zoomingIn, setZoomingIn] = useState(false);
    const [zoomingOut, setZoomingOut] = useState(false);

    React.useEffect(() => {
        let zoomInInterval;
        if (zoomingIn) {
            zoomInInterval = setInterval(handleZoomIn, 100);
        } else {
            clearInterval(zoomInInterval);
        }
        return () => clearInterval(zoomInInterval);
    }, [zoomingIn]);

    React.useEffect(() => {
        let zoomOutInterval;
        if (zoomingOut) {
            zoomOutInterval = setInterval(handleZoomOut, 100);
        } else {
            clearInterval(zoomOutInterval);
        }
        return () => clearInterval(zoomOutInterval);
    }, [zoomingOut]);

    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        setLastPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            const deltaX = e.clientX - lastPosition.x;
            const deltaY = e.clientY - lastPosition.y;
            setPosition((prevPosition) => ({
                x: prevPosition.x + deltaX,
                y: prevPosition.y + deltaY,
            }));
            setLastPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <>
            <Container
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    p: 0,
                    m: 0,
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <Box
                    component='img'
                    src={fileUrl}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        p: 0,
                        m: 0,
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        transition: dragging ? 'none' : 'transform 0.1s',
                        cursor: dragging ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        WebkitUserDrag: 'none',
                        KhtmluserDrag: 'none',
                        MozUserDrag: 'none',
                        WebkitTouchCallout: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                />

                <Box
                    sx={{
                        position: 'relative',
                        top: 16,
                        right: -10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <IconButton
                        onMouseDown={() => setZoomingIn(true)}
                        onMouseUp={() => setZoomingIn(false)}
                        onMouseLeave={() => setZoomingIn(false)}
                        color="primary"
                    >
                        <ZoomInIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={() => setZoomingOut(true)}
                        onMouseUp={() => setZoomingOut(false)}
                        onMouseLeave={() => setZoomingOut(false)}
                        color="primary"
                    >
                        <ZoomOutIcon />
                    </IconButton>
                </Box>
            </Container>
        </>
    );
}