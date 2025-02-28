import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../components/navbar.js';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography } from '@mui/material';


export default function Dashboard() {
    const onDrop = useCallback((acceptedFiles) => {
        // Handle file upload
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <Container>
                <h1>Dashboard</h1>
                <Box
                    {...getRootProps()}
                    sx={{
                        border: '2px dashed #ccc',
                        padding: '20px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        background: isDragActive ? 'radial-gradient(circle, #222222, #555555)' : 'radial-gradient(circle, #555555, #222222)',
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography variant="h6">
                        {isDragActive ? 'Drop files here!' : 'Drag files here to add expenese'}
                    </Typography>
                    <Button variant="contained" component="span" sx={{ marginTop: '10px'}}>
                        Upload Files
                    </Button>
                </Box>

                <DataGrid
                    rows={[
                        { id: 1, col1: 'Hello', col2: 'World' },
                        { id: 2, col1: 'XGrid', col2: 'is Awesome' },
                        { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
                    ]}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 90 },
                        {
                            field: 'col1',
                            headerName: 'Column 1',
                            width: 150,
                            editable: true,
                        },
                        {
                            field: 'col2',
                            headerName: 'Column 2',
                            width: 150,
                            editable: true,
                        },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Container>
        </>
    );
}