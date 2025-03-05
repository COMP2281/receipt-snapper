import React from "react";
import { useTheme } from "@emotion/react";
import { Container } from "@mui/material";
import PageTitle from "../components/pageTitle";

export default function AddExpense() {
    const theme = useTheme();

    return (
        <Container>
            <PageTitle title="Add Expense" />
        </Container>
    );
}