import React from "react";


import { Box, Typography, Button, Container } from "@mui/material";
import PageTitle from "../components/pageTitle.js";
import PageDescription from "../components/pageDescription.js";
import { useTheme } from "@mui/material/styles";

export default function CardData() {

    return (
        <>
            <Container>
                <PageTitle title="Card Data" />
                <PageDescription text="Upload credit card data CSV files here, and line items will be automatically matched with expenses." />
            </Container>
        </>
    );

}