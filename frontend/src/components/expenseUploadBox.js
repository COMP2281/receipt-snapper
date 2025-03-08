import React from "react";

import { Box, Typography, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";

import { useTheme } from "@mui/material/styles";

export default function ExpenseUploadBox() {

        const theme = useTheme();
        const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
            noClick: true,
            noKeyboard: true
        });
    
        return (
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
        );
    }
