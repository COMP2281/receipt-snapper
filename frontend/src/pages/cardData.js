import React from "react";


import { Box, Typography, Button, Container } from "@mui/material";
import PageTitle from "../components/pageTitle.js";
import PageDescription from "../components/pageDescription.js";
import { useTheme } from "@mui/material/styles";

import CardDataDataGrid from "../components/cardDataDatagrid.js";
import CardDataUploadBox from "../components/cardDataUploadBox.js";

export default function CardData() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('/api/v1/card-data/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching card data:', error));
    }   , []);

    return (
        <>
            <Container>
                <PageTitle title="Card Data" />
                <PageDescription text="Upload credit card data CSV files here, and line items will be automatically matched with expenses." />
                <CardDataUploadBox />

                <CardDataDataGrid rows={data}
                />

            </Container>
        </>
    );

}