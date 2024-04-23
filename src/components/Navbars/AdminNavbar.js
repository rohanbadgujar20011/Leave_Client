import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const AdminNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <div className="navbar-1">
        <h1 style={{ marginLeft: "20px" }}>Dashboard</h1>
      </div>
      <div className="navbar-2">
        <h2>Account</h2>
        <h2
          style={{ marginRight: "20px", marginLeft: "25px" }}
          onClick={logout}
          className="logout"
        >
          Logout
        </h2>
      </div>
    </div>
  );
};

export default AdminNavbar;
