// frontend/src/pages/Dashboard.js
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ properties: 12, tenants: 8, payments: 5 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    "New tenant registered",
    "Payment received",
    "Property updated"
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Example: fetch stats from backend
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => console.log("Backend not connected yet"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="sidebar">
          <h2>Propspace</h2>
          <nav>
            <a href="/">🏠 Dashboard</a>
            <a href="/login">🔑 Login</a>
            <a href="/register">📝 Register</a>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navbar */}
        <header className="topbar">
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1>Dashboard</h1>
          <div className="actions">
            <input type="text" placeholder="Search..." className="search-bar" />
            <span className="bell" onClick={() => setShowNotifications(!showNotifications)}>🔔</span>
            {showNotifications && (
              <div className="notifications-dropdown">
                {notifications.map((note, i) => (
                  <div key={i} className="notification">{note}</div>
                ))}
              </div>
            )}
            <div className="user-profile">
              <span className="username" onClick={() => setShowDropdown(!showDropdown)}>👤 John Doe ▾</span>
              {showDropdown && (
                <div className="dropdown">
                  <button>Profile</button>
                  <button>Settings</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
              <button className="darkmode-btn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </header>

        {/* Cards Section */}
        <section className="cards">
          <div className="card"><h3>📊 Properties</h3><p>{stats.properties}</p></div>
          <div className="card"><h3>👥 Tenants</h3><p>{stats.tenants}</p></div>
          <div className="card"><h3>💰 Payments</h3><p>{stats.payments}</p></div>
          <div className="card"><h3>⚙️ Settings</h3><p>Manage your app</p></div>
        </section>
      </main>
    </div>
  );
}