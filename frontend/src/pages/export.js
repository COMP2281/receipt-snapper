import React from 'react';
import { Container } from '@mui/material';
import PageTitle from '../components/pageTitle.js';
import PageDescription from '../components/pageDescription.js';
import { TextField, Button, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function Export() {
    const [fromDate, setFromDate] = useState(dayjs().subtract(1, 'month'));
    const [toDate, setToDate] = useState(dayjs());

    const handleExport = async () => {
        const response = await fetch(`/api/v1/export?from=${fromDate.format('YYYY-MM-DD')}&to=${toDate.format('YYYY-MM-DD')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const contentDisposition = response.headers.get('Content-Disposition');
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                : 'export.csv';
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error('Failed to export data');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container
                maxWidth="xs"
                sx={{
                    mt: 4,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        boxShadow: 2,
                        borderRadius: 2,
                        p: 3,
                        width: '100%',
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'text.secondary',
                    }}
                >
                    <PageTitle title="Export" />
                    <PageDescription text="Export your data here." />

                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <DatePicker
                            label="From"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="To"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button variant="contained" color="primary" onClick={handleExport}>
                            Export
                        </Button>
                    </Box>
                </Box>
            </Container>
        </LocalizationProvider>
    );
}