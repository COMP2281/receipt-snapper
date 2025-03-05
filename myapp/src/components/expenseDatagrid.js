import React from "react";
import { Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import ProgressTag from "./progressTag";

export default function ExpenseDatagrid({ rows }) {
    const theme = useTheme();
    return (
        <DataGrid
            sx={{
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.background.paper,
                },
                '& .MuiButtonBase-root': {
                    color: '#FFFFFF',
                },
                '& .MuiDataGrid-columnHeader': {
                    alignContent: 'center',
                    justifyContent: 'center',
                },
                '& .MuiDataGrid-columnSeparator': {
                    opacity: .6,
                },
                '& .MuiDataGrid-toolbarContainer': {
                    backgroundColor: theme.palette.background.paper,
                },
                '& .MuiDataGrid-cell': {
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                },
                maxHeight: '85vh',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.47)',
                border: "none",

                mb: 4,
            }}
            rows={rows}
            columns={[
                {
                    field: '',
                    headerName: ' ',
                    width: 10,
                    resizable: false,
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                    renderCell: (params) => (
                        <Typography sx={{
                            p: 1.25,
                            fontSize: '1rem',
                        }}>
                            💷
                        </Typography>
                    )
                },
                {
                    field: 'date',
                    headerName: 'Date',
                    width: 100,
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    field: 'description',
                    headerName: 'Description',
                    width: 250,
                    editable: false,
                    headerAlign: 'center',
                },
                {
                    field: 'category',
                    headerName: 'Category',
                    width: 200,
                    editable: false,
                    headerAlign: 'center',
                },
                {
                    field: 'amount',
                    headerName: 'Amount',
                    width: 100,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    valueFormatter: (params, row) => {
                        const value = parseInt(params) / 100;
                        const currency = row.currency || 'GBP';
                        return new Intl.NumberFormat('en-GB', {
                            style: 'currency',
                            currency: currency,
                        }).format(value);
                    }
                },
                {
                    field: 'currency',
                    headerName: 'Currency',
                    width: 75,
                    editable: false,
                    resizable: false,
                    align: 'center',
                    headerAlign: 'center',
                },
                {
                    field: 'status',
                    headerName: 'Status',
                    width: 150,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    renderCell: (params) => {
                        const colors = {
                            'Completed': '#4CAF50', // green
                            'Waiting': '#FFC107', // amber
                            'Processing': '#2196F3', // blue
                            'Queued': '#9C27B0', // purple
                            'Failed': '#F44336' // red
                        }

                        const progresses = {
                            'Completed': 100,
                            'Waiting': 75,
                            'Processing': 50,
                            'Queued': 25,
                            'Failed': 100
                        }
                        
                        const statusColor = colors[params.value] || '#888888';
                        const statusProgress = progresses[params.value] || 100;

                        return <ProgressTag text={params.value} color={statusColor} progress={statusProgress} />;
                    }
                },
                {
                    field: 'projectNumber',
                    headerName: 'Project',
                    width: 120,
                    editable: true,
                    headerAlign: 'center',
                    align: 'center',
                    sortable: true,
                    filterable: true,
                    disableColumnMenu: false,
                    valueFormatter: (value) => {
                        return value || 'Not Assigned';
                    }
                },
                {
                    field: 'edit',
                    headerName: 'Actions',
                    width: 85,
                    headerAlign: 'center',
                    align: 'center',
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                    renderCell: (params) => (
                        <Button 
                            variant="text"
                            sx={{
                                color: theme.palette.text.action,
                                textDecoration: 'underline',
                                textUnderlineOffset: '2px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                console.log('Edit row:', params.row.id);
                            }}
                        >
                            Edit
                        </Button>
                    )
                }
            ]} 
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={45}
        
            

        />
    );
}