import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login.js";
import Dashboard from "./pages/dashboard.js";
import Footer from "./components/footer.js";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}