import React from "react";
import { Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FileViewer from "../components/fileViewer";
import PageTitle from "../components/pageTitle";
import PageDescription from "../components/pageDescription";
import ExpenseInfoEditor from "../components/expenseInfoEditor";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Edit() {
    const { id } = useParams();

    const theme = useTheme();

    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        async function fetchTransaction() {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
                const response = await fetch(`/api/v1/expense/${id}`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                const data = await response.json();
                setTransaction(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching transaction:", error);
            }
        }

        fetchTransaction();
    }, [id]);
        

    if (!transaction) {
        return <div>Loading...</div>;
    }

=======

export default function Edit({ transaction }) {
    const theme = useTheme();

>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
    return (
        <Container maxWidth={false} disableGutters sx={{ mt: -2, display: 'flex', flexDirection: { xs: "column", md: "row" }, alignItems: 'stretch', height: 'calc(100vh - 72px)', position: 'relative' }}>
            <Box sx={{
                background: theme.palette.gradient.edit,
                width: { xs: '100%', md: '100%' },
                height: { xs: '50%', md: '100%' },
                overflow: 'hidden',
                display: 'flex',
                p: 0,
                m: 0,
                textAlign: 'center',
                justifyContent: 'center',
            }}>

<<<<<<< HEAD
                    <FileViewer file={transaction.image_url}/>
=======
                <FileViewer file="assets/dev/example-receipt.png"/>
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c

            </Box>
            <Box sx={{
                backgroundColor: '#222222',
                width: { xs: '100%', md: '50%' },
                height: { xs: '50%', md: '100%' },
                maxWidth: { xs: '100%', md: '400px' },
                p: 3,
                m: 0,
                overflowX: 'hidden',
                overflowY: 'scroll',
            }}>
                <PageTitle title="Edit Expense Info" />
                <PageDescription text="Add or correct details from your imported receipts."
                    sx={{
                        mb: 3,
                    }}/>

<<<<<<< HEAD
                <ExpenseInfoEditor transaction={transaction} upload="hide" requireAll={false} />
=======
                <ExpenseInfoEditor transaction={transaction} upload="hide" />
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c

            </Box>
        </Container>
    );
}
