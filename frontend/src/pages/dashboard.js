import React from 'react';
import { Container } from '@mui/material';
import PageTitle from '../components/pageTitle.js';
import ExpenseDatagrid from '../components/expenseDatagrid.js';
import ExpenseUploadBox from '../components/expenseUploadBox.js';


export default function Dashboard() {
    const firstName = localStorage.getItem('firstName');

    const [expenses, setExpenses] = React.useState([]);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('/api/v1/expense/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setExpenses(data))
            .catch(error => console.error('Error fetching expenses:', error));
    }, []);

    return (
        <>
            <Container>
                <PageTitle title={`Hey ${firstName}!`} />
                <ExpenseUploadBox/>

                <ExpenseDatagrid rows={expenses} />
            </Container>
        </>
    );
}