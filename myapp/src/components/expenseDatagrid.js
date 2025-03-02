import React from "react";
import { Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function ExpenseDatagrid({ rows }) {
    const theme = useTheme();
    return (
        <DataGrid
            sx={{
                '& .MuiDataGrid-row': {
                    cursor: 'pointer',
                },
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.background.paper,
                },
                '& .MuiButtonBase-root': {
                    color: '#FFFFFF',
                },
                '& .MuiDataGrid-toolbarContainer': {
                    backgroundColor: '#424242',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                },
                // Add a drop shadow to the datagrid
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.47)',

                mb: 4,
            }}
            rows={rows}
            columns={[
                {
                    field: 'date',
                    headerName: 'Date',
                    width: 100,
                },
                {
                    field: 'description',
                    headerName: 'Description',
                    width: 150,
                    editable: false,
                },
                {
                    field: 'category',
                    headerName: 'Category',
                    width: 150,
                    editable: false,
                },
                {
                    field: 'amount',
                    headerName: 'Amount',
                    width: 100,
                    editable: false,
                },
                {
                    field: 'status',
                    headerName: 'Status',
                    width: 150,
                    editable: false,
                }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
    );
}