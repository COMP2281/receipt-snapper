import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../components/navbar.js';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography, useTheme } from '@mui/material';


export default function Dashboard() {
    const theme = useTheme();
    const onDrop = useCallback((acceptedFiles) => {
        // Handle file upload
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    return (
        <>
            <Navbar />
            <Container>
                <h1>Dashboard</h1>
                <Box
                    {...getRootProps()}
                    sx={{
                        borderRadius: '5px',
                        padding: '30px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        background: isDragActive 
                            ? theme.palette.gradient.primary
                            : theme.palette.gradient.secondary,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.47)', // Added drop shadow
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        {isDragActive ? 'Drop files here!' : 'Drag and Drop to add expense(s)'}
                    </Typography>
                    <Button variant="contained" component="span" sx={{ marginTop: '10px', marginRight: '10px' }} onClick={open}>
                        Choose Files
                    </Button>
                    <Button variant="contained" color="secondary" component="span" sx={{ marginTop: '10px', color: theme.palette.text.primary }} onClick={() => { window.location.href = '/add-expense'; }}>
                        Add Expense Manually
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