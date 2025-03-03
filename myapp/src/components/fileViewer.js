import { Box, Container } from "@mui/material";
import React, { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CropFreeIIcon from '@mui/icons-material/CropFree';

export default function FileViewer( { file } ) {
    const theme = useTheme();

    const fileUrl = file;
    const containerRef = useRef(null);

    const [scale, setScale] = useState(1);

    const handleZoomIn = () => {
        setScale(prevScale => Math.min(prevScale + 0.2, 3));
    };

    const handleZoomOut = () => {
        setScale(prevScale => Math.max(prevScale - 0.2, .9));
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

    const resetZoom = () => {
        setScale(.9);
        setPosition({ x: 0, y: 0 });
    }


    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        setLastPosition({ x: e.clientX, y: e.clientY });
    };

    React.useEffect(() => {
        resetZoom();
    }, []);

    const handleMouseMove = (e) => {
        if (dragging) {
            e.preventDefault();

            if (scale <= 1) return;

            const deltaX = e.clientX - lastPosition.x;
            const deltaY = e.clientY - lastPosition.y;

            setPosition((prevPosition) => {
                const newX = prevPosition.x + deltaX;
                const newY = prevPosition.y + deltaY;

                // Calculate the boundaries
                const container = containerRef.current;
                if (!container) return prevPosition;

                const containerRect = container.getBoundingClientRect();
                const imgWidth = containerRect.width * scale;
                const imgHeight = containerRect.height * scale;

                const maxX = (imgWidth - containerRect.width) / 2;
                const maxY = (imgHeight - containerRect.height) / 2;

                // Ensure at least two sides of the image are always touching the sides of the container
                const boundedX = Math.max(-maxX, Math.min(newX, maxX));
                const boundedY = Math.max(-maxY, Math.min(newY, maxY));

                return {
                    x: boundedX,
                    y: boundedY,
                };
            });

            setLastPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };

    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            setLastPosition({ distance });
            
        }
        e.preventDefault();
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );

            const scaleChange = distance / lastPosition.distance;
            setScale((prevScale) => Math.min(Math.max(prevScale * scaleChange, 0.9), 3));
            setLastPosition({ distance });
            
        }
        e.preventDefault();
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
                    position: 'relative',
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}

            >
                <Box
                    ref={containerRef}
                    component='img'
                    src={fileUrl}
                    sx={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        p: 0,
                        m: 0,
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.9))',
                        transition: dragging ? 'none' : 'transform 0.3s',
                        cursor: dragging ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        WebkitUserDrag: 'none',
                        KhtmluserDrag: 'none',
                        MozUserDrag: 'none',
                        WebkitTouchCallout: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                    draggable="false"
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        height: 145,
                        width: 50,
                        backgroundColor: theme.palette.background.paperTransparent,
                        pt: .5,
                        pb: .5,
                        borderRadius: 8,
                        filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.9))',
                    }}
                >
                    <IconButton
                        onMouseDown={() => setZoomingIn(true)}
                        onMouseUp={() => setZoomingIn(false)}
                        onMouseLeave={() => setZoomingIn(false)}
                        onClick={handleZoomIn}
                        color="primary"
                        sx={{
                            w: 40,
                            h: 40,
                        }}
                    >
                        <ZoomInIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={() => setZoomingOut(true)}
                        onMouseUp={() => setZoomingOut(false)}
                        onMouseLeave={() => setZoomingOut(false)}
                        onClick={handleZoomOut}
                        color="primary"
                    >
                        <ZoomOutIcon />
                    </IconButton>
                    <IconButton
                        onClick={resetZoom}
                        color="primary"
                    >
                        <CropFreeIIcon />
                    </IconButton>
                </Box>
            </Container>
        </>
    );
}