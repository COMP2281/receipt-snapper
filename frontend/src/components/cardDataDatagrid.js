import React from "react";
import { Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import ProgressTag from "./progressTag";

export default function CardDataDataGrid({ rows }) {
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
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.47)',
                border: "none",

                mb: 4,
            }}
            rows={rows}
            columns={[
                {
                    field: 'id',
                    headerName: 'ID',
                    width: 75,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    field: 'date',
                    headerName: 'Date',
                    width: 150,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    field: 'amount',
                    headerName: 'Amount',
                    width: 150,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    valueFormatter: (params, row) => {
                        const value = parseInt(params) / 100;
                        if (isNaN(value)) {
                            return '';
                        }
                        const currency = row.currency;
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
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    field: 'payment_exchange_rate',
                    headerName: 'Exchange Rate',
                    width: 150,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    field: 'payment_amount',
                    headerName: 'Payment Amount',
                    width: 150,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    valueFormatter: (params) => {
                        const value = parseInt(params) / 100;
                        if (isNaN(value)) {
                            return '';
                        }
                        return new Intl.NumberFormat('en-GB', {
                            style: 'currency',
                            currency: 'GBP',
                        }).format(value);
                    }
                },
                {
                    field: 'exchange_override',
                    headerName: 'Exchange Override',
                    width: 150,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    field: 'location',
                    headerName: 'Location',
                    width: 120,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={45}
        />
    );
}