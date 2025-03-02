import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../components/navbar.js';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography, useTheme } from '@mui/material';
import PageTitle from '../components/pagetitle.js';
import ExpenseDatagrid from '../components/expenseDatagrid.js';


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
                <PageTitle title="Dashboard" />
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

                <ExpenseDatagrid rows={
                    [
                        // Sample data with amounts in pennies and currency added
                        { id: 1, date: '2023-10-01', description: 'Lunch', category: 'Food', amount: 1500, currency: 'GBP', status: 'Completed' },
                        { id: 2, date: '2023-10-02', description: 'Groceries', category: 'Food', amount: 4500, currency: 'GBP', status: 'Processing' },
                        { id: 3, date: '2023-10-03', description: 'Bus Ticket', category: 'Transport', amount: 250, currency: 'GBP', status: 'Queued' },
                        { id: 4, date: '2023-10-04', description: 'Coffee', category: 'Food', amount: 300, currency: 'GBP', status: 'Failed' },
                        { id: 5, date: '2023-10-05', description: 'Movie Ticket', category: 'Entertainment', amount: 1200, currency: 'AUD', status: 'Waiting' },
                        { id: 6, date: '2023-10-06', description: 'Dinner', category: 'Food', amount: 2500, currency: 'GBP', status: 'Failed' },
                        { id: 7, date: '2023-10-07', description: 'Taxi', category: 'Transport', amount: 2000, currency: 'GBP', status: 'Queued' },
                        { id: 8, date: '2023-10-08', description: 'Gym Membership', category: 'Health', amount: 3000, currency: 'AUD', status: 'Processing' },
                        { id: 9, date: '2023-10-09', description: 'Books', category: 'Education', amount: 5000, currency: 'GBP', status: 'Processing' },
                        { id: 10, date: '2023-10-10', description: 'Electricity Bill', category: 'Utilities', amount: 6000, currency: 'GBP', status: 'Completed' },
                        { id: 11, date: '2023-10-11', description: 'Water Bill', category: 'Utilities', amount: 2500, currency: 'GBP', status: 'Completed' },
                        { id: 12, date: '2023-10-12', description: 'Internet Bill', category: 'Utilities', amount: 4000, currency: 'AUD', status: 'Completed' },
                        { id: 13, date: '2023-10-13', description: 'Lunch', category: 'Food', amount: 1500, currency: 'GBP', status: 'Completed' },
                        { id: 14, date: '2023-10-14', description: 'Groceries', category: 'Food', amount: 4500, currency: 'GBP', status: 'Completed' },
                        { id: 15, date: '2023-10-15', description: 'Bus Ticket', category: 'Transport', amount: 250, currency: 'GBP', status: 'Completed' },
                        { id: 16, date: '2023-10-16', description: 'Coffee', category: 'Food', amount: 300, currency: 'AUD', status: 'Completed' },
                        { id: 17, date: '2023-10-17', description: 'Movie Ticket', category: 'Entertainment', amount: 1200, currency: 'GBP', status: 'Completed' },
                        { id: 18, date: '2023-10-18', description: 'Dinner', category: 'Food', amount: 2500, currency: 'GBP', status: 'Completed' },
                        { id: 19, date: '2023-10-19', description: 'Taxi', category: 'Transport', amount: 2000, currency: 'AUD', status: 'Completed' },
                        { id: 20, date: '2023-10-20', description: 'Gym Membership', category: 'Health', amount: 3000, currency: 'GBP', status: 'Completed' },
                        { id: 21, date: '2023-10-21', description: 'Books', category: 'Education', amount: 5000, currency: 'GBP', status: 'Completed' },
                        { id: 22, date: '2023-10-22', description: 'Electricity Bill', category: 'Utilities', amount: 6000, currency: 'GBP', status: 'Completed' },
                        { id: 23, date: '2023-10-23', description: 'Water Bill', category: 'Utilities', amount: 2500, currency: 'AUD', status: 'Completed' },
                        { id: 24, date: '2023-10-24', description: 'Internet Bill', category: 'Utilities', amount: 4000, currency: 'GBP', status: 'Completed' },
                        { id: 25, date: '2023-10-25', description: 'Lunch', category: 'Food', amount: 1500, currency: 'GBP', status: 'Completed' },
                        { id: 26, date: '2023-10-26', description: 'Groceries', category: 'Food', amount: 4500, currency: 'GBP', status: 'Completed' },
                        { id: 27, date: '2023-10-27', description: 'Bus Ticket', category: 'Transport', amount: 250, currency: 'AUD', status: 'Completed' },
                        { id: 28, date: '2023-10-28', description: 'Coffee', category: 'Food', amount: 300, currency: 'GBP', status: 'Completed' },
                        { id: 29, date: '2023-10-29', description: 'Movie Ticket', category: 'Entertainment', amount: 1200, currency: 'GBP', status: 'Completed' },
                        { id: 30, date: '2023-10-30', description: 'Dinner', category: 'Food', amount: 2500, currency: 'AUD', status: 'Completed' },
                        { id: 31, date: '2023-10-31', description: 'Taxi', category: 'Transport', amount: 2000, currency: 'GBP', status: 'Waiting' },
                        { id: 32, date: '2023-11-01', description: 'Gym Membership', category: 'Health', amount: 3000, currency: 'GBP', status: 'Processing' },
                        { id: 33, date: '2023-11-02', description: 'Books', category: 'Education', amount: 5000, currency: 'GBP', status: 'Queued' },
                        { id: 34, date: '2023-11-03', description: 'Electricity Bill', category: 'Utilities', amount: 6000, currency: 'GBP', status: 'Failed' },
                    ]
                }/>
            </Container>
        </>
    );
}