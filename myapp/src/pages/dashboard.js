import { Container } from '@mui/material';
import Navbar from '../components/navbar.js';

export default function Dashboard() {
    return (
        <>
            <Container>
                <Navbar />
                <h1>Dashboard</h1>
            </Container>
        </>
    );
}