import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./pages/login.js";
import Dashboard from "./pages/dashboard.js";
import Footer from "./components/footer.js";
import Navbar from "./components/navbar.js";

export default function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10}}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}
