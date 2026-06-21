// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
