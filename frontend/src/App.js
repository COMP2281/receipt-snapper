import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import Login from "./pages/login.js";
import Dashboard from "./pages/dashboard.js";
import AddExpense from "./pages/addExpense.js";
import Edit from "./pages/edit.js";
import Error from "./pages/error.js";
import Footer from "./components/footer.js";
import Navbar from "./components/navbar.js";
<<<<<<< HEAD
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

=======
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 10, height: '100%'}}>
        <Router>
<<<<<<< HEAD
          <AuthHandler />
          <Navbar />
=======
        <Navbar />
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
          <Routes sx={{ height: '100%' }}>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
<<<<<<< HEAD
            <Route path="/edit/:id" element={<Edit/>} />
=======
            <Route path="/edit" element={<Edit transaction="1" />} />
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
            <Route path="*" element={<Error code="404" />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}
<<<<<<< HEAD

function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return null;
}
=======
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
