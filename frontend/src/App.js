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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 10, height: '100%'}}>
        <Router>
          <AuthHandler />
          <Navbar />
          <Routes sx={{ height: '100%' }}>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/edit/:id" element={<Edit/>} />
            <Route path="*" element={<Error code="404" />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

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