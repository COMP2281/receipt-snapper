import React from "react";

import { Box, Typography, Button, Container } from "@mui/material";
import { useDropzone } from "react-dropzone";

import { useTheme } from "@mui/material/styles";
import { useCallback } from "react";
import { useState } from "react";

import { CircularProgress } from "@mui/material";

export default function ExpenseUploadBox() {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const onDrop = useCallback(async (acceptedFiles) => {
        setLoading(true);

        
        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await fetch("/api/v1/upload/newExpense", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Token ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    alert("Failed to upload an image and create an expense.");
                    return;
                }
            } catch (error) {
                console.error("Error uploading an image and creating an expense:", error);
                alert("An error occurred while uploading an image and creating an expense.");
                return;
            }
        }
        window.location.reload();
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
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
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.47)',
            }}
        >
            <input {...getInputProps()} />
            {loading && <CircularProgress sx={{ color: 'theme.palette.color.primary.main', mt: 2.2, mb: 1.7, }} />}
            
            {!loading && <Container>
                <Typography variant="h6" sx={{ color: 'white' }}>
                    {isDragActive ? 'Drop files here!' : 'Drag and Drop to add expense(s)'}
                </Typography>
                <Button variant="contained" component="span" sx={{ marginTop: '10px', marginRight: '10px' }} onClick={open}>
                    Choose Files
                </Button>
                <Button variant="contained" color="secondary" component="span" sx={{ marginTop: '10px', color: theme.palette.text.primary }} onClick={() => { window.location.href = '/add-expense'; }}>
                    Add Expense Manually
                </Button>
            </Container>}
        </Box>
    );
}
