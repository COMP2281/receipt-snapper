import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./pages/login.js";
import Dashboard from "./pages/dashboard.js";
import Error from "./pages/error.js";
import Footer from "./components/footer.js";
import Navbar from "./components/navbar.js";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 10}}>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Error code="404" />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}
