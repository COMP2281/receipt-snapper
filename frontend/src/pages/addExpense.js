import React from "react";
import PageTitle from "../components/pageTitle";
import PageDescription from "../components/pageDescription";
import { Container } from "@mui/material";
import ExpenseInfoEditor from "../components/expenseInfoEditor";
import { useTheme } from "@emotion/react";

export default function AddExpense() {
    const theme = useTheme();
    

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <PageTitle title="Add Expense" />
            <PageDescription text="Fill out this form to add an expense manually. No data will be parsed from your uploads; these are for record purposed only. Items added here will still be automatically matched to credit card line items." />
            <Container
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 2,
                    borderRadius: 2,
                    p: 3,
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <ExpenseInfoEditor />
            </Container>
        </Container>
    );
}