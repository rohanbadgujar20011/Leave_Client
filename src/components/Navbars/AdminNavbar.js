import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
const AdminNavbar = () => {
  const navigate = useNavigate();
  const logoutfunc = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-1">
        <h1 style={{ marginLeft: "20px" }}>Dashboard</h1>
      </div>
      <div className="navbar-2">
        <h2>Account</h2>
        <h2
          style={{ marginRight: "20px", marginLeft: "25px" }}
          onClick={logoutfunc}
          className="logout"
        >
          Logout
        </h2>
      </div>
    </div>
  );
};

export default AdminNavbar;
